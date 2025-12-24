from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PropiedadViewSet

router = DefaultRouter()
# El primer parámetro 'propiedades' construye la URL: /api/propiedades/
router.register(r'propiedades', PropiedadViewSet, basename='propiedad')

urlpatterns = [
    path('', include(router.urls)),
]
