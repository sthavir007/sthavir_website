import Link from "next/link"

export default function Awards() {
  return (
    <div className="min-h-screen bg-[#f0ead6] text-black font-sans">
      <header className="p-6 flex flex-wrap justify-between items-center gap-2">
        <div className="text-base shrink-0 mr-4">
          <Link href="/" prefetch={true} className="underline hover:no-underline hover:text-red-500 transition-colors">
            home
          </Link>
        </div>
        <div className="text-base flex flex-wrap gap-x-4 gap-y-2">
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

      <main className="px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl mb-8 text-center">awards</h1>

          <div className="text-lg leading-relaxed space-y-6">
            {/* Science Olympiads */}
            <div className="border-b border-gray-300 pb-4">
              <h2 className="font-semibold mb-2">Science</h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>
                    <a
                      href="https://www.usmdo.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:no-underline hover:text-red-500 transition-colors"
                    >
                      United States Medical & Disease Olympiad
                    </a>
                    {" "}– Top 6%,{" "}
                    <a
                      href="https://www.usmdo.org/results"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:no-underline hover:text-red-500 transition-colors"
                    >
                      Silver Medal
                    </a>
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>
                    <a
                      href="https://www.usabo-trc.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:no-underline hover:text-red-500 transition-colors"
                    >
                      USA Biology Olympiad
                    </a>
                    : 2025 Honorable Mention; 2024 Certificate of Merit
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>
                    <a
                      href="https://anatobee.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:no-underline hover:text-red-500 transition-colors"
                    >
                      Anato-Bee
                    </a>
                    : Local Champion, Finals: Southeast Regional Competition
                  </span>
                </li>
              </ul>
            </div>

            {/* Latin */}
            <div className="border-b border-gray-300 pb-4">
              <h2 className="font-semibold mb-2">Latin</h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>
                    <a
                      href="https://www.nle.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:no-underline hover:text-red-500 transition-colors"
                    >
                      National Latin Exam
                    </a>
                    {" "}(Gold)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>
                    <a
                      href="https://www.njcl.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:no-underline hover:text-red-500 transition-colors"
                    >
                      National Jr Classical League Exams
                    </a>
                    {" "}[Gold Top-10%/2500]: Roman Civilization (Gold), Vocabulary (Silver), Etymology (Silver)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>
                    <a
                      href="https://medusaexam.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:no-underline hover:text-red-500 transition-colors"
                    >
                      National Medusa Mythology Exam
                    </a>
                    {" "}[Top 20%/2000+] (Silver 2x)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>
                    <a
                      href="https://virginiajcl.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:no-underline hover:text-red-500 transition-colors"
                    >
                      Virginia Jr Classical League
                    </a>
                    {" "}[Top 10/300+] in Pentathlon, Mythology, Derivatives, Reading Comprehension, Vocabulary
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>
                    <a
                      href="https://www.cavclassics.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:no-underline hover:text-red-500 transition-colors"
                    >
                      Classical Association of Virginia
                    </a>
                    : State Cum Laude in Grammar/Translation
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>VJCL State Art Awards: Sculpture (1st, Zeus), Mapmaking (2nd, Ulysses' Journey), Photo (3rd, Roman Forum)</span>
                </li>
              </ul>
            </div>

            {/* Academic */}
            <div className="border-b border-gray-300 pb-4">
              <h2 className="font-semibold mb-2">Academic</h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>
                    <a
                      href="https://www.nationalmerit.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:no-underline hover:text-red-500 transition-colors"
                    >
                      National Merit Commended Scholar
                    </a>
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">•</span>
                  <span>
                    <a
                      href="https://apstudents.collegeboard.org/awards-recognitions/ap-scholar-awards"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:no-underline hover:text-red-500 transition-colors"
                    >
                      AP Scholar with Distinction
                    </a>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
