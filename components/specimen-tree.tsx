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
const GROW_AT = 450 // ms after navigation when the tree starts growing
const GROW_SECS = 2.6 // wall-clock length of the growth

type Segment = {
  x1: number
  y1: number
  x2: number
  y2: number
  /** limbs taper, so each segment has a width at each end */
  w1: number
  w2: number
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

  const grow = (x: number, y: number, angle: number, len: number, depth: number, t: number, w: number) => {
    const x2 = x + Math.cos(angle) * len
    const y2 = y + Math.sin(angle) * len
    const wEnd = w * 0.7
    segments.push({ x1: x, y1: y, x2, y2, w1: w, w2: wEnd, start: t, dur: len })
    const done = t + len

    if (depth === 0 || len < UNIT * 0.022) {
      tips.push({ x: x2, y: y2, angle, at: done, size: RING * (0.7 + rand() * 0.6) })
      return
    }

    // a narrow spread keeps the tree taller than it is wide, so height is what fills
    const spread = 0.28 + rand() * 0.22
    const branches = depth > 2 && rand() < 0.4 ? 3 : 2
    for (let i = 0; i < branches; i++) {
      const offset = branches === 2 ? (i === 0 ? -spread : spread) : (i - 1) * spread * 1.2
      const wobble = (rand() - 0.5) * 0.24
      grow(x2, y2, angle + offset + wobble, len * (0.72 + rand() * 0.08), depth - 1, done, wEnd)
    }
  }

  // a fat trunk that thins as it divides
  grow(0, 0, -Math.PI / 2, UNIT, 9, 0, 17)

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
    s.w1 = Math.max(0.9, s.w1 * ringScale)
    s.w2 = Math.max(0.8, s.w2 * ringScale)
    s.start *= timeScale
    s.dur *= timeScale
  }
  for (const t of tips) {
    t.x = t.x * scaleX + offsetX
    t.y = t.y * scaleY + offsetY
    t.size = Math.max(2, Math.min(5.5, t.size * ringScale))
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
    let lastW = 0
    let lastH = 0
    let baked: HTMLCanvasElement | null = null
    let total = 0
    let done: HTMLCanvasElement | null = null
    let doneCtx: CanvasRenderingContext2D | null = null
    let segOrder: Segment[] = []
    let tipOrder: Tip[] = []
    let segDone = 0
    let tipDone = 0

    const rebuild = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      if (w < 2 || h < 2) return
      // ResizeObserver fires once as soon as it observes, which would otherwise
      // count as a "resize" and skip the growth animation on load
      if (w === lastW && h === lastH) return
      lastW = w
      lastH = h
      width = w
      height = h
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      tree = buildTree(width, height, Math.floor(Math.random() * 1e9))
      baked = null
      done = null
      doneCtx = null
      const now = performance.now()
      // only the first build animates; a later resize just re-fits the grown tree.
      // The first growth is pinned to the page's own clock (just after the frame
      // fades in), not to whenever this script happens to load, so it grows in
      // step with the entrance wave instead of starting late.
      growthStart = built ? now - 60000 : GROW_AT
      built = true
      total = tree.segments.reduce((m, s) => Math.max(m, s.start + s.dur), 0) + 0.6
      nextBird = Math.max(now, growthStart + GROW_SECS * 1000) + 400
    }

    rebuild()
    const ro = new ResizeObserver(rebuild)
    ro.observe(canvas)

    /** adds a branch's outline to a path. Branches are tapered solids rather
        than constant-width strokes — that taper is most of what makes it read
        as a tree instead of line art. The rounded joint at its base comes
        back as its own path, since overlapping subpaths would cancel out */
    const addSegment = (path: Path2D, s: Segment, p: number, joints?: Path2D) => {
      const ex = s.x1 + (s.x2 - s.x1) * p
      const ey = s.y1 + (s.y2 - s.y1) * p
      const ew = s.w1 + (s.w2 - s.w1) * p
      const dx = ex - s.x1
      const dy = ey - s.y1
      const len = Math.hypot(dx, dy)
      if (len < 0.01) return null
      const nx = -dy / len
      const ny = dx / len
      const h1 = s.w1 / 2
      const h2 = ew / 2
      path.moveTo(s.x1 + nx * h1, s.y1 + ny * h1)
      path.lineTo(ex + nx * h2, ey + ny * h2)
      path.lineTo(ex - nx * h2, ey - ny * h2)
      path.lineTo(s.x1 - nx * h1, s.y1 - ny * h1)
      path.closePath()
      if (h1 <= 0.7) return null
      const j = joints ?? new Path2D()
      j.moveTo(s.x1 + h1, s.y1)
      j.arc(s.x1, s.y1, h1, 0, Math.PI * 2)
      return j
    }

    const TIP_DUR = 0.4

    /** a tip's hexagon and its inner aromatic circle, added to shared paths */
    const addRing = (hex: Path2D, dot: Path2D, t: Tip, r: number) => {
      for (let j = 0; j < 6; j++) {
        const a = t.angle + (j * Math.PI) / 3
        const px = t.x + Math.cos(a) * r
        const py = t.y + Math.sin(a) * r
        if (j === 0) hex.moveTo(px, py)
        else hex.lineTo(px, py)
      }
      hex.closePath()
      dot.moveTo(t.x + r * 0.5, t.y)
      dot.arc(t.x, t.y, r * 0.5, 0, Math.PI * 2)
    }

    /* While growing, finished branches and rings are painted once into a cache
       layer; each frame only redraws the few still in motion. Redrawing every
       finished limb each frame is what made the canopy stutter as it filled in. */

    const startGrowthCache = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      done = document.createElement("canvas")
      done.width = Math.floor(width * dpr)
      done.height = Math.floor(height * dpr)
      doneCtx = done.getContext("2d")
      doneCtx?.setTransform(dpr, 0, 0, dpr, 0, 0)
      segOrder = [...tree.segments].sort((a, b) => a.start + a.dur - (b.start + b.dur))
      tipOrder = [...tree.tips].sort((a, b) => a.at - b.at)
      segDone = 0
      tipDone = 0
      sprites = []
      for (let si = 0; si < SIZE_B; si++) {
        const size = SIZE_MIN + ((SIZE_MAX - SIZE_MIN) * si) / (SIZE_B - 1)
        for (let ri = 0; ri < ROT_B; ri++) {
          const c = document.createElement("canvas")
          c.width = c.height = Math.ceil(SPR * dpr)
          const sc = c.getContext("2d")
          if (!sc) continue
          sc.setTransform(dpr, 0, 0, dpr, 0, 0)
          const hex = new Path2D()
          const dot = new Path2D()
          addRing(hex, dot, { x: SPR / 2, y: SPR / 2, angle: (ri * Math.PI) / 3 / ROT_B, at: 0, size }, size)
          sc.lineWidth = 1
          sc.strokeStyle = `rgba(${LEAF}, 0.62)`
          sc.stroke(hex)
          sc.strokeStyle = `rgba(${LEAF}, ${0.62 * 0.6})`
          sc.stroke(dot)
          sprites[si * ROT_B + ri] = c
        }
      }
    }

    /* an opening ring is stamped from a pre-drawn sprite (nearest size and
       rotation) — one call instead of a dozen path calls with trig. Hundreds
       open at once at the canopy, and building their paths was the stutter. */
    const SIZE_MIN = 2
    const SIZE_MAX = 5.5
    const SIZE_B = 4
    const ROT_B = 6
    const SPR = SIZE_MAX * 2 + 3
    let sprites: HTMLCanvasElement[] = []
    const spriteFor = (t: Tip) => {
      const si = Math.round(((t.size - SIZE_MIN) / (SIZE_MAX - SIZE_MIN)) * (SIZE_B - 1))
      const rot = ((t.angle % (Math.PI / 3)) + Math.PI / 3) % (Math.PI / 3)
      const ri = Math.round((rot / (Math.PI / 3)) * ROT_B) % ROT_B
      return { img: sprites[si * ROT_B + ri], size: SIZE_MIN + ((SIZE_MAX - SIZE_MIN) * si) / (SIZE_B - 1) }
    }

    const drawGrowing = (elapsed: number, alpha: number) => {
      if (!done || !doneCtx) startGrowthCache()
      const dc = doneCtx!
      // move anything that just finished into the cache
      // (batched too: at the canopy hundreds finish in the same frame)
      const fin = new Path2D()
      const finJoints = new Path2D()
      let anyFin = false
      while (segDone < segOrder.length && segOrder[segDone].start + segOrder[segDone].dur <= elapsed) {
        addSegment(fin, segOrder[segDone++], 1, finJoints)
        anyFin = true
      }
      if (anyFin) {
        dc.fillStyle = `rgba(${BARK}, 0.82)`
        dc.fill(fin)
        dc.fill(finJoints)
      }
      const finHex = new Path2D()
      const finDot = new Path2D()
      let anyTip = false
      while (tipDone < tipOrder.length && tipOrder[tipDone].at + TIP_DUR <= elapsed) {
        const t = tipOrder[tipDone++]
        addRing(finHex, finDot, t, t.size)
        anyTip = true
      }
      if (anyTip) {
        dc.lineWidth = 1
        dc.strokeStyle = `rgba(${LEAF}, 0.62)`
        dc.stroke(finHex)
        dc.strokeStyle = `rgba(${LEAF}, ${0.62 * 0.6})`
        dc.stroke(finDot)
      }
      ctx.globalAlpha = alpha
      ctx.drawImage(done!, 0, 0, width, height)
      ctx.globalAlpha = 1
      // then only what is still in motion: branches still growing go into one
      // shared path and one fill, and hair-thin twigs (whose taper can't be
      // seen) into a single plain stroke
      ctx.fillStyle = `rgba(${BARK}, ${0.82 * alpha})`
      const limbs = new Path2D()
      const joints = new Path2D()
      const twigs = new Path2D()
      for (let i = segDone; i < segOrder.length; i++) {
        const s = segOrder[i]
        if (s.start >= elapsed) continue
        const p = Math.min(1, (elapsed - s.start) / s.dur)
        if (s.w1 < 1.6) {
          twigs.moveTo(s.x1, s.y1)
          twigs.lineTo(s.x1 + (s.x2 - s.x1) * p, s.y1 + (s.y2 - s.y1) * p)
        } else addSegment(limbs, s, p, joints)
      }
      ctx.fill(limbs, "nonzero")
      ctx.fill(joints, "nonzero")
      ctx.strokeStyle = `rgba(${BARK}, ${0.82 * alpha})`
      ctx.lineWidth = 1.1
      ctx.stroke(twigs)
      for (let i = tipDone; i < tipOrder.length; i++) {
        const t = tipOrder[i]
        if (t.at >= elapsed) continue
        const p = Math.min(1, (elapsed - t.at) / TIP_DUR)
        const { img, size } = spriteFor(t)
        if (!img) continue
        const half = (SPR / 2) * (t.size / size) * p
        ctx.globalAlpha = alpha * p
        ctx.drawImage(img, t.x - half, t.y - half, half * 2, half * 2)
      }
      ctx.globalAlpha = 1
    }

    const totalGrowth = () => total

    const drawBird = (b: Bird, now: number, alpha: number) => {
      const flap = 0.35 + 0.65 * Math.abs(Math.sin((now - b.born) / 150 + b.phase))
      const w = b.size
      const h = b.size * 0.7 * flap
      ctx.strokeStyle = `rgba(${BIRD}, ${alpha})`
      ctx.lineWidth = Math.max(1.8, b.size * 0.22)
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
        // eased: shoots up quickly, then the canopy settles in slowly
        const t = Math.min(1, Math.max(0, (now - growthStart) / 1000 / GROW_SECS))
        const eased = 1 - Math.pow(1 - t, 3)
        const elapsed = reduced ? 999 : t >= 1 ? totalGrowth() + (now - growthStart) / 1000 : eased * totalGrowth()

        if (baked) {
          ctx.globalAlpha = fade
          ctx.drawImage(baked, 0, 0, width, height)
          ctx.globalAlpha = 1
        } else {
          drawGrowing(elapsed, fade)
          // fully grown: the cache already holds the whole tree
          if (elapsed >= totalGrowth()) baked = done
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
              vx: toRight * (34 + Math.random() * 42),
              vy: -(22 + Math.random() * 30),
              born: now,
              size: 8 + Math.random() * 7,
              phase: Math.random() * Math.PI * 2 + n * 0.9,
            })
          }
          nextBird = now + 380 + Math.random() * 900
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
          b.vy -= 0.05 // climb as they get away
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
