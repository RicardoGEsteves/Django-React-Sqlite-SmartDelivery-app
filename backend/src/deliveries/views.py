from django.shortcuts import render
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from .models import Deliveries, Truck, Users, WebsiteContacts
from .serializers import DeliveriesSerializer, TruckSerializer, UsersSerializer, WebsiteContactsSerializer

# Create your views here.


class DeliveriesView(viewsets.ModelViewSet):
    queryset = Deliveries.objects.all()
    serializer_class = DeliveriesSerializer
    filter_backends = (DjangoFilterBackend,)


class TruckView(viewsets.ModelViewSet):
    queryset = Truck.objects.all()
    serializer_class = TruckSerializer
    filter_backends = (DjangoFilterBackend,)


class UsersView(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer
    filter_backends = (DjangoFilterBackend,)


class WebsiteContactsView(viewsets.ModelViewSet):
    queryset = WebsiteContacts.objects.all()
    serializer_class = WebsiteContactsSerializer
    filter_backends = (DjangoFilterBackend,)
