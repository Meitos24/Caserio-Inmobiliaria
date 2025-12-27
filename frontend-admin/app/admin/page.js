"use client"

import Image from "next/image"
import Link from "next/link"
import localFont from "next/font/local";
import imagenFondo2 from "../../assets/images/fondo2.jpeg"
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";

const neikoFont = localFont({
    // src: "../assets/fonts/NeikoRegular-XGMP2.woff",
    src: "../../assets/fonts/NeikoRegular-XGMP2.woff",
    variable: "--font-neiko",
    display: "swap",
});

const satoshiFont = localFont({
    src: [
        { path: "../../assets/fonts/Satoshi-Light.otf", weight: "300", style: "normal" },
        { path: "../../assets/fonts/Satoshi-Regular.otf", weight: "400", style: "normal" },
        { path: "../../assets/fonts/Satoshi-Medium.otf", weight: "500", style: "normal" },
        { path: "../../assets/fonts/Satoshi-Bold.otf", weight: "700", style: "normal" },
    ],
    variable: "--font-satoshi",
    display: "swap",
});

export default function AdminDashboard() {
    const stats = [
        { label: "Total de propiedades", value: "24", change: "+3 este mes" },
        { label: "Valor total", value: "$45.2M", change: "+12% este trimestre" },
        { label: "Solicitudes", value: "156", change: "42 esta semana" },
    ]

    return (
        <div className={`${satoshiFont.variable} ${neikoFont.variable} font-sans`}>
            <main className="relative min-h-screen w-full overflow-x-hidden bg-[#131415] text-white">

                {/* Fondo con imagen y overlay */}
                {/* <div className="absolute inset-0 z-0">
                    <Image
                        src={imagenFondo2}
                        alt="Background"
                        fill
                        className="object-cover opacity-20"
                        priority
                    />
                </div> */}

                {/* Header Responsivo */}
                <nav className="relative z-10 flex items-center justify-between px-6 md:px-10 py-6 border-b border-white/10">
                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                        {/* <h1 className="text-lg md:text-2xl font-light tracking-tight">CASERIO BOUTIQUE</h1> */}
                        <span className="text-xs md:text-2xl uppercase tracking-widest">
                             Admin Dashboard
                        </span>
                    </div>
                    {/* <div className="flex items-center">
                        <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/20 transition">
                            <span className="text-xs font-medium">JD</span>
                        </button>
                    </div> */}
                </nav>

                {/* Contenido Principal */}
                <div className="relative z-10 px-6 md:px-10 py-10 md:py-16">

                    {/* Bienvenida Responsiva */}
                    <div className="mb-12 md:mb-16">
                        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-light mb-4 tracking-tight leading-tight max-w-4xl">
                            Generando Ganancias y Abundancia
                        </h2>
                        <p className="text-base md:text-lg opacity-70 font-light tracking-wide">
                            Administra tus propiedades y crece tu portafolio
                        </p>
                    </div>

                    {/* Estadísticas - Grid Adaptable */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 hover:bg-[#E59136]"
                            >
                                <p className="text-[10px] uppercase tracking-widest opacity-60 mb-3">{stat.label}</p>
                                <p className="text-3xl md:text-4xl font-light mb-2">{stat.value}</p>
                                <p className="text-xs opacity-50">{stat.change}</p>
                            </div>
                        ))}
                    </div>

                    {/* Acciones Principales - Grid 1 col en móvil, 2 en desktop */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl">
                        {/* Card para Nueva Propiedad */}
                        <Link href="/admin/properties/new">
                            <div className="group relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-8 md:p-10 hover:bg-[#E59136] transition-all duration-500 cursor-pointer min-h-[280px] md:h-80 flex flex-col justify-between">
                                <div className="absolute top-4 right-4 md:top-6 md:right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <svg className="w-24 h-24 md:w-32 md:h-32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M12 4v16m8-8H4" />
                                    </svg>
                                </div>

                                <div>
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-light mb-3 tracking-tight">Añadir</h3>
                                    <p className="text-sm opacity-70 leading-relaxed max-w-[240px]">
                                        Añadir una nueva propiedad con fotos, detalles y precio.
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 text-sm font-medium mt-4 group-hover:gap-4 transition-all">
                                    <span>Empezar</span>
                                    <span className="text-lg">→</span>
                                </div>
                            </div>
                        </Link>

                        {/* Card para Administrar */}
                        {/* <Link href="/">

                        <div className="group relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-8 md:p-10 hover:bg-[#E59136] transition-all duration-500 cursor-pointer min-h-[280px] md:h-80 flex flex-col justify-between">
                            
                            <div className="absolute top-4 right-4 md:top-6 md:right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                <svg className="w-24 h-24 md:w-32 md:h-32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M4 5h16M4 12h16M4 19h16" />
                                </svg>
                            </div>

                            <div>
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-light mb-3 tracking-tight">Administrar</h3>
                                <p className="text-sm opacity-70 leading-relaxed max-w-[240px]">
                                    Ver, editar y gestionar tu inventario actual de propiedades.
                                </p>
                            </div>

                            <div className="flex items-center gap-2 text-sm font-medium mt-4 group-hover:gap-4 transition-all">
                                <span>Ver Todas</span>
                                <span className="text-lg">→</span>
                            </div>
                            </div>
                        </Link> */}
                    </div>

                    {/* Acciones Rápidas - Flexbox inteligente */}
                    <div className="mt-16 md:mt-24">
                        <h3 className="text-[10px] uppercase tracking-widest opacity-40 mb-6">Acciones Rápidas</h3>
                        <div className="flex flex-wrap gap-3">
                            {["Ver analíticas", "Revisar solicitudes", "Exportar Info", "Configuración"].map((btn) => (
                                <button
                                    key={btn}
                                    className="bg-white/5 border border-white/10 px-5 py-2.5 rounded-full text-xs md:text-sm hover:bg-[#E59136]  transition-all active:scale-95"
                                >
                                    {btn}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>

    )
}