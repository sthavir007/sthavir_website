"use client"

import { useEffect, useRef } from "react"

/**
 * What the specimen frame shows when no photo is up: a tree that draws itself
 * branch by branch, puts an aromatic ring at the end of every twig instead of a
 * leaf, and lets birds lift off the tips and drift away. Regrows each time it
 * comes back.
 */

const BARK = "138, 124, 98" // warm brown, same as the page rules
const LEAF = "58, 122, 78" // the compound green
const BIRD = "179, 32, 44" // the page's single red

type Segment = {
  x1: number
  y1: number
  x2: number
  y2: number
  width: number
  /** seconds after growth starts that this segment begins drawing */
  start: number
  dur: number
}

type Tip = { x: number; y: number; angle: number; at: number; size: number }

type Bird = { x: number; y: number; vx: number; vy: number; born: number; size: number; phase: number }

/** small deterministic PRNG so a given tree is stable while it's on screen */
function rng(seed: number) {
  let a = seed >>> 0
  return () => {
    a += 0x6d2b79f5
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function buildTree(w: number, h: number, seed: number) {
  const rand = rng(seed)
  const segments: Segment[] = []
  const tips: Tip[] = []

  // Grow in arbitrary units first, then scale the finished tree to the frame —
  // that way the canopy always reaches the top whatever the branching came out as.
  const UNIT = 100
  const RING = 7 // tip ring radius, same units

  const grow = (x: number, y: number, angle: number, len: number, depth: number, t: number, width: number) => {
    const x2 = x + Math.cos(angle) * len
    const y2 = y + Math.sin(angle) * len
    segments.push({ x1: x, y1: y, x2, y2, width, start: t, dur: len })
    const done = t + len

    if (depth === 0 || len < UNIT * 0.045) {
      tips.push({ x: x2, y: y2, angle, at: done, size: RING * (0.8 + rand() * 0.5) })
      return
    }

    // a narrow spread keeps the tree taller than it is wide, so height is what fills
    const spread = 0.3 + rand() * 0.22
    const branches = depth > 2 && rand() < 0.3 ? 3 : 2
    for (let i = 0; i < branches; i++) {
      const offset = branches === 2 ? (i === 0 ? -spread : spread) : (i - 1) * spread * 1.2
      const wobble = (rand() - 0.5) * 0.2
      grow(x2, y2, angle + offset + wobble, len * (0.74 + rand() * 0.08), depth - 1, done, Math.max(0.5, width * 0.7))
    }
  }

  grow(0, 0, -Math.PI / 2, UNIT, 7, 0, 9)

  // measure, leaving room for the rings that sit on the tips
  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = 0
  for (const s of segments) {
    minX = Math.min(minX, s.x1, s.x2)
    maxX = Math.max(maxX, s.x1, s.x2)
    minY = Math.min(minY, s.y1, s.y2)
    maxY = Math.max(maxY, s.y1, s.y2)
  }
  for (const t of tips) {
    minX = Math.min(minX, t.x - t.size)
    maxX = Math.max(maxX, t.x + t.size)
    minY = Math.min(minY, t.y - t.size)
    maxY = Math.max(maxY, t.y + t.size)
  }

  const padX = w * 0.03
  const padY = h * 0.025
  const scaleY = (h - padY * 2) / (maxY - minY)
  const scaleX = Math.min(scaleY, (w - padX * 2) / (maxX - minX))
  const offsetX = (w - (maxX - minX) * scaleX) / 2 - minX * scaleX
  const offsetY = h - padY - maxY * scaleY

  // total growth time, normalised to ~3.4s regardless of how long the limbs came out
  const longest = segments.reduce((m, s) => Math.max(m, s.start + s.dur), 1)
  const timeScale = 3.4 / longest

  const ringScale = Math.min(scaleX, scaleY)
  for (const s of segments) {
    s.x1 = s.x1 * scaleX + offsetX
    s.y1 = s.y1 * scaleY + offsetY
    s.x2 = s.x2 * scaleX + offsetX
    s.y2 = s.y2 * scaleY + offsetY
    s.width = Math.max(0.6, s.width * ringScale)
    s.start *= timeScale
    s.dur *= timeScale
  }
  for (const t of tips) {
    t.x = t.x * scaleX + offsetX
    t.y = t.y * scaleY + offsetY
    t.size = Math.max(2.6, Math.min(7, t.size * ringScale))
    t.at *= timeScale
  }

  return { segments, tips }
}

export default function SpecimenTree({ visible }: { visible: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const visibleRef = useRef(visible)

  useEffect(() => {
    visibleRef.current = visible
  }, [visible])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let width = 0
    let height = 0
    let tree = { segments: [] as Segment[], tips: [] as Tip[] }
    let growthStart = performance.now()
    let birds: Bird[] = []
    let nextBird = 0
    let built = false

    const rebuild = () => {
      width = canvas.clientWidth
      height = canvas.clientHeight
      if (width < 2 || height < 2) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      tree = buildTree(width, height, Math.floor(Math.random() * 1e9))
      const now = performance.now()
      // only the first build animates; a later resize just re-fits the grown tree
      growthStart = built ? now - 60000 : now
      built = true
      nextBird = now + 2200
    }

    rebuild()
    const ro = new ResizeObserver(rebuild)
    ro.observe(canvas)

    const ring = (x: number, y: number, r: number, rot: number, alpha: number) => {
      ctx.strokeStyle = `rgba(${LEAF}, ${alpha})`
      ctx.lineWidth = 1
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const a = rot + (i * Math.PI) / 3
        const px = x + Math.cos(a) * r
        const py = y + Math.sin(a) * r
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.closePath()
      ctx.stroke()
      // the inner circle that marks an aromatic ring
      ctx.beginPath()
      ctx.arc(x, y, r * 0.5, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(${LEAF}, ${alpha * 0.6})`
      ctx.stroke()
    }

    const drawBird = (b: Bird, now: number, alpha: number) => {
      const flap = 0.35 + 0.65 * Math.abs(Math.sin((now - b.born) / 150 + b.phase))
      const w = b.size
      const h = b.size * 0.62 * flap
      ctx.strokeStyle = `rgba(${BIRD}, ${alpha})`
      ctx.lineWidth = 1.3
      ctx.lineCap = "round"
      ctx.beginPath()
      ctx.moveTo(b.x - w, b.y)
      ctx.quadraticCurveTo(b.x - w * 0.45, b.y - h, b.x, b.y)
      ctx.quadraticCurveTo(b.x + w * 0.45, b.y - h, b.x + w, b.y)
      ctx.stroke()
    }

    let raf = 0
    let fade = visible ? 1 : 0

    const frame = (now: number) => {
      const wantVisible = visibleRef.current
      fade += ((wantVisible ? 1 : 0) - fade) * 0.08
      ctx.clearRect(0, 0, width, height)

      if (fade > 0.01 && width > 2) {
        const elapsed = reduced ? 999 : (now - growthStart) / 1000

        // branches
        ctx.lineCap = "round"
        for (const s of tree.segments) {
          const p = Math.max(0, Math.min(1, (elapsed - s.start) / s.dur))
          if (p <= 0) continue
          ctx.strokeStyle = `rgba(${BARK}, ${0.72 * fade})`
          ctx.lineWidth = s.width
          ctx.beginPath()
          ctx.moveTo(s.x1, s.y1)
          ctx.lineTo(s.x1 + (s.x2 - s.x1) * p, s.y1 + (s.y2 - s.y1) * p)
          ctx.stroke()
        }

        // aromatic rings where leaves would be
        for (const tip of tree.tips) {
          const p = Math.max(0, Math.min(1, (elapsed - tip.at) / 0.55))
          if (p <= 0) continue
          const sway = reduced ? 0 : Math.sin(now / 1400 + tip.x * 0.05) * 0.12
          ring(tip.x, tip.y, tip.size * p, tip.angle + sway, 0.62 * fade * p)
        }

        // birds lift off a tip once the canopy is in
        if (!reduced && wantVisible && now > nextBird && tree.tips.length && birds.length < 18) {
          const flock = Math.random() < 0.35 ? 2 + Math.floor(Math.random() * 2) : 1
          for (let n = 0; n < flock; n++) {
            const tip = tree.tips[Math.floor(Math.random() * tree.tips.length)]
            if (elapsed < tip.at + 0.4) continue
            const toRight = Math.random() < 0.5 ? 1 : -1
            birds.push({
              x: tip.x,
              y: tip.y,
              vx: toRight * (14 + Math.random() * 18),
              vy: -(10 + Math.random() * 16),
              born: now,
              size: 3.5 + Math.random() * 3,
              phase: Math.random() * Math.PI * 2 + n * 0.9,
            })
          }
          nextBird = now + 550 + Math.random() * 1200
        }

        for (let i = birds.length - 1; i >= 0; i--) {
          const b = birds[i]
          const age = (now - b.born) / 1000
          if (age > 6) {
            birds.splice(i, 1)
            continue
          }
          b.x += (b.vx / 60) * (reduced ? 0 : 1)
          b.y += (b.vy / 60) * (reduced ? 0 : 1)
          b.vy -= 0.012 // drift upward as they get away
          const alpha = Math.min(1, age / 0.4) * Math.max(0, 1 - age / 6) * 0.75 * fade
          drawBird(b, now, alpha)
        }
      }

      raf = requestAnimationFrame(frame)
    }

    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full" />
}
