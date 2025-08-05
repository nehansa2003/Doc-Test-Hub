from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Annoucement
from .serializers import AnnoucementSerializer
from django.shortcuts import get_object_or_404

class AnnouncementListView(APIView):
    def get(self, request):
        announcements = Annoucement.objects.all().order_by('-Date')
        serializer = AnnoucementSerializer(announcements, many=True)
        return Response(serializer.data)

class AnnouncementCreateView(APIView):
    def post(self, request):
        serializer = AnnoucementSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AnnouncementUpdateView(APIView):
    def put(self, request, pk):
        announcement = get_object_or_404(Annoucement, A_ID=pk)
        serializer = AnnoucementSerializer(announcement, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Announcement updated'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AnnouncementDeleteView(APIView):
    def delete(self, request, pk):
        announcement = get_object_or_404(Annoucement, A_ID=pk)
        announcement.delete()
        return Response({'message': 'Announcement deleted'}, status=status.HTTP_204_NO_CONTENT)
