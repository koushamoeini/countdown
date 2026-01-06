from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from .models import BetUser, Bet, TargetStatus
from decimal import Decimal

@api_view(['POST'])
def user_login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    if not username or not password:
        return Response({'error': 'Username and password required'}, status=status.HTTP_400_BAD_REQUEST)
    
    user = authenticate(username=username, password=password)
    
    if user:
        bet_user, _ = BetUser.objects.get_or_create(user=user)
        return Response({
            'username': user.username,
            'balance': float(bet_user.balance)
        })
    else:
        # Create user if not exists
        try:
            user = User.objects.create_user(username=username, password=password)
            bet_user = BetUser.objects.create(user=user, balance=10000.00)
            return Response({
                'username': user.username,
                'balance': 10000.00
            })
        except:
            return Response({'error': 'Invalid credentials or user already exists'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_global_state(request):
    bets = Bet.objects.all().order_by('-timestamp')[:50]
    history = []
    for bet in bets:
        history.append({
            'id': bet.id,
            'username': bet.user.username,
            'targetName': bet.target_name,
            'amount': float(bet.amount),
            'type': bet.bet_type,
            'timestamp': bet.timestamp
        })
    
    statuses = {s.target_id: s.is_dead for s in TargetStatus.objects.all()}
    
    # Optional: return balance for a specific user
    username = request.query_params.get('username')
    balance = None
    if username:
        try:
            bet_user = BetUser.objects.get(user__username=username)
            balance = float(bet_user.balance)
        except BetUser.DoesNotExist:
            pass

    return Response({
        'history': history,
        'statuses': statuses,
        'balance': balance
    })

@api_view(['POST'])
def place_bet(request):
    username = request.data.get('username')
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    bet_user = BetUser.objects.get(user=user)
    amount = Decimal(str(request.data.get('amount')))
    
    if bet_user.balance < amount:
        return Response({'error': 'Insufficient funds'}, status=status.HTTP_400_BAD_REQUEST)
    
    bet_user.balance -= amount
    bet_user.save()
    
    Bet.objects.create(
        user=user,
        target_id=request.data.get('targetId'),
        target_name=request.data.get('targetName'),
        amount=amount,
        bet_type=request.data.get('type')
    )
    
    return Response({'balance': float(bet_user.balance)})

@api_view(['POST'])
def settle_bets(request):
    if request.data.get('admin') != 'kousha':
        return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)
    
    target_id = request.data.get('targetId')
    outcome = request.data.get('outcome')
    
    ts, _ = TargetStatus.objects.get_or_create(target_id=target_id)
    ts.is_dead = outcome
    ts.save()
    
    unsettled_bets = Bet.objects.filter(target_id=target_id, settled=False)
    for bet in unsettled_bets:
        won = (bet.bet_type == 'die' and outcome == True) or (bet.bet_type == 'live' and outcome == False)
        bet.settled = True
        bet.won = won
        bet.save()
        
        if won:
            multiplier = Decimal('10') if bet.bet_type == 'die' else Decimal('1.6')
            bet_user = BetUser.objects.get(user=bet.user)
            bet_user.balance += bet.amount * multiplier
            bet_user.save()
            
    return Response({'status': 'success'})
