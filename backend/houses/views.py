from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Propiedad, PropiedadImagen
from .serializers import PropiedadSerializer, ImagenSerializer


class PropiedadViewSet(viewsets.ModelViewSet):
    queryset = Propiedad.objects.all().order_by('-created_at')
    serializer_class = PropiedadSerializer

    # 1. GET HEADER -> Propiedades (Resumen simple o solo nombres)
    @action(detail=False, methods=['get'])
    def header_info(self):
        propiedades = self.get_queryset()[:10]  # Ejemplo: las 10 más recientes
        serializer = self.get_serializer(propiedades, many=True)
        return Response(serializer.data)

    # 2. GET 5 FAVORITAS DEL PÚBLICO
    # (Asumiendo que podrías agregar un campo 'es_favorita' o por fecha)
    @action(detail=False, methods=['get'])
    def favoritas_publico(self):
        # Aquí puedes filtrar por las más vistas o marcadas como favoritas
        favoritas = Propiedad.objects.all()[:5]
        serializer = self.get_serializer(favoritas, many=True)
        return Response(serializer.data)

    # 3. GET 5 FAV MAU
    @action(detail=False, methods=['get'])
    def fav_mau(self):
        # Filtro específico para la selección de "Mau"
        favs = Propiedad.objects.filter(ciudad="Ciudad de México")[
            :5]  # Ejemplo de filtro
        serializer = self.get_serializer(favs, many=True)
        return Response(serializer.data)
