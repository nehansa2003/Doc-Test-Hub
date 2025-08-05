from rest_framework.decorators import APIView,permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from django.core.mail import send_mail
from.models import Test,TestAppointment,Patient,Doctor,Admin,Staff
from.serializers import TestSerializer,TestAppointmentSerializer
from datetime import datetime,timedelta,time as dtime
from django.utils.dateparse import parse_time
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime, timedelta, time as dtime

class testBook(APIView):
    def get(self, request):
        try:
            test_id = request.GET.get('Test_ID')
            date_str = request.GET.get('date')

            if not test_id or not date_str:
                return Response({"error": "Test_ID and date are required"}, status=status.HTTP_400_BAD_REQUEST)

            try:
                test = Test.objects.get(pk=test_id)
            except Test.DoesNotExist:
                return Response({"error": "Test not found"}, status=status.HTTP_404_NOT_FOUND)

            try:
                date_obj = datetime.strptime(date_str, "%Y-%m-%d").date()
            except ValueError:
                return Response({"error": "Invalid date format"}, status=status.HTTP_400_BAD_REQUEST)

            start_time = dtime(hour=8, minute=0)
            end_time = dtime(hour=19, minute=0)
            interval = timedelta(minutes=test.Time_for_one_person)

            slots = []
            current = datetime.combine(date_obj, start_time)
            end_datetime = datetime.combine(date_obj, end_time)

            while current + interval <= end_datetime:
                slots.append(current.time())
                current += interval

            booked_appointments = TestAppointment.objects.filter(date=date_obj, test=test)
            booked_slots = set(appt.time for appt in booked_appointments)

            available_slots = [slot.strftime("%H:%M") for slot in slots if slot not in booked_slots]
            all_slots = [slot.strftime("%H:%M") for slot in slots]
            booked_slots_str = [slot.strftime("%H:%M") for slot in booked_slots]

            return Response({
                "all_slots": all_slots,
                "booked_slots": booked_slots_str,
                "available_slots": available_slots,
                "requirements":test.Requirements if test.Requirements else {},
                "precautions":test.Precausions if test.Precausions else {},
            })

        except Exception as e:
            print("Internal Server Error:", str(e))
            return Response({"error": str(e)}, status=500)


class Book_test_appointment(APIView):
    def post(self, request):
        try:
            data = request.data
            test_id = data.get("test_id")
            time = data.get("time_slot")
            date = data.get("date")
            patient_id=data.get("patient_id")

            # Validate inputs
            if not all([test_id, time, date]):
                return Response({"error": "Missing data"}, status=400)

            test = Test.objects.get(pk=test_id)
            patient = Patient.objects.get(pk=patient_id) 
            # Save appointment
            appointment = TestAppointment.objects.create(
                test=test,
                time=time,
                date=date,
                patient=patient
                # Add other required fields like patient info if needed
            )

            return Response({"message": "Test booked successfully"}, status=201)
        
        except Test.DoesNotExist:
            return Response({"error": "Test not found"}, status=404)
        
        except Exception as e:
            print("Exception occurred:", str(e))
            return Response({"error": str(e)}, status=500)