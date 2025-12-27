'use client';

import { BedDouble, Bath, Ruler, CalendarDays, Check, PencilLine, Trash2, Camera, Ban } from 'lucide-react';
import localFont from "next/font/local";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';


const neikoFont = localFont({
    src: "../../../../../assets/fonts/NeikoRegular-XGMP2.woff",
    variable: "--font-neiko",
    display: "swap",
});

const satoshiFont = localFont({
    src: [
        { path: "../../../../../assets/fonts/Satoshi-Light.otf", weight: "300", style: "normal" },
        { path: "../../../../../assets/fonts/Satoshi-Regular.otf", weight: "400", style: "normal" },
        { path: "../../../../..//assets/fonts/Satoshi-Medium.otf", weight: "500", style: "normal" },
        { path: "../../../../..//assets/fonts/Satoshi-Bold.otf", weight: "700", style: "normal" },
    ],
    variable: "--font-satoshi",
    display: "swap",
});


export default function EditPropertiesPage() {

    const params = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/propiedades/${params.id}`)
                setProperty(response.data);
            } catch (error) {
                console.log("Error al cargar la propiedad: ", error);
            } finally {
                setLoading(false);
            }
        };

        if (params.id) fetchProperty();

    }, [params.id]);

    if (loading) return <div className="bg-[#131415] min-h-screen flex items-center justify-center text-white">Cargando datos de la propiedad...</div>;
    if (!property) return <div className="text-white">Propiedad no encontrada</div>;

    const getImgUrl = (imgObj) => {
        if (!imgObj) return "https://via.placeholder.com/800x600?text=No+Image";
        const url = imgObj.imagen;
        return url.startsWith('http') ? url : `http://localhost:8000${url}`;
    }

    return (
        <div className={`${satoshiFont.variable} ${neikoFont.variable} bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white antialiased overflow-hidden`} >
            <div className="flex h-screen w-full flex-row overflow-hidden">
                {/* <!-- Main Content --> */}
                <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-background-light dark:bg-background-dark">
                    {/* <!-- Scrollable Area --> */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-8">
                        <div className="max-w-7xl mx-auto flex flex-col gap-6">
                            {/* <!-- Header Section --> */}
                            <div
                                className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center border-b border-[#6b7280] pb-6">
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-xs md:text-2xl uppercase tracking-widest text-[#F6F6F6]">{property.title}
                                    </h1>
                                    <div className="flex items-center gap-4">
                                        <p className="text-[#93c8a9] text-sm font-mono">ID: #HV-2023-89</p>
                                        {property.available ? (
                                            <div
                                                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#244733]/50 border border-[#244733]">
                                                <Check className='text-[#F6F6F6]' />
                                                <span className="text-[#F6F6F6] text-xs font-bold uppercase tracking-wide">Disponible</span>
                                            </div>

                                        ) : (
                                                <div
                                                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/20">
                                                <Ban className='text-[#F6F6F6]' />
                                                <span className="text-[#F6F6F6] text-xs font-bold uppercase tracking-wide">No disponible</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {/* <!-- Action Buttons --> */}
                                <div className="flex flex-wrap gap-3">
                                    <button
                                        className="flex items-center gap-2 px-4 h-10 rounded-lg bg-[#244733] text-white hover:bg-[#2f5c42] transition-colors text-sm font-bold">
                                        <PencilLine size={16} className='text-[20px]' />
                                        <span>Actualizar</span>
                                    </button>
                                    <button
                                        className="flex items-center gap-2 px-4 h-10 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors text-sm font-bold">
                                        <Trash2 size={16} />
                                        <span>Eliminar</span>
                                    </button>
                                </div>
                            </div>
                            {/* <!-- Main Grid --> */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                                {/* <!-- Left Column: Visuals & Description --> */}
                                <div className="lg:col-span-2 flex flex-col gap-8">
                                    {/* <!-- Image Gallery --> */}
                                    <div className="flex flex-col gap-4">
                                        <div className="w-full aspect-video rounded-xl bg-gray-800 overflow-hidden relative group">
                                            <img
                                                alt="Principal"
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                data-alt="Modern luxury villa exterior with pool at dusk"
                                                src={property.imagenes?.length > 0 ? getImgUrl(property.imagenes[0]) : "https://via.placeholder.com/800x600"} />
                                            <div
                                                className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2">
                                                {/* <span className="material-symbols-outlined text-sm">photo_camera</span> */}
                                                <Camera />
                                                Mostrar todas las fotos
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-4 gap-4">
                                            {property.imagenes?.slice(1).map((img, index) => (
                                                <div
                                                    key={index}
                                                    className="aspect-4/3 rounded-lg bg-gray-800 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                                                >
                                                    <img
                                                        alt='Prueba'
                                                        className='w-full h-full object-cover'
                                                        src={getImgUrl(img)}
                                                    />
                                                </div>
                                            ))}
                                            {/* <div
                                                className="aspect-4/3 rounded-lg bg-gray-800 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                                                <img alt="Spacious modern living room with view"
                                                    className="w-full h-full object-cover"
                                                    data-alt="Spacious modern living room with view"
                                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCs3IDfDwm92ZHWKFVfS9Vbvk-XIzW1cc8-E1PkUfX9A-pvTh3_YS5Mj2v3wBcYNx79k-pu3KJ6Ma8fRJlvv_Qlj30cWHFbxOKUazopZbLxTxQZQdTxxvOyuAkFCy2VWJy2szdhdeS3b195nDaxI_hzSxxJjMe1kfTXqBVYJ_IFyp7jCVt5FX5vEat-RbfbWxrtcF8u2TLZScqo9awl9a5FeMdpGLQJmC9URBtoDA26968-VyyHW9aA8W5Evh1edAgXqN4-xfAXqcM" />
                                            </div>
                                            <div
                                                className="aspect-4/3 rounded-lg bg-gray-800 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                                                <img alt="Modern kitchen with island" className="w-full h-full object-cover"
                                                    data-alt="Modern kitchen with island"
                                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBET1-8W39aYj7ylTALDMnBZ1i9SxzsKZQHy6qEgZSmTi6OvTZX-gr3r5qwf8nDJGrCglrHeaA5SXK4mBFTVfizgKGPhOJTh3d-6pbcyrpgp_rikyRKA1NxZQxsjXRrd9K6-qP1Dq824eSNVLyKs5329hp_ABZ8ek_K5LcCnMQLbznUglPthCnq-cp-ylbzaFj497uyZpx7aZ_lC3Bn_63CQ_jxf8HCWq0tFsa5a8Ka5sOU0jrU31RSUwiweEgbQVT8t3tavjnrAgs" />
                                            </div>
                                            <div
                                                className="aspect-4/3 rounded-lg bg-gray-800 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                                                <img alt="Master bathroom with tub" className="w-full h-full object-cover"
                                                    data-alt="Master bathroom with tub"
                                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBs5TbA8rtfeZUQL9Fb-HXvxVh378kesFF82oNGtTRQW7cgkfwh1F0gTqmU_wj76MUDT7i2pmvPhE2fsGPlruuhU5EcqPusqrhBIIDJzt1tAVlawEpcC8Jw_cAq68grU_-tcYhM62W9fkK25qPo-n0w4kLoT87Ed6V5v3fyk4myY9VqcmJvs0SVFKLeiGua7fsyVUrpUBHsjzgkioxU5d8ud8S7nsQ_yMd22Kk2-zizez9DUP47p3YxL8KA_rz36Qdkg6qh7QZbXZ4" />
                                            </div>
                                            <div
                                                className="aspect-4/3 rounded-lg bg-gray-800 overflow-hidden relative cursor-pointer hover:opacity-80 transition-opacity">
                                                <img alt="Bedroom interior" className="w-full h-full object-cover opacity-50"
                                                    data-alt="Bedroom interior"
                                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPyFsKRnQrw9zYRgG8jrxS2BC16crBXu2V6yaoMIAzkbC7qqBKoZWzX9xJKD-CeEJP8xsksZpe0d-cMCQAqWQvfgEiYuDdwDZchvvcY-XJP5RGbQC0fD1ovp1w9mrXbZx6nJxzNMLkC5PaUINziBQaPhJ0FT0cUOKbYU5jxn_mh6up40t59UzMIEbx9_ZsyhMUJKm_ppdX2IEfCe3KjHjLldS7z1nyieGUtm1uz7V0vseRS-j_DqMtFCMV96fJQF5jrSKc7xv_Sl8" />
                                                <div
                                                    className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
                                                    +21</div>
                                            </div> */}
                                        </div>
                                    </div>
                                    {/* <!-- Description --> */}
                                    {/* <div className="flex flex-col gap-4">
                                        <h2 className="text-white text-xl font-bold">Acerca de esta propiedad</h2>
                                        <p className="text-[#F6F6F6] leading-relaxed">
                                            Nestled in the heart of the prestigious Highland Valley, this architectural
                                            masterpiece offers unparalleled views and modern luxury. The open-concept living
                                            area features floor-to-ceiling windows that flood the space with natural light,
                                            seamlessly blending indoor and outdoor living. The gourmet kitchen is equipped with
                                            state-of-the-art appliances and a massive quartz island, perfect for entertaining.
                                            Retreat to the master suite, a private sanctuary with a spa-like ensuite and direct
                                            access to the terrace.
                                        </p>
                                        <p className="text-[#F6F6F6] leading-relaxed">
                                            Outside, the meticulously landscaped grounds feature an infinity pool, outdoor
                                            kitchen, and fire pit lounge area. Located just minutes from top-rated schools,
                                            shopping, and dining, The Highland Villa represents the pinnacle of sophisticated
                                            living.
                                        </p>
                                    </div> */}
                                    {/* <!-- Amenities --> */}
                                    <div className="flex flex-col gap-4">
                                        <h2 className="text-white text-xl font-bold">Amenidades &amp; Características</h2>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
                                            {property.amenities && property.amenities.length > 0 ? (
                                                property.amenities.map((amenity, index) => (
                                                    <div key={index} className="flex items-center gap-3 text-sm text-gray-300">
                                                        {typeof amenity === 'object' ? amenity.nombre : amenity}
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-gray-500 text-sm italic">No hay amenidades especificadas</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- Right Column: Details & Management --> */}
                                <div className="flex flex-col gap-6">
                                    {/* <!-- Price Card --> */}
                                    <div className="bg-white/5 rounded-xl p-6 border border-[#34373A] shadow-lg">
                                        <p className="text-[#F6F6F6] text-sm font-medium mb-1">Precio de Lista</p>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-3xl font-black text-white">${parseFloat(property.price).toLocaleString()}</span>
                                        </div>
                                        <div className="mt-6 flex flex-col gap-3">
                                            <div className="flex justify-between items-center py-2 border-b border-[#6b7280]">
                                                <span className="text-[12px] uppercase tracking-widest opacity-60 mb-3 text-[#F6F6F6]">Construcción</span>
                                                <span className="text-[12px] font-medium mb-3 text-white">{property.construction}m</span>
                                            </div>
                                            <div className="flex justify-between items-center py-2 border-b border-[#6b7280]">
                                                <span className="text-[12px] uppercase tracking-widest opacity-60 mb-3 text-[#F6F6F6]">Terreno</span>
                                                <span className="text-[12px] font-medium mb-3 text-white">{property.terrain}m²</span>
                                            </div>
                                            <div className="flex justify-between items-center py-2">
                                                <span className="text-[12px] uppercase tracking-widest opacity-60 mb-3 text-[#F6F6F6]">Estacionamiento</span>
                                                <span className="text-[12px] font-medium mb-3 text-white">{property.parking}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- Quick Specs --> */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white/5 p-4 rounded-xl border border-[#6b7280] flex flex-col gap-2">
                                            <BedDouble className="text-[#F6F6F6]" />
                                            <div>
                                                <p className="text-xl font-bold text-white">{property.bedrooms}</p>
                                                <p className="text-[12px] uppercase tracking-widest opacity-60 text-[#F6F6F6]">Recámaras</p>
                                            </div>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-xl border border-[#6b7280] flex flex-col gap-2">
                                            <Bath className="text-[#F6F6F6]" />
                                            <div>
                                                <p className="text-xl font-bold text-white">{property.bathrooms}</p>
                                                <p className="text-[12px] uppercase tracking-widest opacity-60 text-[#F6F6F6]">Baños</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- Location Map --> */}
                                    <div
                                        className="bg-[#1c3326] rounded-xl overflow-hidden border border-[#244733] aspect-4/3 relative group cursor-pointer">
                                        <img alt="Map view of Highland Park area"
                                            className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
                                            data-alt="Map view of Highland Park area" data-location="Highland Park, Los Angeles"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgtz4PyX4OcRMa8-I-EBZAz16ZDUzEokiF2ApYbWNDMTXJHQDipIbyTym6mryzl90dss7Rl_Qqn1oLCPkZbDpCqu82Pz6K7ig5YZlBBDedYhJlvphnxFmOF-2xV9BfrK9_9snsZgWDxFmqyfO-DHg4ssZqAsS1zEl-N7uCjG2LXuiApHEPsa1bmrcErb7bTlPWfaubliCW_di2lWeSOd542bf9LoI8kcWjkEIf2-Z1U1aKAozDfYyTpJMHln6cGTJRqmCt0v198iE" />
                                        <div
                                            className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                                            <span
                                                className="material-symbols-outlined text-white text-4xl mb-2 drop-shadow-lg">location_on</span>
                                            <p className="text-white font-bold text-lg drop-shadow-md">1284 Highland Avenue</p>
                                            <p className="text-gray-200 text-sm drop-shadow-md">Los Angeles, CA 90042</p>
                                        </div>
                                    </div>
                                    {/* <!-- Assigned Agent --> */}
                                    {/* <div className="bg-white/5 rounded-xl p-4 border border-[#6b7280] flex items-center gap-4">
                                        <div className="size-12 rounded-full bg-gray-600 overflow-hidden shrink-0">
                                            <img alt="Portrait of Sarah Jenkins, Real Estate Agent"
                                                className="w-full h-full object-cover"
                                                data-alt="Portrait of Sarah Jenkins, Real Estate Agent"
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBefQgC-AGvVeZazM2QdXLWSbkBCjtZmFohjwhZPp5YriAFWbItPzfxMFfroqSu0KWjl7-abQ8vMobFxusBZnAiU2WCiB_VbSFS5ETZ4LR4xpi2yMrc_vZblbSl5imavM0JejFC_UYHG4Ky75dNRyS1xdko1R6uAOOxqgSEXSvuVdpX7cBFzEvfrDyZKN6jB1SrYTNIkgvD_nsGZnd4kASrPvKn_O-mHiqeiJIYfNxFNEoC2tdObbRwBxzr0IowIUH58RbSuR6KjiQ" />
                                        </div>
                                        <div className="flex flex-col flex-1">
                                            <p className="text-white font-bold text-sm">Sarah Jenkins</p>
                                            <p className="text-[#93c8a9] text-xs">Listing Agent</p>
                                        </div>
                                        <button
                                            className="size-8 flex items-center justify-center rounded-full bg-[#244733] text-primary hover:bg-primary hover:text-white transition-colors">
                                            <span className="material-symbols-outlined text-sm">mail</span>
                                        </button>
                                        <button
                                            className="size-8 flex items-center justify-center rounded-full bg-[#244733] text-primary hover:bg-primary hover:text-white transition-colors">
                                            <span className="material-symbols-outlined text-sm">call</span>
                                        </button>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        {/* <!-- Footer Spacer --> */}
                        <div className="h-20"></div>
                    </div>
                </main>
            </div>
        </div>
    )
}

