"use client"

import type React from "react"
import LetterRain from "./letter-rain"

interface BackgroundProps {
  children?: React.ReactNode
  className?: string
}

const Background: React.FC<BackgroundProps> = ({ children, className = "" }) => {
  return (
    <div className={`relative w-full h-screen bg-black overflow-hidden ${className}`}>
      {/* Lluvia de letras Canvas de alto rendimiento */}
      <LetterRain 
        fullScreen={false} 
        textColor="#00ff00" 
        glowColor="#ffffff" 
        fontSize={18} 
        speed={1.0}
      />
      
      {/* Contenido que se renderiza sobre el background */}
      {children}
    </div>
  )
}

export default Background