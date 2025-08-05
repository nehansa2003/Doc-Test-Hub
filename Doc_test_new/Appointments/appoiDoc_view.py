from django.views import View
from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse, HttpResponseBadRequest
from .models import Doctor, DocAppointment
from datetime import datetime, timedelta, time as djangotime
import json

# View all doctors
class DoctorListView(View):
    def get(self, request):
        doctors = Doctor.objects.all()
        return render(request, 'doctors/list.html', {'doctors': doctors})

# View slot availability for a specific doctor
class DoctorSlotsView(View):
    def get(self, request, doc_id):
        doctor = get_object_or_404(Doctor, Doc_ID=doc_id)
        specialization = doctor.Specialization
        today = datetime.today().date()

        # Normalize the Ch_date_time dictionary keys to lowercase
        ch_times = {k.lower(): v for k, v in doctor.Ch_date_time.items()}
        # Fetch all upcoming appointments for this doctor within 7 days
        upcoming_appointments = DocAppointment.objects.filter(
            doctor=doctor,
            date__gte=today,
            date__lt=today + timedelta(days=7)
        )

        availability = {}

        for i in range(7):
            current_date = today + timedelta(days=i)
            weekday = current_date.strftime('%A').lower()

            if weekday in ch_times:
                time_range = ch_times[weekday]

                try:
                    start_time = datetime.strptime(time_range['start'], '%H:%M').time()
                    end_time = datetime.strptime(time_range['end'], '%H:%M').time()
                except (KeyError, ValueError):
                    continue  # skip if invalid format

                slot_list = []
                current_dt = datetime.combine(current_date, start_time)
                end_dt = datetime.combine(current_date, end_time)

                while current_dt < end_dt:
                    slot_time = current_dt.time()
                    slot_str = slot_time.strftime('%H:%M')

                    is_booked = upcoming_appointments.filter(date=current_date, time=slot_time).exists()

                    slot_list.append({
                        'time': slot_str,
                        'status': 'Booked' if is_booked else 'Free'
                    })

                    current_dt += timedelta(minutes=10)  # slot size 10 minutes

                availability[str(current_date)] = slot_list

        return JsonResponse({
            'doctor_id': doctor.Doc_ID,
            'doctor': doctor.Name,
            'specialization': specialization,
            'availability': availability
        })

# Book an appointment (POST)
#class BookDoctorAppointmentView(View):
    #def post(self, request, doc_id):
        #try:
            #data = json.loads(request.body)
            #date_str = data['date']
            #time_str = data['time']
            #patient_id = data['patient_id']

#            date_obj = datetime.strptime(date_str, '%Y-%m-%d').date()
 #           time_obj = datetime.strptime(time_str, '%H:%M').time()
            
  #          doctor = get_object_or_404(Doctor, Doc_ID=doc_id)

            # Check if already booked
   #         if DocAppointment.objects.filter(doctor=doctor, date=date_obj, time=time_obj).exists():
    #            return JsonResponse({'error': 'Slot already booked'}, status=409)
            
            # Save appointment
     #       appointment = DocAppointment.objects.create(
      #          patient_id=patient_id,
       #         doctor=doctor,
        #        date=date_obj,
         #       time=time_obj,
            #)
          #  return JsonResponse({'message': 'Appointment booked', 'App_ID': appointment.App_ID})

        #except Exception as e:
         #   return HttpResponseBadRequest(f"Invalid data: {e}")
