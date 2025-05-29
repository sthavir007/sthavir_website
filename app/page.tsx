"use client"

import { Mail, Github, Linkedin } from "lucide-react"
import { useState } from "react"

export default function Home() {
  const [gravityActive, setGravityActive] = useState(false)

  const handleGravityClick = () => {
    setGravityActive(true)
    // Reset after animation completes
    setTimeout(() => setGravityActive(false), 3000)
  }

  return (
    <div className="min-h-screen bg-[#f0ead6] text-black font-mono relative overflow-hidden">
      {/* Header */}
      <header className="p-6 flex justify-between items-center">
        <div
          className={`text-sm transition-all duration-1000 ${gravityActive ? "transform translate-y-[100vh] rotate-12" : ""}`}
        >
          sthavir.xyz
        </div>
        <div
          className={`text-sm flex space-x-4 transition-all duration-1000 ${gravityActive ? "transform translate-y-[100vh] rotate-45" : ""}`}
        >
          <a href="/research" className="underline hover:no-underline">
            research
          </a>
          <a href="/interests" className="underline hover:no-underline">
            interests
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-[80vh] px-6">
        <div className="text-center">
          <h1
            className={`text-2xl mb-4 transition-all duration-1000 ${gravityActive ? "transform translate-y-[100vh] rotate-90" : ""}`}
          >
            hi, i'm sthavir
          </h1>

          {/* F1 Car Animation */}
          <div className="relative h-12 mb-8 overflow-hidden">
            <div
              className={`f1-car absolute top-1/2 transform -translate-y-1/2 text-2xl transition-all duration-1000 ${gravityActive ? "translate-y-[100vh] rotate-180" : ""}`}
            >
              🏎️
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className={`fixed bottom-6 left-0 right-0 text-center text-xs text-gray-600 transition-all duration-1000 ${gravityActive ? "transform translate-y-[100vh] rotate-12" : ""}`}
      >
        Sthavir Vinjamuri | sthavir007@gmail.com
      </footer>

      {/* Social Icons - Vertical Column */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-4">
        <div
          className={`flex flex-col space-y-4 transition-all duration-1000 ${gravityActive ? "transform translate-y-[100vh] rotate-45" : ""}`}
        >
          <a href="mailto:sthavir007@gmail.com" className="hover:opacity-70 transition-opacity" aria-label="Email">
            <div className="w-10 h-10 flex items-center justify-center">
              <Mail size={24} />
            </div>
          </a>
          <a
            href="https://github.com/sthavir007"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
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
            className="hover:opacity-70 transition-opacity"
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
          className="w-10 h-10 flex items-center justify-center text-black hover:opacity-70 transition-opacity text-lg"
          aria-label="Gravity Effect"
        >
          ;)
        </button>
      </div>

      <style jsx>{`
        .f1-car {
          animation: raceAcrossReverse 3s ease-in-out;
          right: -50px;
        }

        @keyframes raceAcrossReverse {
          0% {
            right: -50px;
          }
          100% {
            right: calc(100% + 50px);
          }
        }
      `}</style>
    </div>
  )
}
