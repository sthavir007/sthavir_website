"use client"

export default function Interests() {
  return (
    <div className="min-h-screen bg-[#f0ead6] text-black font-sans">
      <header className="p-6 flex justify-between items-center">
        <div className="text-sm">
          <a href="/" className="underline hover:no-underline hover:text-red-500 transition-colors">
            home
          </a>
        </div>
        <div className="text-sm">
          <a href="/research" className="underline hover:no-underline hover:text-red-500 transition-colors">
            research
          </a>
        </div>
      </header>

      <main className="px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl mb-8 text-center">interests</h1>

          <div className="text-base leading-relaxed">
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="mr-3">•</span>
                ophthalmology
              </li>
              <li className="flex items-center">
                <span className="mr-3">•</span>
                concerts should be banned @circus maximus
              </li>
              <li className="flex items-center">
                <span className="mr-3">•</span>
                <span>
                  <a
                    href="https://www.amazon.com/Riftwar-Saga-Raymond-Feist/dp/0553333240?sr=8-1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:no-underline hover:text-red-500 transition-colors"
                  >
                    the riftwar saga
                  </a>{" "}
                  <span className="text-green-700">by raymond e. feist</span>
                </span>
              </li>
              <li className="flex items-center">
                <span className="mr-3">•</span>
                <span>
                  <a
                    href="https://www.amazon.com/Here-Eternity-Touching-Death-Living/dp/0393249891"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:no-underline hover:text-red-500 transition-colors"
                  >
                    from here to eternity
                  </a>{" "}
                  <span className="text-green-700">by caitlin doughty</span>
                </span>
              </li>
              <li className="flex items-center">
                <span className="mr-3">•</span>
                <a
                  href="https://open.spotify.com/track/2cYqizR4lgvp4Qu6IQ3qGN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline hover:text-red-500 transition-colors"
                >
                  butterfly effect
                </a>
              </li>
              <li className="flex items-center">
                <span className="mr-3">•</span>
                desk setups for productivity
              </li>
              <li className="flex items-center">
                <span className="mr-3">•</span>
                <a
                  href="https://monkeytype.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline hover:text-red-500 transition-colors"
                >
                  monkeytype
                </a>
              </li>
              <li className="flex items-center">
                <span className="mr-3">•</span>
                <a
                  href="https://apple.fandom.com/wiki/Mac_Pro_(2nd_generation)"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline hover:text-red-500 transition-colors"
                >
                  mac trash can
                </a>
              </li>
              <li className="flex items-center">
                <span className="mr-3">•</span>
                gordon murray t.50
              </li>
              <li className="flex items-center">
                <span className="mr-3">•</span>
                cobra kai: "strike first, strike hard, no mercy"
              </li>
              <li className="flex items-center">
                <span className="mr-3">•</span>
                black dal and jackfruit biryani @{" "}
                <a
                  href="https://www.dishoom.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline hover:text-red-500 transition-colors"
                >
                  dishoom
                </a>
              </li>
              <li className="flex items-center">
                <span className="mr-3">•</span>
                <span className="text-red-600">red</span>&nbsp;is cool
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
