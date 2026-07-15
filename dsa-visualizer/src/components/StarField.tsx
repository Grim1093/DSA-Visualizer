'use client'
import { useEffect, useRef } from 'react'

// Minimal drifting dots - monochrome ambient
export default function StarField() {
  const ref = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    let raf: number, w: number, h: number;
    let dots: { x: number, y: number, r: number, a: number, s: number }[] = [];
    
    const setup = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
      const count = Math.min(60, Math.floor((w * h) / 30000))
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * w, 
        y: Math.random() * h,
        r: Math.random() * 1.1 + 0.3,
        a: Math.random() * 0.35 + 0.05,
        s: Math.random() * 0.15 + 0.02,
      }))
    }
    
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const d of dots) {
        d.y += d.s; 
        if (d.y > h) d.y = 0
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI*2)
        ctx.fillStyle = `rgba(255,255,255,${d.a})`
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }
    
    setup(); 
    draw();
    
    window.addEventListener('resize', setup)
    return () => { 
      cancelAnimationFrame(raf); 
      window.removeEventListener('resize', setup) 
    }
  }, [])
  
  return <canvas ref={ref} className="fixed inset-0 pointer-events-none z-0" />
}
