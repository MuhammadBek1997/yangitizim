import { useEffect, useRef } from 'react'

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}[]|/\\'

export default function MatrixBg() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let animId
    const FONT_SIZE = 13
    let columns, drops, frame = 0
    let hideTimer = null

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      columns = Math.floor(canvas.width / FONT_SIZE)
      drops   = Array.from({ length: columns }, () => Math.random() * -50)
    }

    resize()
    window.addEventListener('resize', resize)

    // Scroll boshlananda ko'rsatiladi, to'xtagandan 900ms keyin yo'qoladi
    const onScroll = () => {
      canvas.style.opacity = '0.22'
      clearTimeout(hideTimer)
      hideTimer = setTimeout(() => {
        canvas.style.opacity = '0'
      }, 900)
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    const draw = () => {
      frame++
      if (frame % 2 === 0) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.06)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.font = `${FONT_SIZE}px monospace`

        for (let i = 0; i < drops.length; i++) {
          const y = drops[i] * FONT_SIZE

          ctx.fillStyle = 'rgba(170, 255, 0, 0.9)'
          ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], i * FONT_SIZE, y)

          ctx.fillStyle = 'rgba(120, 200, 0, 0.25)'
          ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], i * FONT_SIZE, y - FONT_SIZE)

          if (y > canvas.height && Math.random() > 0.97) drops[i] = 0
          drops[i] += 0.6
        }
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      clearTimeout(hideTimer)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0,
        transition: 'opacity 0.4s ease',
      }}
    />
  )
}