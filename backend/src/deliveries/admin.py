from django.contrib import admin
from .models import Deliveries, Truck, Users, WebsiteContacts

# Register your models here.
admin.site.register(Deliveries)
admin.site.register(Truck)
admin.site.register(Users)
admin.site.register(WebsiteContacts)
