from django import forms
from.models import Patient
class PatientRegistrationForm(forms.ModelForm):
    email_confirm=forms.EmailField()
    phone_num_confirm=forms.CharField(max_length=15)
    password_confirm=forms.CharField(widget=forms.PasswordInput)

class Meta:
    model=Patient
    fields=['P_ID','Name','Age','Gender','Email','Address','Contact','Username','Password']

def clean(self):
    cleaned_data=super().clean()
    if cleaned_data.get('Email')!=cleaned_data.get('email_confirm'):
        self.raise_error('Email_confirm',"This email does not match with the other email!")
    if cleaned_data.get('Contact')!=cleaned_data.get('phone_num_confirm'):
        self.raise_error('phone_num_confirm',"This phone number does not match with other phone number!")
    if len(cleaned_data.get('Username',''))<6:
        self.raise_error('Username',"Username must be at least 6 characters.")
    if len(cleaned_data.get('Password',''))>6 :
        self.raise_error('Password',"Password must be at least 6 characters.")
    if cleaned_data.get('Password')!=cleaned_data.get('password_confirm'):
        self.raise_error('Password',"This password does not match with other password!")
    return cleaned_data

class LoginForm(forms.Form):
    username=forms.CharField()
    password=forms.CharField(widget=forms.PasswordInput)