from django import forms
class SearchDoctorForm(forms.Form):
    Name=forms.CharField(required=False)
    Specialization=forms.CharField(required=False)

class SearchTestForm(forms.Form):
    name=forms.CharField(required=False)