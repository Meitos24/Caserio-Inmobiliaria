from rest_framework import serializers
from .models import Propiedad, PropiedadImagen


class ImagenSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropiedadImagen
        fields = ['imagen']


class PropiedadSerializer(serializers.ModelSerializer):
    # Esto permite ver las imágenes cuando consultes la propiedad
    imagenes = ImagenSerializer(many=True, read_only=True)

    class Meta:
        model = Propiedad
        fields = '__all__'

    def create(self, validated_data):
        # Extraemos las imágenes de la petición
        images_data = self.context.get('view').request.FILES
        propiedad = Propiedad.objects.create(**validated_data)

        # Guardamos cada imagen vinculada a la propiedad
        for image_file in images_data.getlist('uploaded_images'):
            PropiedadImagen.objects.create(
                propiedad=propiedad, imagen=image_file)

        return propiedad
