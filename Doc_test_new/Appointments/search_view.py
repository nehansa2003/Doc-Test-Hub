from django.shortcuts import render
from.models import Doctor,Test
from.search_form import SearchDoctorForm,SearchTestForm
from difflib import get_close_matches
from django.views import View
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework import status
class SearchDoctorsAPIView(APIView):

    def get(self, request):
        form = SearchDoctorForm(request.GET or None)
        doctors = Doctor.objects.all()
        suggestions = []
        selected_doctor_details = None
        search_results = []

        if form.is_valid():
            name = form.cleaned_data.get('Name')
            speciality = form.cleaned_data.get('Specialization')

            if name:
                doctors = doctors.filter(Name__icontains=name)
            if speciality:
                doctors = doctors.filter(Specialization__icontains=speciality)

            if doctors.exists():
                # Full list of matched doctors
                search_results = list(doctors.values(
                    'Doc_ID', 'Name', 'Specialization', 'Payment', 'Ch_date_time'
                ))

                # Explicitly select the first doctor from filtered results
                first_doctor = doctors.first()
                selected_doctor_details = {
                    'Doc_ID': first_doctor.Doc_ID,
                    'name': first_doctor.Name,
                    'specialization': first_doctor.Specialization,
                    'payment': float(first_doctor.Payment),
                    'ch_date_time': str(first_doctor.Ch_date_time),
                }

            else:
                # If no match found, generate suggestions
                all_doc_names = Doctor.objects.values_list('Name', flat=True)
                all_specialities = Doctor.objects.values_list('Specialization', flat=True)

                match_names = get_close_matches(name or '', all_doc_names, n=3, cutoff=0.5)
                match_spec = get_close_matches(speciality or '', all_specialities, n=3, cutoff=0.5)
                suggestions = list(set(match_names + match_spec))

        else:
            return Response({'error': 'Invalid input.'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({
            'form_valid': True,
            'form_data': form.cleaned_data,
            'search_results': search_results,
            'suggestions': suggestions,
            'selected_doctor_details': selected_doctor_details,
        }, status=status.HTTP_200_OK)



class SearchTestsAPIView(APIView):
    def get(self, request):
        form = SearchTestForm(request.GET or None)
        tests = Test.objects.all()
        suggestions = []
        selected_test_details = None
        search_results = []

        if form.is_valid():
            name = form.cleaned_data.get('name')
            if name:
                tests = tests.filter(Name__icontains=name)

            if tests.exists():
                test = tests.first()
                selected_test_details = {
                    'Name':test.Name,
                    'precautions': test.Precausions,
                    'requirements': test.Requirements,
                    'time_for_one_person': str(test.Time_for_one_person),
                    'payment': float(test.Payment),
                }
                search_results = list(tests.values('Test_ID', 'Name','Precausions','Requirements','Time_for_one_person','Payment'))
            else:
                all_test_names = Test.objects.values_list('Name', flat=True)
                match_names = get_close_matches(name or '', all_test_names, n=3, cutoff=0.5)
                suggestions = match_names

        else:
            return Response({'error': 'Invalid input.'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({
            'form_valid': True,
            'search_results': search_results,
            'suggestions': suggestions,
            'selected_test_details': selected_test_details,
        }, status=status.HTTP_200_OK)