from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.user_login, name='login'),
    path('state/', views.get_global_state, name='state'),
    path('bet/', views.place_bet, name='bet'),
    path('settle/', views.settle_bets, name='settle'),
]
