from rest_framework import serializers 
from .models import Admin,Doctor,Patient,Appointment,Test,DocAppointment,TestAppointment,Doc_payment,Test_payment,Result,Staff,Annoucement
from django.utils import timezone
from datetime import datetime, timedelta
class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model=Admin
        fields='__all__'
        read_only_fields=['Ad_ID']

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
            model=Doctor
            fields='__all__' 
            read_only_fields=['Doc_ID']

class PatientSerializer(serializers.ModelSerializer):
     class Meta:
          model=Patient
          fields='__all__'
          read_only_fields=['P_ID']

class TestSerializer(serializers.ModelSerializer):
     class Meta:
          model=Test
          fields='__all__'
          read_only_fields=['Test_ID']

class AppointmentSerializer(serializers.ModelSerializer):
     class Meta:
          model=Appointment
          fields='__all__'

class DocAppointmentSerializer(serializers.ModelSerializer):
     class Meta:
          model=DocAppointment
          fields='__all__'
          read_only_fields=['App_ID']
     def create(self, validated_data):
        last_appointment = DocAppointment.objects.order_by('-App_ID').first()
        if last_appointment and last_appointment.App_ID.startswith('DA') and last_appointment.App_ID[2:].isdigit():
            new_id = int(last_appointment.App_ID[2:]) + 1
            app_id = f'DA{new_id:04d}'
        else:
            app_id = 'DA0001'

        validated_data['App_ID'] = app_id
        return DocAppointment.objects.create(**validated_data)

class TestAppointmentSerializer(serializers.ModelSerializer):
     class Meta:
          model=TestAppointment
          fields='__all__'
          read_only_fields=['App_ID']
     def validate(self, data):
         test = data['test']
         date = data['date']
         time_slot = data['time_slot']

        # Date must be within the next 6 months
         if date > (timezone.now().date() + timedelta(days=180)):
            raise serializers.ValidationError("Appointment date must be within the next 6 months.")

        # Slot must not be already booked
         if TestAppointment.objects.filter(test=test, date=date, time_slot=time_slot).exists():
            raise serializers.ValidationError("Time slot already booked.")

         return data
     def create(self, validated_data):
        last_app = TestAppointment.objects.order_by('-App_ID').first()
        if last_app and last_app.App_ID.startswith('TA') and last_app.App_ID[2:].isdigit():
            new_id = int(last_app.App_ID[2:]) + 1
            app_id = f'TA{new_id:04d}'
        else:
            app_id = 'TA0001'

        validated_data['App_ID'] = app_id
        return TestAppointment.objects.create(**validated_data)

class StaffSerializer(serializers.ModelSerializer):
     class Meta:
          model=Staff
          fields='__all__'
          read_only_fields=['St_ID']

class Doc_paymentSerializer(serializers.ModelSerializer):
     class Meta:
          model=Doc_payment
          fields='__all__'
     def get_paymentAmount(self, obj):
        return f"Rs {obj.Doc_payment:,.2f}"

class Test_paymentSerializer(serializers.ModelSerializer):
     class Meta:
          model=Test_payment
          fields='__all__'
     def get_paymentAmount(self, obj):
        return f"Rs {obj.test_payment:,.2f}"

class ResultSerializer(serializers.ModelSerializer):
     class Meta:
          model=Result
          fields='__all__'

class AnnoucementSerializer(serializers.ModelSerializer):
     class Meta:
          model=Annoucement
          fields='__all__'
          read_only_fields=['A_ID','Date']
