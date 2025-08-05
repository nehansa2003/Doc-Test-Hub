from django.utils import timezone
from datetime import timedelta
from .models import TestAppointment,DocAppointment
from django.core.mail import send_mail

def send_test_reminders():
    now = timezone.now()
    target_time = now + timedelta(hours=12)
    appointments = TestAppointment.objects.filter(
        reminder_sent=False,
        date=target_time.date()
    )

    for appointment in appointments:
        send_mail(
            subject='Upcoming Medical Test Reminder',
            message=f"Reminder: Your test '{appointment.test.Name}' is scheduled at {appointment.date} on {appointment.time}.",
            from_email='noreply@docandtesthub.com',
            recipient_list=[appointment.patient.Email],
        )
        appointment.reminder_sent = True
        appointment.save()

def send_DocApp_reminders():
    now = timezone.now()
    target_time = now + timedelta(hours=12)
    appointments = DocAppointment.objects.filter(
        reminder_sent=False,
        date=target_time.date()
    )

    for appointment in appointments:
        send_mail(
            subject='Upcoming Medical Consultation Reminder',
            message=f"Reminder: Your Channel for '{appointment.doctor.Name}' is scheduled at {appointment.date} on {appointment.time}.",
            from_email='noreply@docandtesthub.com',
            recipient_list=[appointment.patient.Email],
        )
        appointment.reminder_sent = True
        appointment.save()