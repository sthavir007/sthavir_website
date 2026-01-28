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

          <div className="text-base leading-relaxed space-y-6">
              <div className="border-b border-gray-300 pb-4">
                <h2 className="font-semibold mb-1">
                  <a
                    href="https://www.qcrit.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:no-underline hover:text-red-500 transition-colors"
                  >
                    Quantitative Criticism Lab
                  </a>
                </h2>
                <p className="text-gray-600 text-sm">
                  A research collective at UT Austin rethinking how we read ancient texts. They build computational tools to analyze Latin and Greek literature at scale—tracking stylistic patterns, authorship signals, and linguistic shifts that would take lifetimes to uncover by hand.
                </p>
              </div>

              <div className="border-b border-gray-300 pb-4">
                <h2 className="font-semibold mb-1">
                  <a
                    href="https://bnv-lab.org/summer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:no-underline hover:text-red-500 transition-colors"
                  >
                    Baranov Lab: Single-cell Bioinformatics Summer School
                  </a>
                </h2>
                <p className="text-gray-600 text-sm">
                  Two weeks of wrangling single-cell RNA-seq data on Harvard's O2 supercomputer. Think terabytes of gene expression matrices, custom pipelines, and learning to speak fluent Seurat while your laptop quietly overheats.
                </p>
              </div>

              <div className="border-b border-gray-300 pb-4">
                <h2 className="font-semibold mb-1">
                  <a
                    href="https://science.gmu.edu/assip"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:no-underline hover:text-red-500 transition-colors"
                  >
                    Aspiring Scientists Summer Internship Program
                  </a>
                </h2>
                <p className="text-gray-600 text-sm">
                  Eight weeks embedded with GMU faculty doing real research. Spent my time building spatial analysis models in ArcGIS, mapping urban heat vulnerability across NYC neighborhoods and figuring out which census tracts are quietly cooking.
                </p>
              </div>

              <div className="border-b border-gray-300 pb-4">
                <h2 className="font-semibold mb-1">
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
                </h2>
                <p className="text-gray-600 text-sm">
                  A week-long deep dive into the weird and wonderful world of building things. Toured early-stage startups, picked locks (legally), learned sword-fighting basics, and had too many conversations about why dropping out isn't always a bad idea.
                </p>
              </div>
          </div>
        </div>
      </main>
    </div>
  )
}
