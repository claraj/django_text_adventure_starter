from django.db import models
from django.contrib.auth.models import User


# Represents where in the game a user has played though to
class GameState(models.Model):
    user = models.ForeignKey('auth.User', null=False, on_delete=models.CASCADE)
    next_text = models.IntegerField()
    # TODO add fields on the objects they have collected, 
    # their health, any other stats? 
