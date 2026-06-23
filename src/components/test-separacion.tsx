"use client"

import React from "react"
import LetterRain from "./ui/letter-rain"

export default function TestSeparacion() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8 font-sans">
      <header className="max-w-6xl mx-auto mb-12">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Lluvia de Letras Reutilizable
        </h1>
        <p className="mt-2 text-neutral-400">
          Demostración de adaptabilidad y configuración del nuevo componente en distintos contenedores.
        </p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Tarjeta 1: Matrix Clásico */}
        <div className="relative rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 overflow-hidden h-[350px] flex flex-col justify-between group">
          <div className="absolute inset-0 z-0">
            <LetterRain 
              textColor="#00ff00" 
              glowColor="#ffffff" 
              fontSize={15} 
              speed={0.8} 
              density={0.8}
            />
          </div>
          <div className="relative z-10 pointer-events-none">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-mono font-semibold px-2.5 py-1 bg-emerald-950/80 rounded-full border border-emerald-800">
              Matrix Clásico
            </span>
          </div>
          <div className="relative z-10 bg-black/60 p-4 rounded-xl border border-neutral-800/80 backdrop-blur-sm pointer-events-none mt-auto">
            <h3 className="text-lg font-bold text-white font-mono">Verde Estándar</h3>
            <p className="text-sm text-neutral-300 mt-1">Velocidad media, fuente estándar de 15px y alta densidad.</p>
          </div>
        </div>

        {/* Tarjeta 2: Lluvia Azul / Cripto */}
        <div className="relative rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 overflow-hidden h-[350px] flex flex-col justify-between group">
          <div className="absolute inset-0 z-0">
            <LetterRain 
              textColor="#0ea5e9" 
              glowColor="#e0f2fe" 
              fontSize={14} 
              speed={1.5} 
              density={0.5}
              charSet="01"
            />
          </div>
          <div className="relative z-10 pointer-events-none">
            <span className="text-xs uppercase tracking-widest text-sky-400 font-mono font-semibold px-2.5 py-1 bg-sky-950/80 rounded-full border border-sky-800">
              Código Binario
            </span>
          </div>
          <div className="relative z-10 bg-black/60 p-4 rounded-xl border border-neutral-800/80 backdrop-blur-sm pointer-events-none mt-auto">
            <h3 className="text-lg font-bold text-white font-mono">Cyber Blue</h3>
            <p className="text-sm text-neutral-300 mt-1">Lluvia de binarios (0 y 1), color azul cian, mayor velocidad y menor densidad.</p>
          </div>
        </div>

        {/* Tarjeta 3: Lluvia Japonesa / Katakana */}
        <div className="relative rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 overflow-hidden h-[350px] flex flex-col justify-between group">
          <div className="absolute inset-0 z-0">
            <LetterRain 
              textColor="#ec4899" 
              glowColor="#fdf2f8" 
              fontSize={18} 
              speed={0.6} 
              density={0.7}
              charSet="ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ"
            />
          </div>
          <div className="relative z-10 pointer-events-none">
            <span className="text-xs uppercase tracking-widest text-pink-400 font-mono font-semibold px-2.5 py-1 bg-pink-950/80 rounded-full border border-pink-800">
              Katakana
            </span>
          </div>
          <div className="relative z-10 bg-black/60 p-4 rounded-xl border border-neutral-800/80 backdrop-blur-sm pointer-events-none mt-auto">
            <h3 className="text-lg font-bold text-white font-mono">Neon Sakura</h3>
            <p className="text-sm text-neutral-300 mt-1">Caracteres Katakana, tono rosa neón, velocidad pausada y fuente de 18px.</p>
          </div>
        </div>

        {/* Tarjeta 4: Contenedor Pequeño interactivo */}
        <div className="relative rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 overflow-hidden h-[350px] flex flex-col justify-between group">
          <div className="absolute inset-0 z-0">
            <LetterRain 
              textColor="#eab308" 
              glowColor="#fef9c3" 
              fontSize={12} 
              speed={1.2} 
              density={0.4}
              charSet="▲▼◀▶◆◇●○"
            />
          </div>
          <div className="relative z-10 pointer-events-none">
            <span className="text-xs uppercase tracking-widest text-yellow-400 font-mono font-semibold px-2.5 py-1 bg-yellow-950/80 rounded-full border border-yellow-800">
              Símbolos
            </span>
          </div>
          <div className="relative z-10 bg-black/60 p-4 rounded-xl border border-neutral-800/80 backdrop-blur-sm pointer-events-none mt-auto">
            <h3 className="text-lg font-bold text-white font-mono">Golden Shapes</h3>
            <p className="text-sm text-neutral-300 mt-1">Formas geométricas, color oro, tamaño pequeño y baja densidad.</p>
          </div>
        </div>
      </main>

      <footer className="max-w-6xl mx-auto mt-12 text-center text-neutral-600 text-xs">
        <a href="/" className="text-emerald-500 hover:text-emerald-400 transition-colors font-semibold">
          &larr; Volver al Inicio
        </a>
      </footer>
    </div>
  )
}
