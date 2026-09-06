"use client"

import { Mail, Github, Linkedin } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

type HoverKey = "ucsd" | "tjhsst" | "aether" | "1517" | "tjbiotech"

const IMAGES: Record<HoverKey, { src: string; alt: string }> = {
  ucsd: { src: "/images/ucsd.jpg", alt: "at ucsd" },
  tjhsst: { src: "/images/tjhsst.jpg", alt: "tjhsst graduation" },
  aether: { src: "/images/aether.jpg", alt: "building at aether" },
  "1517": { src: "/images/1517.jpg", alt: "1517 fund 2e camp" },
  tjbiotech: { src: "/images/tjbiotech.jpg", alt: "tj biotech club" },
}

export default function Home() {
  const [gravityActive, setGravityActive] = useState(false)
  const [currentDay, setCurrentDay] = useState("")
  const [active, setActive] = useState<HoverKey | null>(null)

  useEffect(() => {
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
    setCurrentDay(days[new Date().getDay()])
  }, [])

  const handleGravityClick = () => {
    setGravityActive(true)
    setTimeout(() => setGravityActive(false), 3000)
  }

  // a highlighted term that reveals its photo on hover (or tap on touch devices)
  const Spot = ({ k, children }: { k: HoverKey; children: React.ReactNode }) => (
    <button
      type="button"
      onMouseEnter={() => setActive(k)}
      onMouseLeave={() => setActive((c) => (c === k ? null : c))}
      onFocus={() => setActive(k)}
      onBlur={() => setActive((c) => (c === k ? null : c))}
      onClick={() => setActive((c) => (c === k ? null : k))}
      className={`transition-colors ${active === k ? "text-[#4a6fb5]" : "text-[#7d9bd6]"} hover:text-[#4a6fb5]`}
    >
      {children}
    </button>
  )

  return (
    <div className="min-h-screen bg-[#f0ead6] text-black font-sans relative overflow-x-hidden">
      {/* Header */}
      <header className="p-6 flex justify-between items-center gap-4">
        <div
          className={`text-sm md:text-base transition-all duration-1000 shrink-0 ${gravityActive ? "transform translate-y-[100vh] rotate-12" : ""}`}
        >
          <span className="cursor-default">home</span>
        </div>
        <div
          className={`text-sm md:text-base flex gap-x-3 md:gap-x-4 transition-all duration-1000 ${gravityActive ? "transform translate-y-[100vh] rotate-45" : ""}`}
        >
          <Link href="/research" prefetch={true} className="underline hover:no-underline hover:text-red-500 transition-colors">
            research
          </Link>
          <Link href="/programs" prefetch={true} className="underline hover:no-underline hover:text-red-500 transition-colors">
            programs
          </Link>
          <Link href="/interests" prefetch={true} className="underline hover:no-underline hover:text-red-500 transition-colors">
            interests
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 md:px-12 lg:px-20 pb-32 pt-8 md:pt-16">
        <div
          className={`max-w-6xl mx-auto transition-all duration-1000 ${gravityActive ? "transform translate-y-[100vh] rotate-6" : ""}`}
        >
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight mb-12 md:mb-20">
            sthavir vinjamuri
          </h1>

          <div className="flex gap-10">
            {/* Lines */}
            <div className="font-serif text-xl sm:text-2xl md:text-3xl leading-relaxed space-y-7 md:space-y-9 flex-1 max-w-3xl">
              <p>
                i'm an 18 y/o studying bioengineering at <Spot k="ucsd">ucsd</Spot>
              </p>
              <p>
                i'm from dc and went to <Spot k="tjhsst">tjhsst</Spot>
              </p>
              <p>
                right now i'm building super-materials with ai @ <Spot k="aether">aether</Spot>
              </p>
              <p>
                previously i've built a fetal mouse single cell atlas, explored digital twinning, investigated
                cooling center access, and created banana quantum dots at harvard, skmc, and gmu.
              </p>
              <p>
                i was invited to <Spot k="1517">1517 fund 2e camp</Spot> and led{" "}
                <Spot k="tjbiotech">tj biotech club</Spot>
              </p>
              <p>i also enjoy listening to music and reading.</p>
            </div>

            {/* Hover photo — reserved column on large screens */}
            <div className="hidden lg:block w-[340px] shrink-0">
              <div className="sticky top-24 h-[420px] w-full">
                {(Object.keys(IMAGES) as HoverKey[]).map((k) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={k}
                    src={IMAGES[k].src}
                    alt={IMAGES[k].alt}
                    className={`absolute inset-0 w-full h-full object-cover rounded-md shadow-lg transition-opacity duration-300 ${
                      active === k ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Hover photo — floating card on small screens */}
      <div
        className={`lg:hidden fixed bottom-24 left-1/2 -translate-x-1/2 z-40 w-56 h-64 pointer-events-none transition-opacity duration-300 ${
          active ? "opacity-100" : "opacity-0"
        }`}
      >
        {(Object.keys(IMAGES) as HoverKey[]).map((k) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={k}
            src={IMAGES[k].src}
            alt={IMAGES[k].alt}
            className={`absolute inset-0 w-full h-full object-cover rounded-md shadow-xl transition-opacity duration-300 ${
              active === k ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Footer */}
      <footer
        className={`fixed bottom-6 left-0 right-0 text-center text-sm text-gray-600 transition-all duration-1000 pointer-events-none ${gravityActive ? "transform translate-y-[100vh] rotate-12" : ""}`}
      >
        Sthavir Vinjamuri | have a great {currentDay}!
      </footer>

      {/* Social Icons */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-4 z-50">
        <div
          className={`flex flex-col space-y-4 transition-all duration-1000 ${gravityActive ? "transform translate-y-[100vh] rotate-45" : ""}`}
        >
          <Link href="/email" prefetch={true} className="hover:text-red-500 transition-colors" aria-label="Email">
            <div className="w-10 h-10 flex items-center justify-center">
              <Mail size={24} />
            </div>
          </Link>
          <a
            href="https://github.com/sthavir007"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-500 transition-colors"
            aria-label="GitHub"
          >
            <div className="w-10 h-10 flex items-center justify-center">
              <Github size={24} />
            </div>
          </a>
          <a
            href="https://www.linkedin.com/in/sthavir-vinjamuri-505709343/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-500 transition-colors"
            aria-label="LinkedIn"
          >
            <div className="w-10 h-10 flex items-center justify-center">
              <Linkedin size={24} />
            </div>
          </a>
        </div>

        {/* Gravity Button */}
        <button
          onClick={handleGravityClick}
          className="w-10 h-10 flex items-center justify-center text-black hover:text-red-500 transition-colors text-lg"
          aria-label="Gravity Effect"
        >
          ;)
        </button>
      </div>
    </div>
  )
}
