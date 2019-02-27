from rest_framework import serializers
from .models import Deliveries, Truck, Users, WebsiteContacts


class DeliveriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deliveries
        fields = ('id', 'userID', 'truckID', 'itemName', 'itemDescription', 'itemWeight', 'occupiedArea', 'urgencyRate', 'itemImage', 'itemCategory',
                  'deliveryDate', 'deliveryHour', 'itemQuantity', 'totalPrice', 'deliveryOrigin', 'deliveryDestiny', 'deliveryReceiver', 'deliveryAddress', 'paymentMethod')


class TruckSerializer(serializers.ModelSerializer):
    class Meta:
        model = Truck
        fields = ('id', 'truckStatus', 'foodMaxQuantity', 'officeMaterialMaxQuantity',
                  'medicinesMaxQuantity', 'carPartsMaxQuantity', 'staffName')


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('id', 'firstName', 'lastName', 'username', 'email',
                  'password', 'contact', 'district', 'locality', 'address', 'zipcode')


class WebsiteContactsSerializer(serializers.ModelSerializer):
    class Meta:
        model = WebsiteContacts
        fields = ('name', 'email', 'message')
