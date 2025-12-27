from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PropiedadViewSet

router = DefaultRouter()

# La URL  es /api/propiedades
router.register(r'propiedades', PropiedadViewSet, basename='propiedad')

urlpatterns = [
    path('', include(router.urls)),
]
