from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth.hashers import check_password
from rest_framework.permissions import IsAuthenticated
from.models import Admin,Doctor,Patient,Test,Appointment,DocAppointment,TestAppointment,Doc_payment,Test_payment,Staff,Result,Annoucement
from.serializers import (AdminSerializer,DoctorSerializer,PatientSerializer,TestSerializer,AppointmentSerializer,DocAppointmentSerializer,TestAppointmentSerializer,Doc_paymentSerializer,StaffSerializer,ResultSerializer,AnnoucementSerializer,Test_paymentSerializer)
class AdminViewSet(viewsets.ModelViewSet):
    queryset=Admin.objects.all()
    serializer_class=AdminSerializer

class DoctorViewSet(viewsets.ModelViewSet):
    queryset=Doctor.objects.all()
    serializer_class=DoctorSerializer

class PatientViewSet(viewsets.ModelViewSet):
    queryset=Patient.objects.all()
    serializer_class=PatientSerializer

class TestViewSet(viewsets.ModelViewSet):
    queryset=Test.objects.all()
    serializer_class=TestSerializer

class AppointmentViewSet(viewsets.ModelViewSet):
   def list(self,request):
       test_appointments=TestAppointment.objects.all()
       doc_appointments=DocAppointment.objects.all()
       test_data=TestAppointmentSerializer(test_appointments,many=True).data
       doc_data=DocAppointmentSerializer(doc_appointments,many=True).data
       return Response({'test_appointments':test_data,"doc_appointments":doc_data})

class DocAppointmentViewSet(viewsets.ModelViewSet):
    queryset=DocAppointment.objects.all()
    serializer_class=DocAppointmentSerializer

class TestsAppointmentViewSet(viewsets.ModelViewSet):
    queryset=TestAppointment.objects.all()
    serializer_class=TestAppointmentSerializer

class Doc_paymentViewSet(viewsets.ModelViewSet):
    queryset=Doc_payment.objects.all()
    serializer_class=Doc_paymentSerializer

class Test_paymentViewSet(viewsets.ModelViewSet):
    queryset=Test_payment.objects.all()
    serializer_class=Test_paymentSerializer

class StaffViewSet(viewsets.ModelViewSet):
    queryset=Staff.objects.all()
    serializer_class=StaffSerializer

class ResultsViewSet(viewsets.ModelViewSet):
    queryset=Result.objects.all()
    serializer_class=ResultSerializer

class AnnouncementViewSet(viewsets.ModelViewSet):
    queryset=Result.objects.all()
    serializer_class=AnnoucementSerializer

class Register(APIView):
    def post(self, request):
        if Patient.objects.filter(Username=request.data.get('Username')).exists():
            return Response({'error_mg': 'Username already exists'}, status=400)

        if request.data.get('Password') != request.data.get('password_confirm'):
            return Response({'error_mg': 'Passwords do not match'}, status=400)

        serializer = PatientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            instance = serializer.instance  # This is the newly created Patient
            return Response({
                'success': 'Registration successful',
                'P_ID': instance.P_ID,
                'Username': instance.Username,
                'Password': instance.Password
            }, status=201)

        return Response(serializer.errors, status=400)

class LoginView(APIView):
  def post(self,request):
    Username = request.data.get('username')
    Password = request.data.get('password')
    user_tables=[
        ('Patient',Patient),
        ('Doctor',Doctor),
        ('Staff',Staff),
        ('Admin',Admin),
    ]
    for user_type,model in user_tables:
      try:
        user=model.objects.get(Username=Username)
        if user.Password==Password or check_password(Password,user.Password):
           # Set session variables
           request.session['user_type'] = user_type
           request.session['username'] = Username
           request.session['user_Id'] =user.pk
           request.session['name']=user.Name
           return Response({
               'message':f'Hello,{user.Name}',
               'username':Username,
               'user_type':user_type,
               'user_Id':user.pk,
               'name':user.Name
           })
      except model.DoesNotExist:
          continue
    return Response({'error':'Invalid credentials'},status=400)
#reset password api function
class ResetPassword(APIView):
  def post(self,request):
    Username=request.data.get('username')
    new_password=request.data.get('new_password')
    if not Username or not new_password:
        return Response({'error':'Username and new password are required.'},status=400)
    for model in [Patient,Doctor,Staff,Admin]:
        try:
            user=model.objects.get(Username=Username)
            user.Password=new_password
            user.save()
            return Response({'message':'Password updated successfully.'},status=200)
        except model.DoesNotExist:
            continue
    return Response({'error':'User not found'},status=404)
  
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Delete token to logout
        request.user.auth_token.delete()
        return Response({'message': 'You have been logged out.'}, status=status.HTTP_200_OK)