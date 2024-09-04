from django import forms
from .models import UsersTable


class login_form(forms.Form):
    email = forms.EmailField()
    password = forms.CharField(widget=forms.PasswordInput)