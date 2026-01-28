"use client"

export default function Programs() {
  return (
    <div className="min-h-screen bg-[#f0ead6] text-black font-sans">
      <header className="p-6 flex justify-between items-center">
        <div className="text-sm">
          <a href="/" className="underline hover:no-underline hover:text-red-500 transition-colors">
            home
          </a>
        </div>
        <div className="text-sm flex space-x-4">
          <a href="/research" className="underline hover:no-underline hover:text-red-500 transition-colors">
            research
          </a>
          <a href="/awards" className="underline hover:no-underline hover:text-red-500 transition-colors">
            awards
          </a>
          <a href="/interests" className="underline hover:no-underline hover:text-red-500 transition-colors">
            interests
          </a>
        </div>
      </header>

      <main className="px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl mb-8 text-center">programs</h1>

          <div className="text-base leading-relaxed">
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="mr-3">•</span>
                <span>
                  <a
                    href="https://bnv-lab.org/summer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:no-underline hover:text-red-500 transition-colors"
                  >
                    Baranov Lab: Single-cell Bioinformatics Summer School
                  </a>
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3">•</span>
                <span>
                  <a
                    href="https://science.gmu.edu/assip"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:no-underline hover:text-red-500 transition-colors"
                  >
                    Aspiring Scientists Summer Internship Program
                  </a>
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3">•</span>
                <span>
                  <a
                    href="https://www.1517fund.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:no-underline hover:text-red-500 transition-colors font-bold"
                  >
                    1517 Fund
                  </a>{" "}
                  <a
                    href="https://1517.smapply.us/prog/2e2025/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:no-underline hover:text-red-500 transition-colors"
                  >
                    2e Camp
                  </a>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
