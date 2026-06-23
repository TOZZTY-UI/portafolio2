"use client"

import React, { useEffect, useRef, useState } from "react"

export interface LetterRainProps {
  /** Caracteres a utilizar en la lluvia */
  charSet?: string
  /** Multiplicador de velocidad de caída (por defecto 1) */
  speed?: number
  /** Color de la estela / letras normales */
  textColor?: string
  /** Color de la cabeza del stream / letra brillante */
  glowColor?: string
  /** Opacidad del desvanecimiento de fondo (determina el largo de la estela, menor es más largo. Ej: 0.05) */
  fadeOpacity?: number
  /** Tamaño de fuente de las letras en píxeles */
  fontSize?: number
  /** Si debe ocupar toda la pantalla (true) o adaptarse a las dimensiones del contenedor padre (false) */
  fullScreen?: boolean
  /** Densidad de columnas (0.1 a 1.0, por defecto 1.0) */
  density?: number
  /** Clases CSS adicionales para el contenedor */
  className?: string
}

const DEFAULT_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"

export const LetterRain: React.FC<LetterRainProps> = ({
  charSet = DEFAULT_CHARS,
  speed = 1,
  textColor = "#00ff00",
  glowColor = "#ffffff",
  fadeOpacity = 0.05,
  fontSize = 16,
  fullScreen = false,
  density = 1.0,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Efecto para controlar el tamaño del canvas de forma reactiva y robusta
  useEffect(() => {
    const updateSize = () => {
      if (fullScreen) {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      } else {
        const container = containerRef.current || canvasRef.current?.parentElement
        if (container) {
          setDimensions({
            width: container.clientWidth,
            height: container.clientHeight,
          })
        }
      }
    }

    updateSize()

    if (fullScreen) {
      window.addEventListener("resize", updateSize)
      return () => window.removeEventListener("resize", updateSize)
    } else {
      const container = containerRef.current || canvasRef.current?.parentElement
      if (container) {
        const resizeObserver = new ResizeObserver(() => {
          updateSize()
        })
        resizeObserver.observe(container)
        return () => resizeObserver.disconnect()
      }
    }
  }, [fullScreen])

  // Efecto para la animación del canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || dimensions.width === 0 || dimensions.height === 0) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Calcular columnas basándose en el ancho actual y tamaño de fuente
    let columns = Math.floor(dimensions.width / fontSize)
    if (columns <= 0) columns = 1

    // Inicializar posiciones Y de las gotas
    const drops: number[] = []
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100
    }

    const charsArray = charSet.split("")
    let animationFrameId: number

    const draw = () => {
      // Efecto de estela: dibujar fondo semi-transparente negro
      ctx.fillStyle = `rgba(0, 0, 0, ${fadeOpacity})`
      ctx.fillRect(0, 0, dimensions.width, dimensions.height)

      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < columns; i++) {
        // Ignorar columnas según densidad al iniciar caída
        if (Math.random() > density && drops[i] < 0) {
          continue
        }

        const char = charsArray[Math.floor(Math.random() * charsArray.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        // Dibujar el primer caracter más brillante (glow)
        const isHead = Math.random() > 0.95
        if (isHead) {
          ctx.fillStyle = glowColor
          ctx.shadowBlur = 8
          ctx.shadowColor = textColor
        } else {
          ctx.fillStyle = textColor
          ctx.shadowBlur = 0
        }

        ctx.fillText(char, x, y)

        // Incrementar posición Y de la gota
        drops[i] += speed * (0.5 + Math.random() * 0.5)

        // Resetear gota al salir de la pantalla
        if (y > dimensions.height && Math.random() > 0.975) {
          drops[i] = 0
        }
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [dimensions, charSet, speed, textColor, glowColor, fadeOpacity, fontSize, density])

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${
        fullScreen ? "fixed inset-0 w-screen h-screen z-0" : "absolute inset-0 w-full h-full z-0"
      } ${className}`}
      style={{ backgroundColor: "#000000" }}
    >
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="block"
      />
    </div>
  )
}

export default LetterRain
