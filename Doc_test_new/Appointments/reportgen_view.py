from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Doc_payment, Test_payment, Result
from .serializers import Doc_paymentSerializer, Test_paymentSerializer, ResultSerializer

class DoctorPaymentListView(APIView):
    def get(self, request):
        payments = Doc_payment.objects.select_related('App_ID', 'St_ID').all()
        serializer = Doc_paymentSerializer(payments, many=True)
        return Response(serializer.data)

class TestPaymentListView(APIView):
    def get(self, request):
        payments = Test_payment.objects.select_related('App_ID', 'St_ID').all()
        serializer = Test_paymentSerializer(payments, many=True)
        return Response(serializer.data)


class TestResultListView(APIView):
    def get(self, request):
        results = Result.objects.select_related('App_ID', 'St_ID').all()
        serializer = ResultSerializer(results, many=True)
        return Response(serializer.data)
