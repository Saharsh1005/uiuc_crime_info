from django.db import models
# Create your models here.

class User(models.Model):
    id = models.IntegerField(primary_key=True)
    email = models.CharField(max_length = 150)
    password = models.CharField(max_length = 150)
    username = models.CharField(max_length = 150)
    is_admin = models.BooleanField()
    def __str__(self):
        return self.username

class Crime(models.Model):
    crime_no = models.CharField(max_length = 150)
    date_reported = models.DateTimeField()
    date_occured = models.DateTimeField()
    location = models.CharField(max_length = 150)
    description = models.CharField(max_length=1000)
    def __str__(self):
        return self.cime_no

class Tip(models.Model):
    title = models.CharField(max_length = 150)
    date_reported = models.DateTimeField()
    date_of_crime = models.DateTimeField(null=True)
    description = models.CharField(max_length=1000)
    is_reviewed = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title



