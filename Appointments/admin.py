from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import (
    Admin, Doctor, Patient, Test, DocAppointment, TestAppointment,
    Staff, Doc_payment, Test_payment, Result, Annoucement
)

@admin.register(Admin)
class AdminAdmin(admin.ModelAdmin):
    list_display = ('Ad_ID', 'Name', 'Username', 'Email', 'Contact_no')

@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ('Doc_ID', 'Name', 'Gender', 'Specialization', 'Email', 'Contact_no')

@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ('P_ID', 'Name', 'Age', 'Gender', 'Email', 'Contact')

@admin.register(Test)
class TestAdmin(admin.ModelAdmin):
    list_display = ('Test_ID', 'Name', 'Payment', 'Time_for_one_person')

@admin.register(DocAppointment)
class DocAppointmentAdmin(admin.ModelAdmin):
    list_display = ('App_ID', 'patient', 'doctor', 'date', 'time', 'reminder_state')

@admin.register(TestAppointment)
class TestAppointmentAdmin(admin.ModelAdmin):
    list_display = ('App_ID', 'patient', 'test', 'date', 'time', 'reminder_state')

@admin.register(Staff)
class StaffAdmin(admin.ModelAdmin):
    list_display = ('St_ID', 'Name', 'Role', 'Email', 'Contact_no')

@admin.register(Doc_payment)
class DocPaymentAdmin(admin.ModelAdmin):
    list_display = ('App_ID', 'Doc_payment', 'St_ID', 'date_time')

@admin.register(Test_payment)
class TestPaymentAdmin(admin.ModelAdmin):
    list_display = ('App_ID', 'test_payment', 'St_ID', 'date_time')

@admin.register(Result)
class ResultAdmin(admin.ModelAdmin):
    list_display = ('App_ID', 'St_ID', 'date_time')

@admin.register(Annoucement)
class AnnouncementAdmin(admin.ModelAdmin):
    list_display = ('A_ID', 'St_ID', 'Date', 'Content')
