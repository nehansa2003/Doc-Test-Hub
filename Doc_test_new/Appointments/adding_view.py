from.models import Admin,Doctor,Patient,Staff,Test
from.serializers import (AdminSerializer,DoctorSerializer,TestSerializer,StaffSerializer)
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.mail import EmailMessage
from rest_framework.views import APIView
class AddDoctor(APIView):
 def post(self,request):
    serializer=DoctorSerializer(data=request.data)
    if serializer.is_valid():
        Doctor=serializer.save()
        #subject="Welcome to Doc & Test Hub!"
        #message=""" Dear Dr.{Doctor.Name}, Welcome to Doc & Test Hub!
        #Your account has been created successfully.
        #Your login details:
        #Doc_ID:{Doctor.Doc_ID}
        #Username:{Doctor.Username}
        #Password:{Doctor.Password}

        #Best regards,
        #Doc & Test Hub Admin
        #"""
        #email=EmailMessage(subject,message,to=[Doctor.Email])
        #email.send()
        return Response({'message':'Doctor added successfully and Email sent.','Doc_ID':Doctor.Doc_ID,'Username':Doctor.Username,'Password':Doctor.Password})
    return Response(serializer.errors,status=400)
class AddTest(APIView):
 def post(self,request):
    serializer=TestSerializer(data=request.data)
    if serializer.is_valid():
        Test=serializer.save()
        return Response({'message':'Test added successfully.','Test_ID':Test.Test_ID,'Precausions':Test.Precausions,'Requirements':Test.Requirements})
    return Response(serializer.errors,status=400)

class AddStaff(APIView):
 def post(self,request):
    serializer=StaffSerializer(data=request.data)
    if serializer.is_valid():
        Staff=serializer.save()
        return Response({'message':'Staff member added successfully.','St_ID':Staff.St_ID,'Usename':Staff.Username,'Password':Staff.Password})
    return Response(serializer.errors,status=400)

class AddAdmin(APIView):
 def post(self,request):
    serializer=AdminSerializer(data=request.data)
    if serializer.is_valid():
        Admin=serializer.save()
        return Response({'message':'Admin added successfully.','Ad_ID':Admin.Ad_ID,'Username':Admin.Username,'Password':Admin.Password})
    return Response(serializer.errors,status=400)