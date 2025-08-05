from rest_framework.response import Response
from rest_framework import status
from .models import Doctor, DocAppointment,Patient
from datetime import datetime, timedelta
from django.utils.dateparse import parse_time
from rest_framework.decorators import APIView,permission_classes
from datetime import datetime, timedelta
from .serializers import DocAppointmentSerializer,TestAppointmentSerializer

from django.http import JsonResponse
from .models import Doctor  # Adjust path as needed
class GetDoctorsBySpecialization(APIView):
    def post(self, request):
        try:
            Specialization = request.data.get('specialization')
            doctors = Doctor.objects.filter(Specialization__iexact=Specialization)
            doctor_names = doctors.values_list('Name', flat=True)
            doctor_list = [{"id": d.Doc_ID, "name": d.Name, "payment": d.Payment} for d in doctors]
            return Response({"success": True, "doctors": list(doctor_names),"doctor_info":doctor_list}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"success": False, "error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
         try:
            # Get distinct specializations
            specializations = Doctor.objects.values_list('Specialization', flat=True).distinct()
            return Response({
                "success": True,
                "specializations": list(specializations)
            }, status=status.HTTP_200_OK)
         except Exception as e:
            return Response({"success": False, "error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        

class Get_doctor_available_slots(APIView):
 def get(self,request, *args, **kwargs):
    doctor_id = request.GET.get('doctor_id')
    date_str = request.GET.get('date')  # Format: YYYY-MM-DD
    try:
        doctor = Doctor.objects.get(pk=doctor_id)
    except Doctor.DoesNotExist:
        return Response({"error": "Doctor not found"}, status=404)

    date_obj = datetime.strptime(date_str, "%Y-%m-%d").date()
    weekday = date_obj.strftime('%A')  # e.g., 'wednesday'

    # Extract available time range from Ch_date_time
    ch_schedule = doctor.Ch_date_time
    if weekday not in ch_schedule:
        return Response({"available_slots": [], "message": f"No channeling on {weekday.title()}"})

    start_str = ch_schedule[weekday]["start"].replace('.',':')
    end_str = ch_schedule[weekday]["end"].replace('.',':')
    start_time = parse_time(start_str)
    end_time = parse_time(end_str)
     # Generate 10-minute slots
    slots = []
    current = datetime.combine(date_obj, start_time)
    end = datetime.combine(date_obj, end_time)
    while current + timedelta(minutes=10) <= end:
        slots.append(current.time().strftime("%H:%M"))
        current += timedelta(minutes=10)

    # Remove booked slots
    booked = DocAppointment.objects.filter(
        doctor=doctor,
        date_time__date=date_obj
    ).values_list("time", flat=True)

    available_slots = [slot for slot in slots if slot not in [b.strftime("%H:%M") for b in booked]]

    return Response({
        "success":True,
        "doctor_name": doctor.Name,
        "date": date_str,
        "available_slots": available_slots,
        "consultation_fee": str(doctor.Payment)
})

class CreateDocAppointment(APIView):
    def post(self, request):
        serializer = DocAppointmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"success": True}, status=201)
        return Response(serializer.errors, status=400)


