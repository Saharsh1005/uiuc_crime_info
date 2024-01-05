from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('register/', views.register, name='register'),
    path('add-tip/', views.add_tip, name='add-tip'),
    path('all-tips/', views.all_tips, name='all-tips'),
    path('rem-tip/<int:pk>/', views.rem_tip, name='rem-tip'),
    path('accept-tip/<int:pk>/', views.accept_tip, name='accept-tip'),
]