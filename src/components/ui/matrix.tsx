"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import Background from "./background"

class TextScramble {
  el: HTMLElement
  chars: string
  queue: Array<{
    from: string
    to: string
    start: number
    end: number
    char?: string
  }>
  frame: number
  frameRequest: number
  resolve: (value: void | PromiseLike<void>) => void

  constructor(el: HTMLElement) {
    this.el = el
    this.chars = '!<>-_\\/[]{}—=+*^?#'
    this.queue = []
    this.frame = 0
    this.frameRequest = 0
    this.resolve = () => {}
    this.update = this.update.bind(this)
  }

  setText(newText: string) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise<void>((resolve) => this.resolve = resolve)
    this.queue = []

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({ from, to, start, end })
    }

    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }

  update() {
    let output = ''
    let complete = 0

    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.chars[Math.floor(Math.random() * this.chars.length)]
          this.queue[i].char = char
        }
        output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    }

    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
}

interface ScrambledTitleProps {
  onComplete: () => void
}

const ScrambledTitle: React.FC<ScrambledTitleProps> = ({ onComplete }) => {
  const elementRef = useRef<HTMLHeadingElement>(null)
  const scramblerRef = useRef<TextScramble | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (elementRef.current && !scramblerRef.current) {
      scramblerRef.current = new TextScramble(elementRef.current)
      setMounted(true)
    }
  }, [])

  useEffect(() => {
    if (mounted && scramblerRef.current) {
      const phrases = [
        'Hola, bienvenido a mi portafolio',
        'Aquí creamos soluciones digitales',
        'con pasión y código',
        '¿Preparados para trabajar en tus proyectos?'
      ]

      let counter = 0
      const next = () => {
        if (scramblerRef.current) {
          scramblerRef.current.setText(phrases[counter]).then(() => {
            if (counter === phrases.length - 1) {
              onComplete()
            } else {
              counter++
              setTimeout(next, 2000)
            }
          })
        }
      }

      next()
    }
  }, [mounted, onComplete])

  return (
    <h1
      ref={elementRef}
      className="text-white text-4xl md:text-6xl font-bold tracking-wider text-center"
      style={{ fontFamily: 'monospace' }}
    >
      &nbsp;
    </h1>
  )
}

const ModernAnimatedHeroSection: React.FC = () => {
  const [showButton, setShowButton] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleTitleComplete = useCallback(() => {
    setShowButton(true)
  }, [])

  const handleStart = useCallback(() => {
    window.location.href = '/proyectos'
  }, [])

  return (
    <Background className="flex flex-col items-center justify-center">
      {/* Contenedor centrado para título y botón */}
      <div className="z-20 flex flex-col items-center gap-8 max-w-4xl px-4 text-center">
        <ScrambledTitle onComplete={handleTitleComplete} />

        <button
          ref={buttonRef}
          onClick={handleStart}
          className={`button transition-all duration-500 transform ${
            showButton
              ? "opacity-100 translate-y-0 scale-100 cursor-pointer"
              : "opacity-0 translate-y-4 scale-95 pointer-events-none"
          }`}
          data-text="comenzar"
        >
          <span className="actual-text">&nbsp;comenzar&nbsp;</span>
          <span aria-hidden="true" className="hover-text">&nbsp;comenzar&nbsp;</span>
        </button>
      </div>
    </Background>
  )
}

export default ModernAnimatedHeroSection
export { ModernAnimatedHeroSection as Matrix }
