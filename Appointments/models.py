from django.db import models

# Create your models here.
class Admin(models.Model):
    Ad_ID=models.IntegerField(primary_key=True)
    Name=models.CharField(max_length=255)
    Username=models.CharField(max_length=255,unique=True)
    Password=models.CharField(max_length=255)
    Email=models.EmailField(unique=True)
    Contact_no=models.CharField(max_length=15)
    def save(self ,*args,**kwargs):
        if not self.Ad_ID:
            last_Ad_ID=Admin.objects.order_by('-Ad_ID').first()
            if last_Ad_ID:
              new_Ad_ID=int(last_Ad_ID.Ad_ID)+1
              self.Ad_ID=f"{new_Ad_ID:04d}"
            else:
                self.Ad_ID=1
        super().save(*args,**kwargs)
    def _str_(self):
        return self.Name
    
class Doctor(models.Model):
    Doc_ID=models.IntegerField(primary_key=True)
    Name=models.CharField(max_length=225)
    Gender=models.CharField(max_length=10,choices=[('Male','Male'),('Female','Female')])
    Specialization=models.CharField(max_length=225)
    Email=models.EmailField(unique=True)
    Username=models.CharField(max_length=255,unique=True)
    Password=models.CharField(max_length=255)
    Contact_no=models.CharField(max_length=15)
    Payment=models.DecimalField(max_digits=10,decimal_places=2)
    Ch_date_time=models.JSONField(default=dict)#{"wednesday":{"start":"16.00","end":"19.00"}}
    def save(self ,*args,**kwargs):
        if not self.Doc_ID:
            last_doc_ID=Doctor.objects.order_by('-Doc_ID').first()
            if last_doc_ID is not None:
               new_doc_ID=int(last_doc_ID.Doc_ID)+1
               self.Doc_ID=f"{new_doc_ID:04d}"
            else:
                self.Doc_ID=1
        super().save(*args,**kwargs)
    def _str_(self):
        return f"{self.Name}-{self.Specialization}" #this should be migrate
    
    
class Patient(models.Model):
    P_ID=models.CharField(max_length=10,primary_key=True)
    Name=models.CharField(max_length=225)
    Age=models.IntegerField()
    Gender=models.CharField(max_length=10, choices=[('Male','Male'),('Female','Female')])
    Email=models.EmailField(unique=True)
    Address=models.TextField()
    Contact=models.CharField(max_length=15)
    Username=models.CharField(max_length=255,unique=True)
    Password=models.CharField(max_length=255)
    def save(self ,*args,**kwargs):
        if not self.P_ID:
            last_P_ID=Patient.objects.order_by('-P_ID').first()
            if last_P_ID and last_P_ID.P_ID.startswith('PA') and last_P_ID.P_ID[2:].isdigit():
                new_P_ID=int(last_P_ID.P_ID[2:])+1
                self.P_ID=f"PA{new_P_ID:04d}"
            else:
                self.P_ID="PA0001"
                
        super().save(*args,**kwargs)
    def _str_(self):
        return self.Name

class Test(models.Model):
    Test_ID=models.IntegerField(primary_key=True)
    Name=models.CharField(max_length=225)
    Precausions=models.JSONField(default=dict)
    Requirements=models.JSONField(default=dict)
    Time_for_one_person=models.IntegerField(help_text="Time in minutes.")#this shoul migrate
    Payment=models.DecimalField(max_digits=10,decimal_places=2)
    def save(self ,*args,**kwargs):
        if not self.Test_ID:
            last_Test_ID=Test.objects.order_by('-Test_ID').first()
            if last_Test_ID:
              new_Test_ID=int(last_Test_ID.Test_ID)+1
              self.Test_ID=f"{new_Test_ID:04d}"
            else:
                self.Test_ID=1
        super().save(*args,**kwargs)
    def _str_(self):
        return self.Name
    
class Appointment(models.Model):
    App_ID=models.CharField(max_length=10,primary_key=True)
    patient=models.ForeignKey(Patient,to_field='P_ID',on_delete=models.CASCADE)
    date_time=models.DateTimeField(auto_now_add=True)
    def _str_(self):
        return f"Appointment{self.App_ID}-{self.patient.Name}-on{self.date_time}"
    class Meta:
        abstract=True

class DocAppointment(Appointment):
    doctor=models.ForeignKey(Doctor,on_delete=models.CASCADE)
    time=models.TimeField()
    date=models.DateField()
    reminder_state=models.BooleanField(default=False)
    def save(self ,*args,**kwargs):
        if not self.App_ID:
            last_App_ID=DocAppointment.objects.order_by('-App_ID').first()
            if last_App_ID and last_App_ID.App_ID.startswith('DA') and last_App_ID.P_ID[2:].isdigit():
                new_App_ID=int(last_App_ID.App_ID[2:])+1
                self.App_ID=f"DA{new_App_ID:04d}"
            else:
                self.P_ID="DA0001"
             
        super().save(*args,**kwargs)

class TestAppointment(Appointment):
    test=models.ForeignKey(Test,to_field='Test_ID',on_delete=models.CASCADE)
    time=models.TimeField(max_length=20)
    date=models.DateField()
    reminder_state=models.BooleanField(default=False)
    def save(self ,*args,**kwargs):
        if not self.App_ID:
            last_App_ID=TestAppointment.objects.order_by('-App_ID').first()
            if last_App_ID and last_App_ID.App_ID.startswith('TA') and last_App_ID.App_ID[2:].isdigit():
                new_App_ID=int(last_App_ID.App_ID[2:])+1
                self.App_ID=f"TA{new_App_ID:04d}"
            else:
                self.App_ID="TA0001"
              
        super().save(*args,**kwargs)
    
class Staff(models.Model):
    St_ID=models.IntegerField(primary_key=True)
    Name=models.CharField(max_length=225)
    Role=models.CharField(max_length=225)
    Contact_no=models.CharField(max_length=15)
    Email=models.EmailField(unique=True)
    Username=models.CharField(max_length=225,unique=True)
    Password=models.CharField(max_length=225)
    def save(self ,*args,**kwargs):
        if not self.St_ID:
            last_St_ID=Staff.objects.order_by('-St_ID').first()
            if last_St_ID:
             new_St_ID=int(last_St_ID.St_ID)+1
             self.St_ID=f"{new_St_ID:04d}"
            else:
                self.St_ID=1
        super().save(*args,**kwargs)
    def _str_(self):
        return self.Name

class Doc_payment(models.Model):
    App_ID=models.OneToOneField(DocAppointment,to_field='App_ID',on_delete=models.CASCADE)
    Doc_payment=models.DecimalField(max_digits=10,decimal_places=2,null=True,blank=True)
    date_time=models.DateTimeField(auto_now_add=True)
    St_ID=models.ForeignKey(Staff,to_field='St_ID',on_delete=models.CASCADE)
    def _str_(self):
        return f"Payment for {self.App_ID}-{self.St_ID.Name}-on{self.date_time}"
    
class Test_payment(models.Model):
     App_ID=models.OneToOneField(TestAppointment,to_field='App_ID',on_delete=models.CASCADE)
     test_payment=models.DecimalField(max_digits=10,decimal_places=2,null=True,blank=True)
     date_time=models.DateTimeField(auto_now_add=True)
     St_ID=models.ForeignKey(Staff,to_field='St_ID',on_delete=models.CASCADE)
     def _str_(self):
        return f"Payment for {self.App_ID}-{self.St_ID.Name}-on{self.date_time}"
    
class Result(models.Model):
    App_ID=models.OneToOneField(TestAppointment,to_field='App_ID',on_delete=models.CASCADE)
    Result_file=models.FileField(upload_to='results/')
    St_ID=models.ForeignKey(Staff,to_field='St_ID',on_delete=models.CASCADE)
    date_time=models.DateTimeField(auto_now_add=True)
    def _str_(self):
        return f"Result for {self.App_ID}-on{self.St_ID.Name}-on{self.date_time}"
    
class Annoucement(models.Model):
    A_ID=models.IntegerField(primary_key=True)
    St_ID=models.ForeignKey(Staff,to_field='St_ID',on_delete=models.CASCADE)
    Date=models.DateTimeField(auto_now_add=True)
    Content=models.TextField()
    def save(self ,*args, **kwargs):
        if not self.A_ID:
            last_A_ID=Annoucement.objects.order_by('-A_ID').first()
            self.A_ID = last_A_ID.A_ID + 1 if last_A_ID else 1
        super().save(*args, **kwargs)
        
    def _str_(self):
        return f"Annoucement{self.A_ID} |{self.Date.strftime('%Y-%m-%d %H:%M')}-{self.Content[:30]}"