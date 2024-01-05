from .models import User as User_schema
from .models import Crime, Tip
from .serializers import LoginSerializer, RegistrationSerializer, TipsSerializer, UserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response 
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import authentication_classes
from rest_framework.decorators import permission_classes
from django.contrib.auth import login as django_login, logout as django_logout
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime, timedelta
from rest_framework import exceptions

# ["username", "password"]
@api_view(['POST'])
def login(request):
    try:
        if request.method == 'POST':
            serializer = LoginSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user = serializer.validated_data["user"]
            django_login(request, user)
            user_schema = User_schema.objects.get(id=user.id)
            token, created = Token.objects.get_or_create(user=user)
            return Response({"message":"ok","token": token.key, "isAdmin":user_schema.is_admin}, status=200)
    except Exception as e:
        print(e)
        return Response({"message":"validation error"}, status=400)


@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def logout(request):
    django_logout(request)
    return Response({"message":"logged out successfully"}, status=204)


# ['username', 'password', 'email', 'is_admin']
@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        serializer = RegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        request.data['id'] = user.id
        if 'is_admin' not in request.data:
            request.data['is_admin'] = False
        user_serializer = UserSerializer(data=request.data)
        user_serializer.is_valid(raise_exception=True)
        user_serializer.save()
        return Response({"message": "User created succesfully"}, status=200)


# ['description', "title"]
@api_view(['POST'])
@csrf_exempt
def add_tip(request):
    if request.method == 'POST':
        try:

            auth_header = request.headers.get('Authorization')
            if auth_header==None:
                raise exceptions.ValidationError("No auth token provided")
            token = auth_header.split()[1]
            authentication = TokenAuthentication()
            user, _ = authentication.authenticate_credentials(token)
            if user==None:
                raise exceptions.ValidationError("invalid credentials")
            request.data['user'] = user.id
            request.data['is_reviewed'] = False
            request.data['date_reported'] = datetime.now()

            milliseconds = request.data['date_of_crime']
            seconds = milliseconds / 1000.0
            delta = timedelta(seconds=seconds)
            epoch = datetime.utcfromtimestamp(0)
            datetime_object = epoch + delta
            print(datetime_object)
            request.data['date_of_crime'] = datetime_object
            serializer = TipsSerializer(data = request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({"message":"Tip created successfully"}, status=200)

        except Exception as e:
            error_message = str(e.args[0]) if e.args else "Unknown error"
            print(error_message)
            return Response({"message": error_message}, status=400)

@csrf_exempt
@api_view(['GET'])
def all_tips(request):
    if request.method == 'GET':
        try:
            auth_header = request.headers.get('Authorization')
            if auth_header==None:
                raise exceptions.ValidationError("No auth token provided")
            token = auth_header.split()[1]
            authentication = TokenAuthentication()
            user, _ = authentication.authenticate_credentials(token)
            if user==None:
                raise exceptions.ValidationError("invalid credentials")
            schema_user = User_schema.objects.get(id=user.id)
            if schema_user.is_admin == False:
                raise exceptions.ValidationError("User does not have admin rights")
            request.data['user'] = user.id
            tips = Tip.objects.all()
            serializer = TipsSerializer(tips, many=True)
            return Response({"message": "success", "data":serializer.data}, status=200)
        except Exception as e:
            error_message = str(e.args[0]) if e.args else "Unknown error"
            print(error_message)
            return Response({"message": error_message}, status=400)


@csrf_exempt
@api_view(['DELETE'])
def rem_tip(request, pk):
    if request.method == 'DELETE':
        try:
            auth_header = request.headers.get('Authorization')
            if auth_header==None:
                raise exceptions.ValidationError("No auth token provided")
            token = auth_header.split()[1]
            authentication = TokenAuthentication()
            user, _ = authentication.authenticate_credentials(token)
            if user==None:
                raise exceptions.ValidationError("invalid credentials")
            schema_user = User_schema.objects.get(id=user.id)
            if schema_user.is_admin == False:
                raise exceptions.ValidationError("User does not have admin rights")
            tip = Tip.objects.get(id=pk)
            tip.delete()
            return Response({"message":"Delete successful"}, status=200)
        except Exception as e:
            error_message = str(e.args[0]) if e.args else "Unknown error"
            print(error_message)
            return Response({"message": error_message}, status=400)


@csrf_exempt
@api_view(['PUT'])
def accept_tip(request, pk):
    if request.method == 'PUT':
        try:
            auth_header = request.headers.get('Authorization')
            if auth_header==None:
                raise exceptions.ValidationError("No auth token provided")
            token = auth_header.split()[1]
            authentication = TokenAuthentication()
            user, _ = authentication.authenticate_credentials(token)
            if user==None:
                raise exceptions.ValidationError("invalid credentials")
            schema_user = User_schema.objects.get(id=user.id)
            if schema_user.is_admin == False:
                raise exceptions.ValidationError("User does not have admin rights")
            tip = Tip.objects.get(id=pk)
            tip.is_reviewed = True 
            tip.save()
            return Response({"message":"Update successful"}, status=200)
        except Exception as e:
            error_message = str(e.args[0]) if e.args else "Unknown error"
            print(error_message)
            return Response({"message": error_message}, status=400)
        



