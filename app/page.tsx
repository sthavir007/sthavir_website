"use client"

import { Instagram, Linkedin, X } from "lucide-react"
import { useState, useEffect } from "react"
import Molecules from "@/components/molecules"
import SpecimenTree from "@/components/specimen-tree"

type HoverKey = "ucsd" | "tjhsst" | "aether" | "1517" | "tjbiotech" | "music" | "qdots"

const IMAGES: Record<HoverKey, { src: string; alt: string }> = {
  ucsd: { src: "/images/ucsd.jpg", alt: "at ucsd" },
  tjhsst: { src: "/images/tjhsst.jpg", alt: "tjhsst graduation" },
  aether: { src: "/images/aether.jpg", alt: "building at aether" },
  "1517": { src: "/images/1517.jpg", alt: "1517 fund 2e camp" },
  tjbiotech: { src: "/images/tjbiotech.jpg", alt: "tj biotech club" },
  music: { src: "/images/astroworld.jpg", alt: "astroworld by travis scott" },
  qdots: { src: "/images/qdots.jpg", alt: "banana carbon quantum dots fluorescing under uv" },
}

const POSTERS = {
  fmrca: {
    title: "fMRCA: Fetal Mouse Single Cell Retina Atlas",
    src: "https://drive.google.com/file/d/1KoQhtUwfeXGaqtQOWsXeJzSgqJTj65X-/preview",
  },
  cooling: {
    title: "Cooling Center Access in New York City",
    src: "https://drive.google.com/file/d/17IWzsNp6DymwVHrSg6r1SOhmUTX0PK_x/preview",
  },
}

const MYELOID_PAPER = "https://www.biorxiv.org/content/10.1101/2025.05.16.654622v1.full"

/** a bond node in the left gutter — fills in when its line is the active one */
function Node({ on }: { on: boolean }) {
  return (
    <svg className="node" width="17" height="19" viewBox="0 0 17 19" aria-hidden="true">
      <polygon
        points="8.5,1 16,5.3 16,13.7 8.5,18 1,13.7 1,5.3"
        fill={on ? "#b3202c" : "#f0ead6"}
        stroke={on ? "#b3202c" : "#8a7c62"}
        strokeWidth="1.2"
      />
    </svg>
  )
}

export default function Home() {
  const [currentDay, setCurrentDay] = useState("")
  const [active, setActive] = useState<HoverKey | null>(null)
  const [poster, setPoster] = useState<keyof typeof POSTERS | null>(null)

  useEffect(() => {
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
    setCurrentDay(days[new Date().getDay()])
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPoster(null)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const hoverProps = (k: HoverKey) => ({
    onMouseEnter: () => setActive(k),
    onMouseLeave: () => setActive((c) => (c === k ? null : c)),
    onFocus: () => setActive(k),
    onBlur: () => setActive((c) => (c === k ? null : c)),
  })

  // a single red for every link on the page; hover moves the underline, not the hue
  const linkClass = (on: boolean) =>
    `text-[#b3202c] underline decoration-1 underline-offset-4 transition-all ${
      on ? "no-underline" : "hover:no-underline"
    }`

  /** a term that swaps the photo on hover, and links out on click when it has a destination */
  const Spot = ({ k, href, children }: { k: HoverKey; href?: string; children: React.ReactNode }) =>
    href ? (
      <a href={href} target="_blank" rel="noopener noreferrer" {...hoverProps(k)} className={linkClass(active === k)}>
        {children}
      </a>
    ) : (
      <button
        type="button"
        {...hoverProps(k)}
        onClick={() => setActive((c) => (c === k ? null : k))}
        className={linkClass(active === k)}
      >
        {children}
      </button>
    )

  /** an outbound link, optionally swapping the photo on hover too */
  const Out = ({ href, k, children }: { href: string; k?: HoverKey; children: React.ReactNode }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...(k ? hoverProps(k) : {})}
      className={linkClass(!!k && active === k)}
    >
      {children}
    </a>
  )

  /** opens a poster in the viewer */
  const PosterLink = ({ k, children }: { k: keyof typeof POSTERS; children: React.ReactNode }) => (
    <button
      type="button"
      onClick={() => setPoster(k)}
      className="text-[#b3202c] underline decoration-dotted decoration-1 underline-offset-4 hover:no-underline transition-all"
    >
      {children}
    </button>
  )

  return (
    <div className="min-h-screen flex flex-col bg-[#f0ead6] text-black font-serif relative overflow-x-hidden">
      <Molecules />

      <main className="relative z-10 flex-1 px-6 md:px-12 lg:px-16 pt-14 md:pt-20 pb-16">
        <div className="max-w-[1320px] mx-auto">
          <h1 className="reveal text-5xl sm:text-6xl md:text-7xl tracking-[-0.01em]">sthavir vinjamuri</h1>
          <div className="reveal rule mt-5 mb-10 md:mb-14" />

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-14 xl:gap-20">
            {/* the chain: each fact is a unit on a backbone */}
            <ol className="chain flex-1 min-w-0 max-w-3xl text-xl sm:text-[1.35rem] md:text-[1.5rem] leading-relaxed">
              <li className="reveal reveal-2">
                <Node on={active === "ucsd"} />
                <p>
                  i&apos;m an 18 y/o studying bioengineering at <Spot k="ucsd" href="https://be.ucsd.edu/">ucsd</Spot>
                </p>
              </li>
              <li className="reveal reveal-3">
                <Node on={active === "tjhsst"} />
                <p>
                  i&apos;m from dc and went to <Spot k="tjhsst" href="https://tjhsst.fcps.edu/">tjhsst</Spot>
                </p>
              </li>
              <li className="reveal reveal-4">
                <Node on={active === "aether"} />
                <p>
                  right now, i&apos;m building super-materials with ai @ <Spot k="aether" href="https://aetherbio.com">aether</Spot>
                </p>
              </li>
              <li className="reveal reveal-5">
                <Node on={active === "qdots"} />
                <p>
                  previously i&apos;ve built a <PosterLink k="fmrca">fetal mouse</PosterLink>{" "}
                  <Out href={MYELOID_PAPER}>single cell atlas</Out>, explored{" "}
                  <Out href="https://pubmed.ncbi.nlm.nih.gov/39629824/">digital twinning</Out>, investigated{" "}
                  <PosterLink k="cooling">cooling center access</PosterLink>, and created{" "}
                  <Spot k="qdots">banana quantum dots</Spot> at harvard, skmc, and gmu.
                </p>
              </li>
              <li className="reveal reveal-6">
                <Node on={active === "1517" || active === "tjbiotech"} />
                <p>
                  i was invited to <Spot k="1517" href="https://1517fund.com">1517 fund 2e camp</Spot> and led{" "}
                  <Spot k="tjbiotech">tj biotech club</Spot>
                </p>
              </li>
              <li className="reveal reveal-7">
                <Node on={active === "music"} />
                <p>
                  i also enjoy reading <Out href="https://www.caranddriver.com/">car blogs</Out> and listening to{" "}
                  <Out href="https://open.spotify.com/track/2cYqizR4lgvp4Qu6IQ3qGN" k="music">
                    music
                  </Out>
                </p>
              </li>
            </ol>

            {/* specimen frame — the dedicated home for the photos */}
            <div className="reveal reveal-4 w-full lg:w-[430px] xl:w-[540px] shrink-0">
              <div className="lg:sticky lg:top-10">
                <div className={`specimen relative p-3 md:p-4 ${active ? "specimen-on" : ""}`}>
                  <span className="tick tl" />
                  <span className="tick tr" />
                  <span className="tick bl" />
                  <span className="tick br" />
                  <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[440px] xl:h-[530px]">
                    {/* nothing hovered: the frame grows a tree instead of sitting empty */}
                    <SpecimenTree visible={!active} />
                    {(Object.keys(IMAGES) as HoverKey[]).map((k) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={k}
                        src={IMAGES[k].src}
                        alt={IMAGES[k].alt}
                        className={`photo ${active === k ? "photo-on" : ""}`}
                        decoding="async"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-10 mt-auto px-6 pb-10 pt-4 text-center">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm md:text-base">
          <a
            href="mailto:svinjamuri@ucsd.edu"
            className="text-[#b3202c] underline decoration-1 underline-offset-4 hover:no-underline transition-all"
          >
            svinjamuri@ucsd.edu
          </a>
          <span className="text-gray-400" aria-hidden="true">
            |
          </span>
          <a
            href="https://www.linkedin.com/in/sthavir-vinjamuri-505709343/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#b3202c] hover:opacity-70 transition-opacity"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <span className="text-gray-400" aria-hidden="true">
            |
          </span>
          <a
            href="https://www.instagram.com/sthavir007/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#b3202c] hover:opacity-70 transition-opacity"
            aria-label="Instagram"
          >
            <Instagram size={20} />
          </a>
        </div>
        <p className="mt-3 text-sm text-gray-600">have a great {currentDay}!</p>
      </footer>

      {poster && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setPoster(null)}
        >
          <div
            className="bg-white rounded-lg w-full max-w-6xl h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">{POSTERS[poster].title}</h3>
              <button onClick={() => setPoster(null)} className="hover:text-[#b3202c] transition-colors" aria-label="Close">
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <iframe src={POSTERS[poster].src} className="w-full h-full" title={POSTERS[poster].title} />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .rule {
          height: 1px;
          max-width: 240px;
          background: linear-gradient(90deg, #8a7c62 0%, rgba(138, 124, 98, 0) 100%);
        }

        /* the backbone: nodes in the gutter joined by a bond line */
        .chain {
          list-style: none;
          margin: 0;
          padding: 0;
          position: relative;
        }
        .chain li {
          position: relative;
          padding-left: 40px;
          padding-bottom: 30px;
        }
        .chain li:last-child {
          padding-bottom: 0;
        }
        /* bond between this unit and the next */
        .chain li:not(:last-child)::before {
          content: "";
          position: absolute;
          left: 8px;
          top: 22px;
          bottom: 4px;
          width: 1px;
          background: #8a7c62;
          opacity: 0.45;
        }
        .chain :global(.node) {
          position: absolute;
          left: 0;
          top: 4px;
          transition: all 0.3s ease;
        }
        .chain p {
          margin: 0;
        }

        /* specimen frame around the photo — invisible until a photo is up */
        .specimen {
          border: 1px solid transparent;
          background: transparent;
          transition: border-color 0.4s ease, background-color 0.4s ease;
        }
        .specimen-on {
          border-color: rgba(138, 124, 98, 0.45);
          background: rgba(255, 253, 244, 0.35);
        }
        .tick {
          position: absolute;
          width: 12px;
          height: 12px;
          border-color: #b3202c;
          border-style: solid;
          border-width: 0;
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .specimen-on .tick {
          opacity: 0.75;
        }
        .tick.tl { top: -1px; left: -1px; border-top-width: 2px; border-left-width: 2px; }
        .tick.tr { top: -1px; right: -1px; border-top-width: 2px; border-right-width: 2px; }
        .tick.bl { bottom: -1px; left: -1px; border-bottom-width: 2px; border-left-width: 2px; }
        .tick.br { bottom: -1px; right: -1px; border-bottom-width: 2px; border-right-width: 2px; }

        .photo {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          opacity: 0;
          transform: scale(0.98);
          filter: drop-shadow(0 14px 34px rgba(70, 58, 38, 0.34)) blur(3px);
          transition:
            opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
            filter 0.5s ease;
        }
        .photo-on {
          opacity: 1;
          transform: scale(1);
          filter: drop-shadow(0 14px 34px rgba(70, 58, 38, 0.34)) blur(0);
        }

        .reveal {
          animation: rise 0.65s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .reveal-2 { animation-delay: 0.10s; }
        .reveal-3 { animation-delay: 0.16s; }
        .reveal-4 { animation-delay: 0.22s; }
        .reveal-5 { animation-delay: 0.28s; }
        .reveal-6 { animation-delay: 0.34s; }
        .reveal-7 { animation-delay: 0.40s; }

        @keyframes rise {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal { animation: none; }
        }
      `}</style>
    </div>
  )
}
