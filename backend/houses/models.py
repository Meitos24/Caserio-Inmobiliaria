from django.db import models

# Create your models here.
from django.db import models


class Propiedad(models.Model):
    # Campos que coinciden con tu formData de React
    title = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    locationDetails = models.JSONField(default=list, blank=True)  # string[]

    price = models.DecimalField(max_digits=15, decimal_places=2)
    area = models.CharField(max_length=50)  # "250"

    bedrooms = models.IntegerField(default=1)
    bathrooms = models.IntegerField(default=1)
    parking = models.IntegerField(default=1)

    # Listas de selección múltiple de tu frontend
    paymentMethods = models.JSONField(default=list, blank=True)   # string[]
    propertyFeatures = models.JSONField(default=list, blank=True)  # string[]
    amenities = models.JSONField(default=list, blank=True)        # string[]

    description = models.TextField(blank=True)

    # Para guardar las URLs de las imágenes después de subirlas
    images = models.JSONField(default=list, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Propiedades"

    def __str__(self):
        return self.title


class PropiedadImagen(models.Model):
    propiedad = models.ForeignKey(
        Propiedad, related_name='imagenes', on_delete=models.CASCADE)
    imagen = models.ImageField(
        upload_to='propiedades/%Y/%m/')  # Organiza por año/mes
