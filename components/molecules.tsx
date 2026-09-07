"use client"

import { useEffect, useRef } from "react"

/**
 * Ambient background: molecules drift across the page while assembling.
 * Each one lays down its core skeleton first, then grows its branches one at a
 * time, holds, dissolves, and is replaced somewhere else by a different compound.
 * Low contrast on purpose — texture, not a focal point.
 */

type Compound = {
  name: string
  /** how many leading nodes form the core skeleton; the rest grow on as branches */
  core: number
  nodes: [number, number][]
  edges: [number, number][]
  doubles?: [number, number][]
}

const ring = (n: number, r = 1, phase = 0): [number, number][] =>
  Array.from({ length: n }, (_, i) => {
    const a = phase + (i * Math.PI * 2) / n
    return [Math.cos(a) * r, Math.sin(a) * r] as [number, number]
  })

const cycle = (n: number): [number, number][] =>
  Array.from({ length: n }, (_, i) => [i, (i + 1) % n] as [number, number])

const HEX = ring(6)
const PENT = ring(5)

/** a substituent position, straight out from ring vertex i */
const sub = (i: number, d = 2): [number, number] => [HEX[i][0] * d, HEX[i][1] * d]

/** a zig-zag carbon chain, centred on the origin */
const chain = (n: number): [number, number][] =>
  Array.from({ length: n }, (_, i) => [i * 0.9 - ((n - 1) * 0.9) / 2, i % 2 ? -0.25 : 0.25] as [number, number])

const AROMATIC: [number, number][] = [
  [0, 1],
  [2, 3],
  [4, 5],
]

const NAPH: [number, number][] = [
  [1, 0],
  [0.5, 0.866],
  [-0.5, 0.866],
  [-1, 0],
  [-0.5, -0.866],
  [0.5, -0.866],
  [1.5, 0.866],
  [2, 0],
  [1.5, -0.866],
]
const NAPH_EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 0],
  [1, 6],
  [6, 7],
  [7, 8],
  [8, 5],
]

const COMPOUNDS: Compound[] = [
  // --- aromatics, growing substituents off the ring ---
  { name: "benzene", core: 6, nodes: HEX, edges: cycle(6), doubles: AROMATIC },
  {
    name: "toluene",
    core: 6,
    nodes: [...HEX, sub(0)],
    edges: [...cycle(6), [0, 6]],
    doubles: AROMATIC,
  },
  {
    name: "phenol",
    core: 6,
    nodes: [...HEX, sub(1)],
    edges: [...cycle(6), [1, 6]],
    doubles: AROMATIC,
  },
  {
    name: "aniline",
    core: 6,
    nodes: [...HEX, sub(3)],
    edges: [...cycle(6), [3, 6]],
    doubles: AROMATIC,
  },
  {
    name: "p-xylene",
    core: 6,
    nodes: [...HEX, sub(0), sub(3)],
    edges: [...cycle(6), [0, 6], [3, 7]],
    doubles: AROMATIC,
  },
  {
    name: "mesitylene",
    core: 6,
    nodes: [...HEX, sub(0), sub(2), sub(4)],
    edges: [...cycle(6), [0, 6], [2, 7], [4, 8]],
    doubles: AROMATIC,
  },
  {
    name: "styrene",
    core: 6,
    nodes: [...HEX, sub(0), [2.6, 0.75]],
    edges: [...cycle(6), [0, 6]],
    doubles: [...AROMATIC, [6, 7]],
  },
  {
    name: "cumene",
    core: 6,
    nodes: [...HEX, sub(0), [2.5, 0.87], [2.5, -0.87]],
    edges: [...cycle(6), [0, 6], [6, 7], [6, 8]],
    doubles: AROMATIC,
  },
  {
    name: "benzaldehyde",
    core: 6,
    nodes: [...HEX, sub(0), [2.5, -0.87]],
    edges: [...cycle(6), [0, 6]],
    doubles: [...AROMATIC, [6, 7]],
  },
  {
    name: "benzoic acid",
    core: 6,
    nodes: [...HEX, sub(0), [2.5, -0.87], [2.5, 0.87]],
    edges: [...cycle(6), [0, 6], [6, 8]],
    doubles: [...AROMATIC, [6, 7]],
  },
  {
    name: "salicylic acid",
    core: 6,
    nodes: [...HEX, sub(0), [2.5, -0.87], [2.5, 0.87], sub(1)],
    edges: [...cycle(6), [0, 6], [6, 8], [1, 9]],
    doubles: [...AROMATIC, [6, 7]],
  },
  // --- fused rings ---
  { name: "naphthalene", core: 9, nodes: NAPH, edges: NAPH_EDGES, doubles: [[1, 2], [3, 4], [6, 7]] },
  {
    name: "2-methylnaphthalene",
    core: 9,
    nodes: [...NAPH, [2.9, 0.5]],
    edges: [...NAPH_EDGES, [7, 9]],
    doubles: [[1, 2], [3, 4], [6, 7]],
  },
  // --- saturated rings ---
  { name: "cyclohexane", core: 6, nodes: HEX, edges: cycle(6) },
  { name: "cyclopentane", core: 5, nodes: PENT, edges: cycle(5) },
  {
    name: "glucose",
    core: 6,
    nodes: [...HEX, sub(0, 1.95), sub(1, 1.95), sub(2, 1.95), sub(4, 1.95), sub(5, 1.95)],
    edges: [...cycle(6), [0, 6], [1, 7], [2, 8], [4, 9], [5, 10]],
  },
  // --- chains that sprout branches ---
  {
    name: "isopentane",
    core: 4,
    nodes: [...chain(4), [-0.45, -1.25]],
    edges: [[0, 1], [1, 2], [2, 3], [1, 4]],
  },
  {
    name: "isoprene",
    core: 4,
    nodes: [...chain(4), [-0.45, -1.25]],
    edges: [[1, 2], [1, 4]],
    doubles: [[0, 1], [2, 3]],
  },
  { name: "1,3-butadiene", core: 4, nodes: chain(4), edges: [[1, 2]], doubles: [[0, 1], [2, 3]] },
  {
    name: "ethanol",
    core: 3,
    nodes: [...chain(3), [0.9, 0.95]],
    edges: [[0, 1], [1, 2], [2, 3]],
  },
  {
    name: "glycerol",
    core: 3,
    nodes: [...chain(3), [-0.9, 1.05], [0, -1.05], [0.9, 1.05]],
    edges: [[0, 1], [1, 2], [0, 3], [1, 4], [2, 5]],
  },
  {
    name: "acetone",
    core: 3,
    nodes: [...chain(3), [0, -1.15]],
    edges: [[0, 1], [1, 2]],
    doubles: [[1, 3]],
  },
  {
    name: "acetic acid",
    core: 2,
    nodes: [[-0.9, 0.3], [0, -0.2], [0, -1.2], [0.9, 0.3]],
    edges: [[0, 1], [1, 3]],
    doubles: [[1, 2]],
  },
  {
    name: "glycine",
    core: 2,
    nodes: [[-0.9, -0.2], [0, 0.3], [-1.8, 0.3], [0.9, -0.2], [0, 1.3]],
    edges: [[0, 1], [0, 2], [1, 3]],
    doubles: [[1, 4]],
  },
  {
    name: "urea",
    core: 1,
    nodes: [[0, 0], [-1, 0.55], [1, 0.55], [0, -1.1]],
    edges: [[0, 1], [0, 2]],
    doubles: [[0, 3]],
  },
  // --- small, tetrahedral centres growing their bonds ---
  {
    name: "neopentane",
    core: 1,
    nodes: [[0, 0], [0, -1.1], [1.05, 0.4], [-1.05, 0.4], [0, 1.1]],
    edges: [[0, 1], [0, 2], [0, 3], [0, 4]],
  },
  {
    name: "tert-butanol",
    core: 1,
    nodes: [[0, 0], [0, -1.1], [0.95, 0.55], [-0.95, 0.55], [0, 1.1]],
    edges: [[0, 1], [0, 2], [0, 3], [0, 4]],
  },
  {
    name: "methane",
    core: 1,
    nodes: [[0, 0], [0, -1], [0.94, 0.34], [-0.94, 0.34], [0, 0.8]],
    edges: [[0, 1], [0, 2], [0, 3], [0, 4]],
  },
  { name: "water", core: 1, nodes: [[0, 0], [-0.9, 0.5], [0.9, 0.5]], edges: [[0, 1], [0, 2]] },
  {
    name: "ammonia",
    core: 1,
    nodes: [[0, 0], [0, -1], [0.87, 0.5], [-0.87, 0.5]],
    edges: [[0, 1], [0, 2], [0, 3]],
  },
  {
    name: "carbon dioxide",
    core: 1,
    nodes: [[0, 0], [-1.1, 0], [1.1, 0]],
    edges: [],
    doubles: [[0, 1], [0, 2]],
  },
  { name: "ethylene", core: 2, nodes: [[-0.6, 0], [0.6, 0]], edges: [], doubles: [[0, 1]] },
  // --- the super-materials nod: an ABX3 unit cell filling in around its centre ---
  {
    name: "perovskite cell",
    core: 8,
    nodes: [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [0, 0]],
    edges: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0],
      [8, 1], [8, 3], [8, 5], [8, 7],
    ],
  },
]

type Molecule = {
  compound: Compound
  /** which grid cell this slot owns, so coverage stays even */
  cell: number
  x: number
  y: number
  vx: number
  vy: number
  scale: number
  rot: number
  spin: number
  born: number
  life: number
}

const GREEN = "58, 122, 78"

export default function Molecules() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let width = 0
    let height = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener("resize", resize)

    const count = () => (width < 700 ? 8 : width < 1200 ? 14 : 20)

    /* Purely random placement leaves visible holes, so each slot owns a grid cell
       and always respawns inside it. Drift still carries them anywhere. */
    const cols = () => Math.max(1, Math.round(Math.sqrt((count() * width) / Math.max(height, 1))))
    const rows = () => Math.max(1, Math.ceil(count() / cols()))

    const spawn = (now: number, cell: number, stagger = 0): Molecule => {
      const c = cols()
      const r = rows()
      const cw = width / c
      const ch = height / r
      const cx = (cell % c) * cw
      const cy = Math.floor(cell / c) * ch
      const heading = Math.random() * Math.PI * 2
      const speed = 6 + Math.random() * 14 // px per second
      return {
        compound: COMPOUNDS[Math.floor(Math.random() * COMPOUNDS.length)],
        cell,
        x: cx + cw * (0.15 + Math.random() * 0.7),
        y: cy + ch * (0.15 + Math.random() * 0.7),
        vx: Math.cos(heading) * speed,
        vy: Math.sin(heading) * speed,
        scale: 22 + Math.random() * 26,
        rot: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.00026,
        born: now - stagger,
        life: 11000 + Math.random() * 9000,
      }
    }

    let molecules: Molecule[] = []
    let last = performance.now()

    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now

      ctx.clearRect(0, 0, width, height)

      const target = count()
      while (molecules.length > target) molecules.pop()
      while (molecules.length < target) molecules.push(spawn(now, molecules.length, Math.random() * 14000))

      for (let i = 0; i < molecules.length; i++) {
        const m = molecules[i]
        const t = (now - m.born) / m.life

        if (t >= 1) {
          molecules[i] = spawn(now, m.cell)
          continue
        }

        // drift, wrapping around the edges
        m.x += m.vx * dt
        m.y += m.vy * dt
        const pad = m.scale * 3.5
        if (m.x < -pad) m.x = width + pad
        if (m.x > width + pad) m.x = -pad
        if (m.y < -pad) m.y = height + pad
        if (m.y > height + pad) m.y = -pad

        // overall presence: in over the first 10%, out over the last 22%
        let fade: number
        if (t < 0.1) fade = t / 0.1
        else if (t > 0.78) fade = 1 - (t - 0.78) / 0.22
        else fade = 1
        fade = fade * fade * (3 - 2 * fade)
        if (fade <= 0.004) continue

        const nodes = m.compound.nodes
        const branchCount = nodes.length - m.compound.core

        /** 0 while the core is still settling, then 1 as each branch grows on */
        const presence = (idx: number) => {
          if (idx < m.compound.core) return Math.min(1, t / 0.09)
          if (branchCount <= 0) return 1
          const order = idx - m.compound.core
          // branches arrive one at a time between 12% and 62% of the life
          const slot = 0.12 + (order / branchCount) * 0.5
          const p = (t - slot) / 0.09
          return Math.max(0, Math.min(1, p))
        }

        const rot = m.rot + (now - m.born) * m.spin
        const cos = Math.cos(rot)
        const sin = Math.sin(rot)
        const pts = nodes.map((n) => ({
          x: m.x + (n[0] * cos - n[1] * sin) * m.scale,
          y: m.y + (n[0] * sin + n[1] * cos) * m.scale,
        }))
        const grown = nodes.map((_, idx) => presence(idx))

        ctx.lineWidth = 1

        const bond = (a: number, b: number, offset: number) => {
          const strength = Math.min(grown[a], grown[b])
          if (strength <= 0.01) return
          const p = pts[a]
          const q = pts[b]
          // a new bond extends out from the atom that was already there
          const from = grown[a] >= grown[b] ? p : q
          const to = grown[a] >= grown[b] ? q : p
          const ex = from.x + (to.x - from.x) * strength
          const ey = from.y + (to.y - from.y) * strength
          let ox = 0
          let oy = 0
          if (offset) {
            const dx = ex - from.x
            const dy = ey - from.y
            const len = Math.hypot(dx, dy) || 1
            ox = (-dy / len) * offset
            oy = (dx / len) * offset
          }
          ctx.strokeStyle = `rgba(${GREEN}, ${0.34 * fade * strength})`
          ctx.beginPath()
          ctx.moveTo(from.x + ox, from.y + oy)
          ctx.lineTo(ex + ox, ey + oy)
          ctx.stroke()
        }

        for (const [a, b] of m.compound.edges) bond(a, b, 0)
        for (const [a, b] of m.compound.doubles ?? []) {
          bond(a, b, 2)
          bond(a, b, -2)
        }

        for (let n = 0; n < pts.length; n++) {
          const g = grown[n]
          if (g <= 0.01) continue
          ctx.fillStyle = `rgba(${GREEN}, ${0.6 * fade * g})`
          ctx.beginPath()
          ctx.arc(pts[n].x, pts[n].y, 2 * g, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      raf = requestAnimationFrame(draw)
    }

    let raf = 0
    last = performance.now()
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 w-full h-full z-0" />
}
