"use client";

import { useState } from "react";
import Image from "next/image";
import localFont from "next/font/local";
import imagen02 from "../assets/images/heros/02.png";

// FUNTES LOCALES
const neikoFont = localFont({
  src: "../assets/fonts/NeikoRegular-XGMP2.woff",
  variable: "--font-neiko",
  display: "swap",
});

const satoshiFont = localFont({
  src: [
    {
      path: "../assets/fonts/Satoshi-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/Satoshi-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/Satoshi-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/Satoshi-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export default function Home() {
  const currentYear = new Date().getFullYear();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={`${satoshiFont.variable} ${neikoFont.variable}`}>
      <main className="relative min-h-screen w-full overflow-hidden bg-(--backgroundColorBlack) text-(--textWhite)">
        {/* IMAGEN DE FONDO */}
        <div className="absolute inset-0 z-0">
          <Image
            src={imagen02}
            alt="Horizon Grove Residence"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/50 via-transparent to-black/70" />
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <div className="relative z-10 flex flex-col min-h-screen">
          {/* NAVEGACIÓN SUPERIOR */}
          <nav className="px-4 pt-4 sm:px-6 sm:pt-6 md:px-8 lg:px-12 lg:pt-8">
            <div className="flex items-center justify-between gap-4">
              {/* Info superior izquierda */}
              <div className="flex flex-wrap items-center gap-2 text-[9px] sm:text-[10px] md:gap-3 lg:gap-3 xl:gap-6 2xl:gap-8 md:text-[11px] lg:text-[10px] xl:text-[11px] 2xl:text-small uppercase tracking-[0.1em] md:tracking-[0.12em] lg:tracking-[0.1em] xl:tracking-[0.15em] 2xl:tracking-[0.2em] opacity-60 font-light">
                <span className="hidden sm:inline lg:hidden xl:inline">
                  Premium Investment
                </span>
                <span className="sm:hidden xl:hidden">Premium</span>
                <span className="lg:inline xl:hidden 2xl:inline hidden">
                  Premium Inv.
                </span>
                <span className="hidden 2xl:inline">Lomas de Angelópolis</span>
                <span className="hidden sm:inline 2xl:hidden">
                  L. Angelópolis
                </span>
                <span className="hidden xl:inline">/ {currentYear}</span>
              </div>

              {/* Burger Menu Button - Solo visible en móvil/tablet */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden flex flex-col items-center justify-center w-10 h-10 gap-1.5 z-50 flex-shrink-0"
                aria-label="Toggle menu"
              >
                <span
                  className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                ></span>
                <span
                  className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                ></span>
              </button>

              {/* Menú Desktop - Visible solo en desktop */}
              <div className="hidden lg:flex items-center gap-6 xl:gap-8">
                {/* Links de navegación */}
                <a
                  href="#about"
                  className="text-[13px] uppercase tracking-[0.15em] font-medium hover:text-(--mainOrangeColor) transition-colors duration-300 whitespace-nowrap"
                >
                  About
                </a>
                <a
                  href="#features"
                  className="text-[13px] uppercase tracking-[0.15em] font-medium hover:text-(--mainOrangeColor) transition-colors duration-300 whitespace-nowrap"
                >
                  Features
                </a>
                <a
                  href="#offers"
                  className="text-[13px] uppercase tracking-[0.15em] font-medium hover:text-(--mainOrangeColor) transition-colors duration-300 whitespace-nowrap"
                >
                  Offers
                </a>
                <a
                  href="#apartments"
                  className="text-[13px] uppercase tracking-[0.15em] font-medium hover:text-(--mainOrangeColor) transition-colors duration-300 whitespace-nowrap"
                >
                  Apartaments
                </a>

                {/* Botón de consulta */}
                <button className="cursor-pointer group flex items-center gap-2 text-[13px] uppercase tracking-wider border-b border-white/60 pb-1 hover:border-(--mainOrangeColor) transition-all duration-300 whitespace-nowrap">
                  <span className="group-hover:text-(--mainOrangeColor)">
                    Get A Consultation
                  </span>
                  <span className="text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                    ↗
                  </span>
                </button>
              </div>
            </div>

            {/* Menú Mobile/Tablet - Panel deslizante */}
            <div
              className={`lg:hidden fixed inset-0 bg-black/95 backdrop-blur-sm transition-all duration-300 ${
                isMenuOpen
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
              style={{ top: 0 }}
            >
              <div
                className={`flex flex-col items-center justify-center h-full gap-8 transition-transform duration-300 ${
                  isMenuOpen ? "translate-y-0" : "-translate-y-4"
                }`}
              >
                {/* Links de navegación mobile */}
                <a
                  href="#about"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl uppercase tracking-[0.15em] font-medium hover:text-(--mainOrangeColor) transition-colors duration-300"
                >
                  About
                </a>
                <a
                  href="#features"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl uppercase tracking-[0.15em] font-medium hover:text-(--mainOrangeColor) transition-colors duration-300"
                >
                  Features
                </a>
                <a
                  href="#offers"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl uppercase tracking-[0.15em] font-medium hover:text-(--mainOrangeColor) transition-colors duration-300"
                >
                  Offers
                </a>
                <a
                  href="#apartments"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl uppercase tracking-[0.15em] font-medium hover:text-(--mainOrangeColor) transition-colors duration-300"
                >
                  Apartaments
                </a>

                {/* Botón de consulta mobile */}
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-8 cursor-pointer group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl text-sm font-medium uppercase tracking-wider hover:bg-(--mainOrangeColor) hover:text-white transition-all duration-300"
                >
                  <span>Get A Consultation</span>
                  <span className="text-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                    ↗
                  </span>
                </button>
              </div>
            </div>
          </nav>

          {/* TITULO PRINCIPAL */}
          <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 px-4 sm:px-6 md:px-8 lg:px-12">
            <h1 className="font-neiko text-[clamp(48px,15vw,180px)] sm:text-[clamp(60px,13vw,180px)] lg:text-[clamp(80px,12vw,180px)] leading-[0.85] tracking-tight font-bold">
              CASERIO
              <br />
              <span className="pl-[0.3em] sm:pl-[0.4em] lg:pl-[0.5em] uppercase">
                boutiquei
              </span>
            </h1>
          </div>

          {/* CONTENIDO CENTRAL */}
          <div className="flex-1 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 lg:gap-0 px-4 sm:px-6 md:px-8 lg:px-12 pb-16 sm:pb-20 lg:pb-20">
            {/* COLUMNA DE BIENVENIDA */}
            <div className="w-full lg:max-w-md space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-4">
                <h2 className="text-[clamp(24px,6vw,52px)] sm:text-[clamp(28px,5vw,52px)] lg:text-[clamp(32px,4vw,52px)] leading-tight font-light tracking-wide">
                  welcome to
                  <br />
                  caserio boutiquei
                </h2>
                <p className="text-[14px] sm:text-normal leading-relaxed opacity-80 max-w-sm">
                  A boutique residential development designed for those who
                  value privacy, design, and an elevated way of life.
                </p>
              </div>

              <button className="cursor-pointer group flex items-center gap-3 bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-2xl text-[13px] sm:text-small font-medium hover:bg-(--mainOrangeColor) hover:text-white transition-all duration-300">
                <span>Explore Residences</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </button>

              <div className="space-y-2 pt-4 sm:pt-8">
                <p className="text-[16px] sm:text-large font-medium">
                  Prices from $65,570 MXN / m²
                </p>
                <p className="text-[13px] sm:text-small opacity-70">
                  Lomas de Angelópolis · Puebla
                </p>
              </div>
            </div>

            {/* INFO ADICIONAL */}
            <div className="w-full lg:max-w-xs space-y-8 lg:space-y-16">
              <div className="text-left lg:text-right space-y-2">
                <p className="text-[11px] sm:text-small uppercase tracking-[0.15em] sm:tracking-[0.2em] opacity-60">
                  Space that
                  <br />
                  inspires
                </p>
                <p className="text-[13px] sm:text-small leading-relaxed opacity-80 font-light">
                  For those who value elegance and comfort.
                </p>
              </div>
            </div>
          </div>

          {/* FLECHAS DE SCROLL */}
          <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
            <svg
              width="16"
              height="10"
              viewBox="0 0 20 12"
              fill="none"
              className="animate-bounce sm:w-5 sm:h-3"
            >
              <path
                d="M2 2L10 10L18 2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <svg
              width="16"
              height="10"
              viewBox="0 0 20 12"
              fill="none"
              className="animate-bounce sm:w-5 sm:h-3"
              style={{ animationDelay: "0.2s" }}
            >
              <path
                d="M2 2L10 10L18 2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </main>
    </div>
  );
}
