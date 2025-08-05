from django.views import View
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .models import DocAppointment, TestAppointment, Patient
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import json

@method_decorator(csrf_exempt, name='dispatch')
class PatientAppointmentsView(View):
    def get(self, request, patient_id):
        try:
            patient = Patient.objects.get(P_ID=patient_id)
        except Patient.DoesNotExist:
            return JsonResponse({'error': 'Patient not found'}, status=404)

        # Doctor Appointments
        doc_appointments = DocAppointment.objects.filter(patient=patient)
        doc_data = [{
            'id': appt.App_ID,
            'date': str(appt.date),
            'time': str(appt.time),
            'description': f"Dr. {appt.doctor.Name}",
            'type':'D'
        } for appt in doc_appointments]

        # Test Appointments
        test_appointments = TestAppointment.objects.filter(patient=patient)
        test_data = [{
            'id': appt.App_ID,
            'date': str(appt.date),
            'time': appt.time,
            'description': appt.test.Name,
            'type':'T'
        } for appt in test_appointments]

        return JsonResponse({
            'patient_id': patient_id,
            'appointments': doc_data + test_data
        })

@method_decorator(csrf_exempt, name='dispatch')
class CancelAppointmentView(View):
    def post(self, request, app_id):
        # First try to delete from doctor appointments
        doc_appt = DocAppointment.objects.filter(App_ID=app_id).first()
        if doc_appt:
            doc_appt.delete()
            return JsonResponse({'message': 'Doctor appointment canceled successfully'})

        # Then try test appointments
        test_appt = TestAppointment.objects.filter(App_ID=app_id).first()
        if test_appt:
            test_appt.delete()
            return JsonResponse({'message': 'Test appointment canceled successfully'})

        return JsonResponse({'error': 'Appointment not found'}, status=404)
