from django.shortcuts import render
from django.http import JsonResponse
# Create your views here.
from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Propiedad, PropiedadImagen
from .serializers import PropiedadSerializer, ImagenSerializer

class PropiedadViewSet(viewsets.ModelViewSet):
    # queryset = Propiedad.objects.all().order_by('-created_at')
    serializer_class = PropiedadSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['favourite']
    
    # def create(self, request):
    #     if self.request.method == 'POST':
    #         print(self.request.data)
    #     return JsonResponse({"mensaje": "Propiedad creada"})
    
    def get_queryset(self):
        queryset = Propiedad.objects.all().order_by('-created_at')
        favourite = self.request.query_params.get('favourite')
        if favourite is not None:
            queryset = queryset.filter(favourite=favourite)
        return queryset
    

    # 1. GET HEADER -> Propiedades (Resumen simple o solo nombres)
    @action(detail=False, methods=['get'])
    def header_info(self):
        propiedades = self.get_queryset()[:10]  # Ejemplo: las 10 más recientes
        serializer = self.get_serializer(propiedades, many=True)
        return Response(serializer.data)
