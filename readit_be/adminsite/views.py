from django.contrib.auth import login as auth_login, authenticate, logout as auth_logout
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth.hashers import make_password
from django.shortcuts import render, redirect, get_object_or_404
from .forms import login_form


def admin_login(request):
    message = None
    if request.method == 'POST':
        form = login_form(request.POST)
        if form.is_valid():
            email = form.cleaned_data.get('email')
            password = form.cleaned_data.get('password')
            user = authenticate(email=email, password=password )
            if user is not None:
                if user.is_staff==1:
                    auth_login(request, user)
                    return redirect('listposts')
                else:
                    message = {'status': 'incorrect email or password!'}
            else:
                message = {'status': 'incorrect email or password!'}
    else:
        form = login_form()
    return render(request,'admin_login.html', {'form': form, 'message': message})

def logout(request):
    auth_logout(request)
    return redirect('login')

def forgot_pass(request):
    return render(request, 'forgot_pass.html')

def reset_pass(request):
    return render(request, 'reset_pass.html')

def list_posts(request):
    return render(request,'list_posts.html')

def list_users(request):
    return render(request,'list_users.html')

def view_user(request):
    return render(request,'view_user.html')

def edit_user(request):
    return render(request,'edit_user.html')

def view_post(request):
    return render(request,'view_post.html')

def change_pass(request):
    return render(request,'change_pass.html')