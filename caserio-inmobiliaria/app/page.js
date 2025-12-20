import Image from "next/image";
import { Noto_Serif } from "next/font/google";
import localFont from "next/font/local";
import fondoCasa from '../assets/images/casa-fondo.jpeg';

const notoSerifFont = Noto_Serif({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500']
})

const neikoFont = localFont({
  src: [
    {
      path: '../assets/fonts/NeikoRegular-XGMP2.woff'
    }
  ],
  variable: '--font-neiko'
})

export default function Home() {
  return (
    <>
      
      <main className="relative min-h-screen w-full overflow-hidden bg-black text-white">
        {/* IMAGEN DE FONDO */}
        <div className="absolute inset-0 z-0">
          <Image
            src={fondoCasa}
            alt="Fondo imagen"
            fill
            className="object-cover opacity-80"
            priority
          />
            <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/60" />
        </div>

        {/* Navegación */}
        <nav className="relative z-10 flex items-center justify-between px-10 py-6 text-xs uppercase tracking-widest">
          <div className="flex gap-8 opacity-70">
            <a href="#" className="hover:opacity-100 transition">
              About
            </a>
            <a href="#" className="hover:opacity-100 transition">
              Features
            </a>
            <a href="#" className="hover:opacity-100 transition">
              Offers
            </a>
            <a href="#" className="hover:opacity-100 transition">
              Apartaments
            </a>
          </div>
          <div className="flex items-center gap-4">
            <button className="border-b border-white pb-1 hover:opacity-70 transition">Get A Consultation ↗</button>
            <span className="text-xl">♡</span>
          </div>
        </nav>

      </main>
    </>
     
  );
}
