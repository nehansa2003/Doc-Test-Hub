from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Admin, Doctor, Staff, Test
from .serializers import AdminSerializer, DoctorSerializer, StaffSerializer, TestSerializer
class AdminDeleteView(APIView):
    def delete(self, request, pk):
        try:
            admin = Admin.objects.get(pk=pk)
            admin.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Admin.DoesNotExist:
            return Response({"error": "Admin not found"}, status=status.HTTP_404_NOT_FOUND)

class DoctorDeleteView(APIView):
    def delete(self, request, pk):
        try:
            doctor = Doctor.objects.get(pk=pk)
            doctor.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Doctor.DoesNotExist:
            return Response({"error": "Doctor not found"}, status=status.HTTP_404_NOT_FOUND)

class StaffDeleteView(APIView):
    def delete(self, request, pk):
        try:
            staff = Staff.objects.get(pk=pk)
            staff.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Staff.DoesNotExist:
            return Response({"error": "Staff not found"}, status=status.HTTP_404_NOT_FOUND)

class TestDeleteView(APIView):
    def delete(self, request, pk):
        try:
            test = Test.objects.get(pk=pk)
            test.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Test.DoesNotExist:
            return Response({"error": "Test not found"}, status=status.HTTP_404_NOT_FOUND)