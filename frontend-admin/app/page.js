import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import localFont from "next/font/local";
import imagenFondo from "../assets/images/fondo.jpeg";
import Image from "next/image";

const neikoFont = localFont({
  src: "../assets/fonts/NeikoRegular-XGMP2.woff",
    variable: "--font-neiko",
    display: "swap",
});

const satoshiFont = localFont({
    src: [
        { path: "../assets/fonts/Satoshi-Light.otf", weight: "300", style: "normal" },
        { path: "../assets/fonts/Satoshi-Regular.otf", weight: "400", style: "normal" },
        { path: "../assets/fonts/Satoshi-Medium.otf", weight: "500", style: "normal" },
        { path: "../assets/fonts/Satoshi-Bold.otf", weight: "700", style: "normal" },
    ],
    variable: "--font-satoshi",
    display: "swap",
});

export default function Page() {

  //* LÓGICA PARA 

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="relative w-full h-full rounded-2xl object-cover border border-white/10">
        <Image
          src={imagenFondo}
          alt="Dashboard"
          className="w-full h-full object-cover"
        />
        {/* Overlay opcional para texto */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
          <h2 className="text-3xl font-bold text-white uppercase tracking-tighter">
            Panel de Administración
          </h2>
        </div> */}
      </div>

      {/* Resto de contenido para probar el scroll */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="h-32 bg-white/5 rounded-xl border border-white/10 p-4">
          <p className="text-gray-400 text-xs uppercase">Total Propiedades</p>
          <span className="text-2xl font-bold">24</span>
        </div>
      </div> */}
    </div>
  )
}
