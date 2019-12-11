from django.urls import path, include
from . import views 

urlpatterns = [
    path('', views.home, name='user_action'),
    path('load', views.load_game, name="load_game"),
    path('action', views.user_action, name='user_action')
]
