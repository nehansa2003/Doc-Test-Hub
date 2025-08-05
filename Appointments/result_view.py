from django.http import JsonResponse
from .models import Result, TestAppointment,Staff
from django.core.files.storage import default_storage
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
@method_decorator(csrf_exempt, name='dispatch')
class UploadResultView(View):

    def post(self, request):
        app_id = request.POST.get('App_ID')
        result_file = request.FILES.get('Result_file')
        staff_id = request.POST.get('St_ID')
        if not app_id or not result_file:
            return JsonResponse({'error': 'Missing App_ID,St_ID or file'}, status=400)

        try:
            appointment = TestAppointment.objects.get(App_ID=app_id)
            staff = Staff.objects.get(St_ID=staff_id)
            # Prevent duplicate result upload
            if Result.objects.filter(App_ID=appointment).exists():
                return JsonResponse({'error': 'Result already uploaded for this appointment'}, status=400)

            result = Result.objects.create(App_ID=appointment, Result_file=result_file,St_ID=staff)
            return JsonResponse({'message': 'Result uploaded successfully'})
        except TestAppointment.DoesNotExist:
            return JsonResponse({'error': 'Invalid App_ID'}, status=404)

    def get(self, request):
        return JsonResponse({'error': 'Invalid request method'}, status=405)
