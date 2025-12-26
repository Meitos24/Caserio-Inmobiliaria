'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import localFont from "next/font/local";
import { useRouter } from "next/navigation";


const neikoFont = localFont({
    src: "../../../assets/fonts/NeikoRegular-XGMP2.woff",
    variable: "--font-neiko",
    display: "swap",
});

const satoshiFont = localFont({
    src: [
        { path: "../../../assets/fonts/Satoshi-Light.otf", weight: "300", style: "normal" },
        { path: "../../../assets/fonts/Satoshi-Regular.otf", weight: "400", style: "normal" },
        { path: "../../../assets/fonts/Satoshi-Medium.otf", weight: "500", style: "normal" },
        { path: "../../../assets/fonts/Satoshi-Bold.otf", weight: "700", style: "normal" },
    ],
    variable: "--font-satoshi",
    display: "swap",
});

export default function PropertiesPage() {

    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const router = useRouter();

    // Estados para el modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProperty, setSelectedProeprty] = useState(null);

    // Obtener propiedades del back
    useEffect(() => {
        // setLoading(true);
        fetch("http://localhost:8000/api/propiedades/")
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                setProperties(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error al cargar propiedades:", err);
                setError(err);
                setLoading(false);
            });
    }, []);

    const handleEditClick = (property) => {
        setSelectedProeprty(property);
        setIsModalOpen(true);
        router.replace('/admin/properties/edit')
    }



    if (loading) return <div className="text-center p-8">Cargando propiedades...</div>;
    if (error) return <div className="text-center p-8 text-red-600">Error: {error.message}</div>;
    if (properties.length === 0) return <div className="text-center p-8">No hay propiedades publicadas aún.</div>;

    return (
        <div className={`${satoshiFont.variable} ${neikoFont.variable} font-sans`}>
            <main className="relative min-h-screen w-full bg-[#131415] text-white">
                <nav className="px-10 py-6 border-b border-white/10">
                    <span className="text-2xl md:text-2xl uppercase tracking-widest ">
                        Administrar Propiedades
                    </span>
                </nav>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-10 ">
                    {properties.map((property) => (
                        <div key={property.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6  transition-transform duration-200 hover:scale-105">
                            {property.imagenes && property.imagenes.length > 0 ? (
                                <div className="relative w-full h-64 overflow-hidden rounded-lg mb-4">
                                    <img
                                        src={property.imagenes[0].imagen}
                                        alt={property.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="w-full h-64 bg-white/10 flex items-center justify-center rounded-lg mb-4">
                                    <span>Sin imagen</span>
                                </div>
                            )}

                            <h2 className="text-xl font-semibold mb-2">{property.title}</h2>

                            {/* PRECIO Y BOTÓN EDITAR A LA MISMA ALTURA */}
                            <div className="flex justify-between items-center mt-4">
                                <p className="text-lg font-bold text-[#F6F6F6]">
                                    ${parseFloat(property.price).toLocaleString('es-ES')}
                                </p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEditClick(property)}
                                        className="bg-[#131415] hover:bg-[#E59136] text-white text-sm py-2 px-4 rounded-md transition-colors"
                                    >
                                        Editar
                                    </button>
                                    {/* <button
                                        onClick={() => handleDelete(property.id)}
                                        className="bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white text-sm py-2 px-4 rounded-md transition-all"
                                    >
                                        Eliminar
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* {isModalOpen && selectedProperty && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                        <div className="bg-[#1c1d1f] border border-white/20 w-full max-w-md rounded-xl p-8 shadow-2xl">
                            <h2 className="text-2xl font-bold mb-6">Editar Propiedad</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm opacity-60 mb-1">Título</label>
                                    <input
                                        type="text"
                                        defaultValue={selectedProperty.title}
                                        className="w-full bg-white/5 border border-white/10 rounded p-2 outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm opacity-60 mb-1">Precio</label>
                                    <input
                                        type="number"
                                        defaultValue={selectedProperty.price}
                                        className="w-full bg-white/5 border border-white/10 rounded p-2 outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-8">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 hover:bg-white/10 rounded transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={() => {
                                        // Aquí llamarías a tu función de Guardar (PUT)
                                        setIsModalOpen(false);
                                    }}
                                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded font-bold transition-colors"
                                >
                                    Guardar Cambios
                                </button>
                            </div>
                        </div>
                    </div>
                )} */}
            </main>
        </div>
    );
}