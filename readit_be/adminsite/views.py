from django.contrib.auth import login as auth_login, authenticate, logout as auth_logout
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth.hashers import make_password
from django.shortcuts import render, redirect, get_object_or_404
from django.core.paginator import Paginator
from django.core.mail import send_mail
from django.db.models import Q, Avg, Count, Sum, F
from .forms import login_form, ForgotPass, cpass_form, user_edit_form
from .models import Topics, UsersTable, Comments
import random
import calendar


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

@login_required
def logout(request):
    auth_logout(request)
    return redirect('login')

def forgot_pass(request):
    message = None
    if request.method == 'POST':
        form = ForgotPass(request.POST)
        if form.is_valid():
            email = form.cleaned_data.get('email')
            if UsersTable.objects.filter(email=email).exists():
                ad_user = UsersTable.objects.get(email=email)
                random_key = random.randint(10**49, 10**50 - 1)
                ad_user.random_key = random_key
                ad_user.save()

                subject = f"Password Reset For ReadIt Admin Login"
                from_email = "passwordreset@readit.in"
                recipient_list = ["admin@mailtrap.io"]
                plain_message = 'http://127.0.0.1:8000/resetpass/'+str(random_key)
                send_mail(subject, plain_message, from_email, recipient_list)
                
                message = {'status': 'Email sent successfully, Please check Email to reset your password'}
            else:
                message = {'status': 'Email not found'}
    else:
        form = ForgotPass()
    return render(request, 'forgot_pass.html', {'form': form, 'message': message})

def reset_pass(request, ky):
    message = None
    if UsersTable.objects.filter(random_key=ky).exists():
        ad_user = UsersTable.objects.get(random_key=ky)
        form = cpass_form(request.POST)
        if form.is_valid():
            pass1 = form.cleaned_data.get('password')
            pass2 = form.cleaned_data.get('cpassword')
            if pass1 == pass2:
                ad_user.password = make_password(pass1)
                ad_user.random_key = None
                ad_user.save()
                message = {'status': "Password has been reset"}
                return redirect('login')
            else:
                message = {'status': "Passwords doesn't match"}
        else:
            form = cpass_form()
    else:
        return redirect('login')
    return render(request, 'reset_pass.html', {'form': form, 'message': message})

@login_required
def list_posts(request):

    query = request.GET.get('q')

    if query:
        posts = Topics.objects.filter(
            Q(topic_title__icontains=query) | Q(topic_description__icontains=query)
        ).order_by('-id')
    else:
        posts = Topics.objects.all().order_by('-date_time')

    paginator = Paginator(posts, 5)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    return render(request,'list_posts.html',{'page_obj': page_obj, 'query': query})

@login_required
def view_post(request, ky):
    post = get_object_or_404(Topics, pk=ky)
    comment = Comments.objects.filter(topic_id=ky).order_by('-comment_time')
    return render(request,'view_post.html',{'post': post, 'comment': comment})

@login_required
def list_users(request):

    query = request.GET.get('q')

    if query:
        users = UsersTable.objects.filter(Q(user_name__icontains=query) | Q(email__icontains=query)).filter(is_staff=0).order_by('user_name')
    else:
        users = UsersTable.objects.filter(is_staff=0).order_by('user_name')
    paginator = Paginator(users, 5)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    return render(request,'list_users.html',{'page_obj': page_obj, 'query': query})

@login_required
def view_user(request, ky):
    user = get_object_or_404(UsersTable, pk=ky)
    return render(request,'view_user.html',{'user':user})

@login_required
def edit_user(request, ky):
    user = get_object_or_404(UsersTable, pk=ky)
    if request.method == 'POST':
        form = user_edit_form(request.POST, request.FILES, instance=user)
        if form.is_valid():
            if not request.FILES.get('profile_picture') and user.profile_picture:
                user.profile_picture = user.profile_picture
            form.save()
            return redirect('viewuser', ky)
        else:
            print(form.errors)
    else:
        form = user_edit_form(instance=user)
    return render(request,'edit_user.html',{'form': form, 'user':user})

@login_required
def change_pass(request, us):
    message = None
    ad_user = UsersTable.objects.get(user_name=us)
    form = cpass_form(request.POST)
    if form.is_valid():
        pass1 = form.cleaned_data.get('password')
        pass2 = form.cleaned_data.get('cpassword')
        if pass1 == pass2:
            ad_user.password = make_password(pass1)
            ad_user.save()
            message = {'status': "Password has been reset"}
            return redirect('listposts')
        else:
            message = {'status': "Passwords doesn't match"}
    else:
            form = cpass_form()
    return render(request,'change_pass.html', {'form': form, 'message': message})

@login_required
def post_toggle1(request, pk):
    post = get_object_or_404(Topics, pk=pk)
    if request.method == 'POST':
        if post.status == 'true':
            post.status = 'false'
            post.save()
        else:
            post.status = 'true'
            post.save()
    else:
        return redirect ('listposts')
    return redirect('listposts')

@login_required
def post_toggle2(request, pk):
    post = get_object_or_404(Topics, pk=pk)
    if request.method == 'POST':
        if post.status == 'true':
            post.status = 'false'
            post.save()
        else:
            post.status = 'true'
            post.save()
    else:
        return redirect ('viewpost',pk)
    return redirect('viewpost',pk)

@login_required
def del_post(request, pk):
    post = get_object_or_404(Topics, pk=pk)
    if request.method == 'POST':
        post.delete()
    else:
        return redirect('listposts')
    return redirect('listposts')

@login_required
def user_toggle1(request, pk):
    user = get_object_or_404(UsersTable, pk=pk)
    if request.method == 'POST':
        if user.status == 'true':
            user.status = 'false'
            user.save()
        else:
            user.status = 'true'
            user.save()
    else:
        return redirect ('listusers')
    return redirect('listusers')

@login_required
def user_toggle2(request, pk):
    user = get_object_or_404(UsersTable, pk=pk)
    if request.method == 'POST':
        if user.status == 'true':
            user.status = 'false'
            user.save()
        else:
            user.status = 'true'
            user.save()
    else:
        return redirect ('viewuser',pk)
    return redirect('viewuser',pk)

@login_required
def del_user(request, pk):
    user = get_object_or_404(UsersTable, pk=pk)
    if request.method == 'POST':
        user.delete()
    else:
        return redirect('listusers')
    return redirect('listusers')

@login_required
def del_comment(request, pk, ky):

    cmnt = get_object_or_404(Comments, pk=pk)
    if request.method == 'POST':
        cmnt.delete()
    else:
        return redirect('viewpost', ky)
    return redirect('viewpost', ky)


@login_required
def toggle_comment(request, pk, ky):

    cmnt = get_object_or_404(Comments, pk=pk)
    if request.method == 'POST':
        if cmnt.status == 'true':
            cmnt.status = 'false'
            cmnt.save()
        else:
            cmnt.status = 'true'
            cmnt.save()
    else:
        return redirect('viewpost', ky)
    return redirect('viewpost', ky)