"use client"

import { Mail, Github, Linkedin, X } from "lucide-react"
import { useState, useEffect } from "react"

export default function Home() {
  const [gravityActive, setGravityActive] = useState(false)
  const [currentDay, setCurrentDay] = useState("")
  const [showBio, setShowBio] = useState(false)

  useEffect(() => {
    // Set current day of the week
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
    const today = new Date().getDay()
    setCurrentDay(days[today])
  }, [])

  const handleGravityClick = () => {
    setGravityActive(true)
    // Reset after animation completes
    setTimeout(() => setGravityActive(false), 3000)
  }

  return (
    <div className="min-h-screen bg-[#f0ead6] text-black font-sans relative overflow-hidden">
      {/* Header */}
      <header className="p-6 flex justify-between items-center">
        <div
          className={`text-sm transition-all duration-1000 ${gravityActive ? "transform translate-y-[100vh] rotate-12" : ""}`}
        >
          <span className="cursor-default">home</span>
        </div>
        <div
          className={`text-sm flex space-x-4 transition-all duration-1000 ${gravityActive ? "transform translate-y-[100vh] rotate-45" : ""}`}
        >
          <a href="/research" className="underline hover:no-underline hover:text-red-500 transition-colors">
            research
          </a>
          <a href="/programs" className="underline hover:no-underline hover:text-red-500 transition-colors">
            programs
          </a>
          <a href="/awards" className="underline hover:no-underline hover:text-red-500 transition-colors">
            awards
          </a>
          <a href="/interests" className="underline hover:no-underline hover:text-red-500 transition-colors">
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
            hi, i'm{" "}
            <span
              className="cursor-pointer underline hover:text-red-500 transition-colors"
              onClick={() => setShowBio(true)}
            >
              sthavir
            </span>
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
        Sthavir Vinjamuri | have a great {currentDay}!
      </footer>

      {/* Social Icons */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-4">
        <div
          className={`flex flex-col space-y-4 transition-all duration-1000 ${gravityActive ? "transform translate-y-[100vh] rotate-45" : ""}`}
        >
          <a href="/email" className="hover:text-red-500 transition-colors" aria-label="Email">
            <div className="w-10 h-10 flex items-center justify-center">
              <Mail size={24} />
            </div>
          </a>
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

      {/* Bio Modal */}
      {showBio && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
          onClick={() => setShowBio(false)}
        >
          <div
            className="bg-[#f0ead6] rounded-lg max-w-lg w-full p-8 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowBio(false)}
              className="absolute top-4 right-4 hover:text-red-500 transition-colors"
              aria-label="Close"
            >
              <X size={24} />
            </button>
            <div className="text-base leading-relaxed">
              <p>
                welcome to my website! i'm a senior at{" "}
                <a
                  href="https://tjhsst.fcps.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline hover:text-red-500 transition-colors"
                >
                  thomas jefferson high school for science and technology
                </a>
                , currently interested in computational genomics, population health, latin-language education reform, and sustainability in quantum chemistry.
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .f1-car {
          animation: raceAcrossReverse 10s ease-in-out infinite;
          animation-iteration-count: infinite;
          animation-delay: 0s;
          right: -50px;
        }

        @keyframes raceAcrossReverse {
          0%,
          66.67% {
            right: -50px;
            opacity: 0;
          }
          70% {
            opacity: 1;
          }
          100% {
            right: calc(100% + 50px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}
