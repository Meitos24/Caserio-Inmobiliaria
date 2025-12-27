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
    <p></p>
  )
}
