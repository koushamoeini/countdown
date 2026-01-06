from django.db import models
from django.contrib.auth.models import User

class BetUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    balance = models.DecimalField(max_digits=12, decimal_places=2, default=10000.00)

    def __str__(self):
        return self.user.username

class Bet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    target_id = models.IntegerField()
    target_name = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    bet_type = models.CharField(max_length=10) # 'die' or 'live'
    settled = models.BooleanField(default=False)
    won = models.BooleanField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']

class TargetStatus(models.Model):
    target_id = models.IntegerField(unique=True)
    is_dead = models.BooleanField(default=False)

    def __str__(self):
        return f"Target {self.target_id}: {'Dead' if self.is_dead else 'Alive'}"
