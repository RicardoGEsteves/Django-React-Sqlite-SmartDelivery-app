from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'Deliveries', views.DeliveriesView, base_name='deliveries')
router.register(r'Truck', views.TruckView, base_name='truck')
router.register(r'Users', views.UsersView, base_name='users')
router.register(r'WebsiteContacts', views.WebsiteContactsView,
                base_name='websiteContacts')


urlpatterns = router.urls

# urlpatterns = [
#     path('', include(router.urls))
# ]
