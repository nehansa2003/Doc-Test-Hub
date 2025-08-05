from django.urls import path, include
from rest_framework.routers import DefaultRouter
from.views import (AdminViewSet,DoctorViewSet,PatientViewSet,TestViewSet,AppointmentViewSet,DocAppointmentViewSet,TestsAppointmentViewSet,Doc_paymentViewSet,Test_paymentViewSet,StaffViewSet,ResultsViewSet)
from. views import LoginView,Register,LogoutView,ResetPassword
from.adding_view import AddTest,AddAdmin,AddDoctor,AddStaff
from.search_view import SearchDoctorsAPIView,SearchTestsAPIView
from .result_view import UploadResultView
from .testBook_views import testBook,Book_test_appointment
from .DocBook_views import Get_doctor_available_slots,GetDoctorsBySpecialization,CreateDocAppointment
from .annoucement_view import ( AnnouncementListView,AnnouncementCreateView, AnnouncementUpdateView, AnnouncementDeleteView,)
from .reportgen_view import DoctorPaymentListView, TestPaymentListView, TestResultListView
from .remove_view import (  AdminDeleteView, DoctorDeleteView, StaffDeleteView, TestDeleteView,)
from .appoiDoc_view import  DoctorSlotsView
from .appoiPati_view import PatientAppointmentsView, CancelAppointmentView
from .payment_view import FetchPaymentDataView,SaveDocPaymentView,SaveTestPaymentView
router=DefaultRouter()
router.register(r'Admin',AdminViewSet)
router.register(r'Doctor',DoctorViewSet)
router.register(r'Patient',PatientViewSet)
router.register(r'Test',TestViewSet)
router.register(r'Appointment',AppointmentViewSet,basename='appointment')
router.register(r'DocAppointment',DocAppointmentViewSet)
router.register(r'TestAppointment',TestsAppointmentViewSet)
router.register(r'Doc_payment',Doc_paymentViewSet)
router.register(r'Test_payment',Test_paymentViewSet)
router.register(r'Staff',StaffViewSet)
router.register(r'result',ResultsViewSet)
admin_list = AdminViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
doctor_list = DoctorViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
staff_list = StaffViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
test_list = TestViewSet.as_view({
    'get': 'list',
    'post': 'create'
})


urlpatterns=[
    path("",include(router.urls)),
    path('register/',Register.as_view(),name='register'),
    path('login/',LoginView.as_view(),name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('reset-password/',ResetPassword.as_view(),name='reset-password'),
    path('search-doctors/', SearchDoctorsAPIView.as_view(), name='search-doctors'),
    path('search-tests/', SearchTestsAPIView.as_view(), name='search-tests'),
    path('api/add_doctor/',AddDoctor.as_view(),name='add_doctor'),
    path('api/add_test/',AddTest.as_view(),name='add_test'),
    path('api/add_admin/',AddAdmin.as_view(),name="add_admin"),
    path('api/add_staff/',AddStaff.as_view(),name='add_staff'), 
    path('upload-result/', UploadResultView.as_view(), name='upload_result'),
    path('api/testBook/',testBook.as_view(),name='testBook'),
    path('api/DocBook/',Get_doctor_available_slots.as_view(),name='DocBook'),
    path('api/testBook',Book_test_appointment.as_view(),name='testBook'),
    path('api/announcements/', AnnouncementListView.as_view()),
    path('api/announcements/create/', AnnouncementCreateView.as_view()),
    path('api/announcements/<int:pk>/update/', AnnouncementUpdateView.as_view()),
    path('api/announcements/<int:pk>/delete/', AnnouncementDeleteView.as_view()),
    path('api/doctor-payments/', DoctorPaymentListView.as_view(), name='doctor-payments'),
    path('api/test-payments/', TestPaymentListView.as_view(), name='test-payments'),
    path('api/test-results/', TestResultListView.as_view(), name='test-results'),
    path('admins/', admin_list, name='admin-list'),
    path('admins/<int:pk>/delete/', AdminDeleteView.as_view(), name='admin-delete'),
    path('doctors/', doctor_list, name='doctor-list'),
    path('doctors/<int:pk>/delete/', DoctorDeleteView.as_view(), name='doctor-delete'),
    path('staff/', staff_list, name='staff-list'),
    path('staff/<int:pk>/delete/', StaffDeleteView.as_view(), name='staff-delete'),
    path('tests/', test_list, name='test-list'),
    path('tests/<int:pk>/delete/', TestDeleteView.as_view(), name='test-delete'),
    path('api/doctors/<str:doc_id>/slots/', DoctorSlotsView.as_view(), name='doctor-slots'),
    path('api/appointments/<str:patient_id>/', PatientAppointmentsView.as_view(), name='patient-appointments'),
    path('api/appointments/<str:app_id>/cancel/', CancelAppointmentView.as_view(), name='cancel-appointment'),
    path('api/getDoctors',GetDoctorsBySpecialization.as_view(),name='getDoctors'),
    path('api/getPaymentDetails',FetchPaymentDataView.as_view(),name='getPaymentDetails'),
    path('api/save-testPayment',SaveTestPaymentView.as_view(),name='save-testPayment'),
    path('api/save-docPayment',SaveDocPaymentView.as_view(),name='save-docPayment'),
    path('api/createDocAppointment',CreateDocAppointment.as_view(),name='createDocAppointment'),
]