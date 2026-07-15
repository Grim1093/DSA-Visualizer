'use client'
import { useEffect, useRef } from 'react'

export default function Confetti({ trigger }: { trigger: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    if (!trigger) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    // Monochrome shards
    const parts: { x: number, y: number, vx: number, vy: number, g: number, size: number, color: string, rot: number, vr: number, life: number }[] = []
    
    for (let i = 0; i < 90; i++) {
      const shade = 200 + Math.floor(Math.random() * 55)
      parts.push({
        x: window.innerWidth / 2 + (Math.random() - 0.5) * 60,
        y: window.innerHeight / 2,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() * -16) - 4,
        g: 0.45,
        size: Math.random() * 5 + 2,
        color: `rgb(${shade},${shade},${shade})`,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.25,
        life: 1,
      })
    }
    
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let alive = 0
      for (const p of parts) {
        if (p.life <= 0) continue
        alive++
        p.vy += p.g; 
        p.x += p.vx; 
        p.y += p.vy; 
        p.rot += p.vr; 
        p.life -= 0.010
        ctx.save()
        ctx.translate(p.x, p.y); 
        ctx.rotate(p.rot)
        ctx.globalAlpha = Math.max(0, p.life)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size * 0.4)
        ctx.restore()
      }
      if (alive > 0) {
        raf = requestAnimationFrame(draw)
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }
    
    draw()
    return () => cancelAnimationFrame(raf)
  }, [trigger])
  
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[100]" />
}
