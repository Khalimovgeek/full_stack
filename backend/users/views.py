# import modules

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate

from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer
from .permissions import IsAdmin


#----------------------------------------------------------------------------------------------------

class RegisterAPI(APIView):
    permission_classes = []

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "User registered successfully"},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginAPI(APIView):
    permission_classes = []

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        if not user:
            return Response(
                {"error": "Invalid credentials"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            },
            status=status.HTTP_200_OK
        )

class ProfileAPI(APIView):
    def get(self, request):
        return Response(
            {
                "username": request.user.username,
                "email": request.user.email,
                "role": request.user.userprofile.role,
            }
        )


class AdminDashBoradAPI(APIView):
    permission_classes = [IsAdmin]

    def get(self, request):
        role = request.user.userprofile.role

        return Response({
            "role": role,
            "message": f"Welcome {role}"
        })
    

class UserDashboardAPI(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        role = request.user.userprofile.role

        return Response({
            "role": role,
            "message": f"Welcome {role}"
        })