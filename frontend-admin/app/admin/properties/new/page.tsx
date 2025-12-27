"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Upload, X, Plus } from "lucide-react"
// import { Button } from "@/components/ui/button"
import { Button } from "@/app/components/ui/button"
import localFont from "next/font/local";
import axios from "axios"
import { useRouter } from "next/navigation"


const neikoFont = localFont({
    src: "../../../../assets/fonts/NeikoRegular-XGMP2.woff",
    variable: "--font-neiko",
    display: "swap",
});

const satoshiFont = localFont({
    src: [
        {
            path: "../../../../assets/fonts/Satoshi-Light.otf",
            weight: "300",
            style: "normal",
        },
        {
            path: "../../../../assets/fonts/Satoshi-Regular.otf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../../../assets/fonts/Satoshi-Medium.otf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../../../../assets/fonts/Satoshi-Bold.otf",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-satoshi",
    display: "swap",
});

export default function NewPropertyPage() {
    const [formData, setFormData] = useState({
        title: "",
        location: "",
        locationDetails: [] as string[],
        favourite: false,
        available: true,
        price: "",
        construction: "",
        terrain: "",
        bedrooms: 1,
        bathrooms: 1,
        parking: 1,
        paymentMethods: [] as string[],
        propertyFeatures: [] as string[],
        amenities: [] as string[],
        description: "",
    })

    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [newLocationDetail, setNewLocationDetail] = useState("")

    const router = useRouter();

    const paymentMethodOptions = [
        "Recurso propio",
        "Crédito bancario",
        "Infonavit",
        "Cofinavit",
        "Fovissste",
        "Cofinanciamiento",
    ]

    const propertyFeaturesOptions = [
        "Estacionamiento techado",
        "Estacionamiento libre",
        "Sala comedor",
        "Cocina",
        "Recámara en PB",
        "Bodega",
        "Oficina",
        "Jardín",
        "Terraza",
        "Doble altura",
        "Balcón",
        "Vestidor",
        "Sala de TV",
        "Cuarto servicio",
        "Cuarto de lavado",
        "Sala de juegos",
        "Roof garden",
        "Amueblado",
        "Mascotas permitidas",
        "En esquina",
        "Aire acondicionado",
    ]

    const amenitiesOptions = [
        "Fraccionamiento",
        "Salón de fiestas",
        "Gimnasio",
        "Alberca",
        "Vigilancia",
        "Cámaras de seguridad",
        "Jardín",
        "Mantenimiento",
    ]

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newFiles = Array.from(files);
            setImageFiles([...imageFiles, ...newFiles]);

            const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
            setPreviews([...previews, ...newPreviews]);
        }
    };

    const removeImage = (index: number) => {
        setImageFiles(imageFiles.filter((_, i) => i !== index))
    }

    const addLocationDetail = () => {
        if (newLocationDetail.trim()) {
            setFormData({
                ...formData,
                locationDetails: [...formData.locationDetails, newLocationDetail.trim()],
            })
            setNewLocationDetail("")
        }
    }

    const removeLocationDetail = (index: number) => {
        setFormData({
            ...formData,
            locationDetails: formData.locationDetails.filter((_, i) => i !== index),
        })
    }

    const toggleSelection = (field: "paymentMethods" | "propertyFeatures" | "amenities", value: string) => {
        const current = formData[field]
        const updated = current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
        setFormData({ ...formData, [field]: updated })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = new FormData();


        // 1. Agregamos los campos de texto
        data.append("title", formData.title);
        data.append("location", formData.location);
        data.append("price", formData.price.toString());
        data.append("construction", formData.construction);
        data.append("terrain", formData.terrain);
        data.append("favourite", formData.favourite.toString());
        data.append("available", formData.available.toString());
        data.append("area", formData.construction);
        data.append("bedrooms", formData.bedrooms.toString());
        data.append("bathrooms", formData.bathrooms.toString());
        data.append("parking", formData.parking.toString());
        data.append("description", formData.description);

        // 2. Agregamos los arrays (JSON stringified para que Django los entienda)
        data.append("locationDetails", JSON.stringify(formData.locationDetails));
        data.append("paymentMethods", JSON.stringify(formData.paymentMethods));
        data.append("propertyFeatures", JSON.stringify(formData.propertyFeatures));
        data.append("amenities", JSON.stringify(formData.amenities));

        // 3. AGREGAMOS LOS ARCHIVOS REALES
        imageFiles.forEach((file) => {
            data.append("uploaded_images", file);
        });

        console.log(formData);

        try {
            const response = await fetch("http://localhost:8000/api/propiedades/", {
                method: "POST",
                body: data, // No enviamos JSON, enviamos el FormData directamente
                // NOTA: No pongas 'Content-Type' header, el navegador lo pondrá automáticamente con el "boundary"
            });

            if (response.ok) {
                alert("¡Propiedad e imágenes guardadas con éxito!");
                router.replace('../../../admin/properties')
            } else {
                const errorData = await response.json();
                console.log("Errores de validación: ", errorData);
            }
        } catch (error) {
            console.error("Error al subir:", error);
        }
    };

    return (
        <div className={`${satoshiFont.variable} ${neikoFont.variable} font-sans`}>
            <div className="min-h-screen bg-[#131415] text-zinc-100">
                {/* Header */}
                <div className="border-b border-zinc-800/50 backdrop-blur-sm bg-[#131415] sticky top-0 z-10">
                    <div className="max-w-7xl mx-auto px-6 py-4">
                        <div className="flex items-center gap-4">
                            <div className="bg-[#131415]">
                                <h1 className="text-4xl font-light tracking-tight">Nueva Propiedad</h1>
                                <p className="mt-2 text-2xl text-zinc-500 font-light">Completa los detalles de la propiedad</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Información Básica */}
                        <div className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-lg p-8">
                            <h2 className="text-xl font-light mb-6 text-zinc-100">Información Básica</h2>
                            <div className="space-y-6">
                                {/* Título */}
                                <div>
                                    <label className="block text-sm font-light text-zinc-400 mb-2">Título de la propiedad</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 font-light focus:outline-none focus:border-zinc-600 transition-colors"
                                        placeholder="Ej: Casa moderna en zona residencial"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-light text-zinc-400 mb-2">Ubicación</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 font-light focus:outline-none focus:border-zinc-600 transition-colors"
                                            placeholder="Ej: Guadalajara, Jalisco"
                                            required
                                        />
                                    </div>

                                    {/* Detalles adicionales de ubicación */}
                                    <div className="mt-3 space-y-2">
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={newLocationDetail}
                                                onChange={(e) => setNewLocationDetail(e.target.value)}
                                                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addLocationDetail())}
                                                className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-zinc-100 font-light focus:outline-none focus:border-zinc-600 transition-colors"
                                                placeholder="Agregar detalle adicional (colonia, referencias, etc.)"
                                            />
                                            <Button
                                                type="button"
                                                onClick={addLocationDetail}
                                                className="bg-zinc-800 hover:bg-[#E59136] text-zinc-100 px-4"
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        {formData.locationDetails.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {formData.locationDetails.map((detail, index) => (
                                                    <div
                                                        key={index}
                                                        className="bg-zinc-800/50 border border-zinc-700 rounded-md px-3 py-1 text-sm text-zinc-300 flex items-center gap-2"
                                                    >
                                                        {detail}
                                                        <button
                                                            type="button"
                                                            onClick={() => removeLocationDetail(index)}
                                                            className="text-zinc-500 hover:text-zinc-300"
                                                        >
                                                            <X className="h-3 w-3" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Precio */}
                                <div>
                                    <label className="block text-sm font-light text-zinc-400 mb-2">Precio</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">$</span>
                                        <input
                                            type="text"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg pl-8 pr-4 py-3 text-zinc-100 font-light focus:outline-none focus:border-zinc-600 transition-colors"
                                            placeholder="0.00"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Construcción */}
                                <div>
                                    <label className="block text-sm font-light text-zinc-400 mb-2">Construcción</label>
                                    <input
                                        type="text"
                                        value={formData.construction}
                                        onChange={(e) => setFormData({ ...formData, construction: e.target.value })}
                                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 font-light focus:outline-none focus:border-zinc-600 transition-colors"
                                        placeholder="Ej: 250"
                                        required
                                    />
                                </div>

                                {/* Terreno */}
                                <div>
                                    <label className="block text-sm font-light text-zinc-400 mb-2">Terreno</label>
                                    <input
                                        type="text"
                                        value={formData.terrain}
                                        onChange={(e) => setFormData({ ...formData, terrain: e.target.value })}
                                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 font-light focus:outline-none focus:border-zinc-600 transition-colors"
                                        placeholder="Ej: 250"
                                        required
                                    />
                                </div>

                                {/* Favourite */}
                                <div>
                                    <input
                                        type="checkbox"
                                        id="favourite"
                                        checked={formData.favourite}
                                        onChange={(e) => setFormData({ ...formData, favourite: e.target.checked })}
                                        className="mr-2 accent-orange-400  bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-blue-500 font-light focus:outline-none focus:border-zinc-600 "
                                        placeholder="Ej: 250"
                                        required
                                    />
                                    <label htmlFor="favourite" className="text-sm font-light text-zinc-400 mb-2">Favorito</label>
                                    
                                </div>

                                <div>
                                    <input
                                        type="checkbox"
                                        id="available"
                                        checked={formData.available}
                                        onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                                        className="mr-2 accent-orange-400  bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-blue-500 font-light focus:outline-none focus:border-zinc-600 "
                                        placeholder="Ej: 250"
                                        required
                                    />
                                    <label htmlFor="favourite" className="text-sm font-light text-zinc-400 mb-2">Disponible</label>

                                </div>
                            </div>
                        </div>

                        <div className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-lg p-8">
                            <h2 className="text-xl font-light mb-6 text-zinc-100">Espacios</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {/* Recámaras */}
                                <div>
                                    <label className="block text-sm font-light text-zinc-400 mb-2">Recámaras</label>
                                    <select
                                        value={formData.bedrooms}
                                        onChange={(e) => setFormData({ ...formData, bedrooms: Number.parseInt(e.target.value) })}
                                        className="w-full bg-[#131415] border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 font-light focus:outline-none focus:border-zinc-600 transition-colors"
                                    >
                                        {[1, 2, 3, 4, 5, 6].map((num) => (
                                            <option key={num} value={num}>
                                                {num} {num === 1 ? "recámara" : "recámaras"}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Baños */}
                                <div>
                                    <label className="block text-sm font-light text-zinc-400 mb-2">Baños</label>
                                    <select
                                        value={formData.bathrooms}
                                        onChange={(e) => setFormData({ ...formData, bathrooms: Number.parseInt(e.target.value) })}
                                        className="w-full bg-[#131415] border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 font-light focus:outline-none focus:border-zinc-600 transition-colors"
                                    >
                                        {[1, 2, 3, 4, 5, 6].map((num) => (
                                            <option key={num} value={num}>
                                                {num} {num === 1 ? "baño" : "baños"}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Estacionamientos */}
                                <div>
                                    <label className="block text-sm font-light text-zinc-400 mb-2">Estacionamientos</label>
                                    <select
                                        value={formData.parking}
                                        onChange={(e) => setFormData({ ...formData, parking: Number.parseInt(e.target.value) })}
                                        className="w-full bg-[#131415] border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 font-light focus:outline-none focus:border-zinc-600"
                                    >
                                        {[1, 2, 3, 4, 5, 6].map((num) => (
                                            <option key={num} value={num}>
                                                {num} {num === 1 ? "espacio" : "espacios"}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-lg p-8">
                            <h2 className="text-xl font-light mb-6 text-zinc-100">Métodos de Pago</h2>
                            <div className="grid md:grid-cols-3 gap-3">
                                {paymentMethodOptions.map((method) => (
                                    <button
                                        key={method}
                                        type="button"
                                        onClick={() => toggleSelection("paymentMethods", method)}
                                        className={`px-4 py-3 rounded-lg border text-sm font-light transition-all ${formData.paymentMethods.includes(method)
                                            ? "bg-[#E59136] border-zinc-600 text-zinc-100"
                                            : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                                            }`}
                                    >
                                        {method}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-lg p-8">
                            <h2 className="text-xl font-light mb-6 text-zinc-100">Descripción de la Propiedad</h2>
                            <div className="space-y-4">
                                <div className="grid md:grid-cols-3 gap-3">
                                    {propertyFeaturesOptions.map((feature) => (
                                        <button
                                            key={feature}
                                            type="button"
                                            onClick={() => toggleSelection("propertyFeatures", feature)}
                                            className={`px-4 py-3 rounded-lg border text-sm font-light transition-all text-left ${formData.propertyFeatures.includes(feature)
                                                ? "bg-[#E59136] border-zinc-600 text-zinc-100"
                                                : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                                                }`}
                                        >
                                            {feature}
                                        </button>
                                    ))}
                                </div>

                                <div>
                                    <label className="block text-sm font-light text-zinc-400 mb-2">Descripción adicional</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows={4}
                                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 font-light focus:outline-none focus:border-zinc-600 transition-colors resize-none"
                                        placeholder="Agrega detalles adicionales sobre la propiedad..."
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-lg p-8">
                            <h2 className="text-xl font-light mb-6 text-zinc-100">Características</h2>
                            <div className="grid md:grid-cols-4 gap-3">
                                {amenitiesOptions.map((amenity) => (
                                    <button
                                        key={amenity}
                                        type="button"
                                        onClick={() => toggleSelection("amenities", amenity)}
                                        className={`px-4 py-3 rounded-lg border text-sm font-light transition-all ${formData.amenities.includes(amenity)
                                            ? "bg-[#E59136] border-zinc-600 text-zinc-100"
                                            : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                                            }`}
                                    >
                                        {amenity}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Imágenes */}
                        <div className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-lg p-8">
                            <h2 className="text-xl font-light mb-6 text-zinc-100">Imágenes</h2>
                            <div className="space-y-4">
                                <div className="border-2 border-dashed border-zinc-800 rounded-lg p-8 text-center hover:border-zinc-700 transition-colors">
                                    <input
                                        type="file"
                                        id="images"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                    <label htmlFor="images" className="cursor-pointer">
                                        <Upload className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                                        <p className="text-zinc-400 font-light">Haz clic o arrastra imágenes aquí</p>
                                        <p className="text-sm text-zinc-600 font-light mt-1">PNG, JPG hasta 10MB</p>
                                    </label>
                                </div>

                                {/* {images.length > 0 && (
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {images.map((image, index) => (
                                            <div key={index} className="relative group">
                                                <img
                                                    src={image || "/placeholder.svg"}
                                                    alt={`Preview ${index + 1}`}
                                                    className="w-full h-32 object-cover rounded-lg border border-zinc-800"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )} */}
                            </div>
                        </div>

                        {/* Botones de acción */}
                        <div className="flex justify-end gap-4">
                            <Link href="/admin">
                                <Button variant="outline" className="border-zinc-800 text-zinc-400 hover:text-[#131415] bg-transparent">
                                    Cancelar
                                </Button>
                            </Link>
                            <Button type="submit" onClick={handleSubmit} className="bg-zinc-100 text-zinc-900 hover:bg-[#E59136] hover:text-[#F6F6F6]">
                                Publicar Propiedad
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}
