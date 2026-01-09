# import modules

import jwt
from datetime import datetime, timedelta

from django.conf import settings
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate
from django.http import HttpResponse, JsonResponse

from django.contrib.auth.models import User


#----------------------------------------------------------------------------------------------------

def generate_jwt(username):
    payload = {
        "username": username,
        "exp": datetime.utcnow() + timedelta(hours=1),
        "iat": datetime.utcnow(),
    }

    token = jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")
    return token



from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def login_view(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        user = authenticate(request, username=username, password=password)

        if not user:
            return render(
                request,
                "users/login.html",
                {"error": "Invalid credentials"},
                status=401
            )

        token = generate_jwt(username)

        # TEMPORARY: store in session (for testing only)
        request.session["jwt"] = token

        return redirect("home")

    return render(request, "users/login.html", status=200)

def signup(request):
    if request.method == "POST":
        username = request.POST.get("username")
        email = request.POST.get("email")
        password = request.POST.get("password")
        confirm_password = request.POST.get("confirm_password")
        if password != confirm_password:
            return JsonResponse(
                {"error": "Passwords do not match"},
                status=400
            )

        User.objects.create_user(
            username=username,
            email=email,
            password=password
        )

        return JsonResponse(
            {"message": "User created successfully"},
            status=201
        )
    return render(request, "users/signup.html",status=200)


@csrf_exempt
def home(request):
    token = request.session.get("jwt")

    if not token:
        return redirect("login")

    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=["HS256"]
        )
    except jwt.ExpiredSignatureError:
        return HttpResponse("Token expired", status=401)
    except jwt.InvalidTokenError:
        return HttpResponse("Invalid token", status=401)

    return render(
        request,
        "users/home.html",
        {"username": payload["username"]}
    )
         
