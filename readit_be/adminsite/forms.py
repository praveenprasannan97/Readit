from django import forms
from .models import UsersTable


class login_form(forms.Form):
    email = forms.EmailField()
    password = forms.CharField(widget=forms.PasswordInput)

class ForgotPass(forms.Form):
    email = forms.EmailField(label='Enter your email', max_length=100)

class cpass_form(forms.Form):
    password = forms.CharField(widget=forms.PasswordInput)
    cpassword = forms.CharField(widget=forms.PasswordInput)

class user_edit_form(forms.ModelForm):
    profile_picture = forms.ImageField(required=False)
    about = forms.CharField(required=False)
    
    class Meta:
        model = UsersTable
        fields = ['user_name', 'email', 'about', 'profile_picture']