from django.db import models
from datetime import datetime

# Create your models here.


class Deliveries(models.Model):
    userID = models.IntegerField(default=0)
    truckID = models.IntegerField(default=0)
    itemName = models.CharField(max_length=100)
    itemDescription = models.TextField(blank=True, null=True)
    itemWeight = models.DecimalField(max_digits=8, decimal_places=3)
    occupiedArea = models.DecimalField(max_digits=7, decimal_places=2)
    urgencyRate = models.IntegerField(default=0)
    itemImage = models.ImageField(
        upload_to=None, height_field=None, width_field=None, max_length=None, blank=True, null=True)
    itemCategory = models.CharField(max_length=50)
    deliveryDate = models.DateField(
        (u"Conversation Date"), blank=False, null=False)
    deliveryHour = models.TimeField(
        (u"Conversation Time"), blank=False, null=False)
    # deliveryHour = models.CharField(max_length=50)
    itemQuantity = models.IntegerField(default=1)
    totalPrice = models.DecimalField(max_digits=10, decimal_places=2)
    deliveryOrigin = models.CharField(max_length=50)
    deliveryDestiny = models.CharField(max_length=50)
    deliveryReceiver = models.CharField(max_length=100)
    deliveryAddress = models.CharField(max_length=150)
    paymentMethod = models.CharField(max_length=50)


class Truck(models.Model):
    truckStatus = models.BooleanField(default=False)
    foodMaxQuantity = models.IntegerField(default=0)
    officeMaterialMaxQuantity = models.IntegerField(default=0)
    medicinesMaxQuantity = models.IntegerField(default=0)
    carPartsMaxQuantity = models.IntegerField(default=0)
    staffName = models.CharField(max_length=100)


class Users(models.Model):
    firstName = models.CharField(max_length=50)
    lastName = models.CharField(max_length=50)
    username = models.CharField(max_length=50)
    email = models.EmailField()
    password = models.CharField(max_length=100)
    contact = models.IntegerField(default=0)
    district = models.CharField(max_length=50)
    locality = models.CharField(max_length=100)
    address = models.CharField(max_length=150)
    zipcode = models.CharField(max_length=50)


class WebsiteContacts(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField(blank=False, null=False)
