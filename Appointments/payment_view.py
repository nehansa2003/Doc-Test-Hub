from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import DocAppointment, TestAppointment, Doc_payment, Test_payment, Staff,Doctor,Patient,Test
from django.shortcuts import get_object_or_404
from .serializers import Doc_paymentSerializer, Test_paymentSerializer

class FetchPaymentDataView(APIView):
    def get(self, request):
        appointment_type = request.GET.get('type')
        app_id = request.GET.get('id')

        if appointment_type == 'channel':
            appointment = get_object_or_404(DocAppointment, App_ID=app_id)
            data = {
                'id': appointment.App_ID,
                'price': float(appointment.doctor.Payment),
                'doctor': appointment.doctor.Name,
                'patient': appointment.patient.Name,
                'email': appointment.patient.Email,
            }
        elif appointment_type == 'test':
            appointment = get_object_or_404(TestAppointment, App_ID=app_id)
            data = {
                'id': appointment.App_ID,
                'price': float(appointment.test.Payment),
                'test': appointment.test.Name,
                'patient': appointment.patient.Name,
                'email': appointment.patient.Email,
            }
        else:
            return Response({"error": "Invalid type"}, status=status.HTTP_400_BAD_REQUEST)

        return Response([data])  # Return as list



class SaveDocPaymentView(APIView):
    def post(self, request):
        serializer = Doc_paymentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Doctor payment saved"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SaveTestPaymentView(APIView):
    def post(self, request):
        serializer = Test_paymentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Test payment saved"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
