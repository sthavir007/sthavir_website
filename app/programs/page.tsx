import Link from "next/link"

export default function Programs() {
  return (
    <div className="min-h-screen bg-[#f0ead6] text-black font-sans">
      <header className="p-6 flex justify-between items-center gap-4">
        <div className="text-sm md:text-base shrink-0">
          <Link href="/" prefetch={true} className="underline hover:no-underline hover:text-red-500 transition-colors">
            home
          </Link>
        </div>
        <div className="text-sm md:text-base flex gap-x-3 md:gap-x-4">
          <Link href="/research" prefetch={true} className="underline hover:no-underline hover:text-red-500 transition-colors">
            research
          </Link>
          <Link href="/interests" prefetch={true} className="underline hover:no-underline hover:text-red-500 transition-colors">
            interests
          </Link>
        </div>
      </header>

      <main className="px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl mb-8 text-center">programs</h1>

          <div className="text-lg leading-relaxed space-y-6">
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
                <p className="text-gray-600 text-base">
                  An intensive program at Harvard Medical School focused on single-cell RNA sequencing analysis. I processed large-scale gene expression datasets using the O2 high-performance computing cluster and learned computational pipelines including Cell Ranger and Seurat for single-cell transcriptomics.
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
                <p className="text-gray-600 text-base">
                  A research internship at George Mason University where students work alongside faculty mentors on original projects. I built spatial analysis models using ArcGIS to map urban heat vulnerability and cooling center access across New York City neighborhoods.
                </p>
              </div>

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
                <p className="text-gray-600 text-base">
                  A research group at Harvard University and The University of Texas at Austin that develops computational methods for analyzing classical Latin and Greek texts. The lab applies natural language processing and machine learning to study stylistic patterns, authorship attribution, and linguistic evolution across ancient literature.
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
                <p className="text-gray-600 text-base">
                  A program hosted by the 1517 Fund for teens interested in entrepreneurship and unconventional education. Activities included visiting early-stage startups, attending workshops on practical skills such as lockpicking and sword-fighting, and participating in discussions on alternative paths to building companies.
                </p>
              </div>
          </div>
        </div>
      </main>
    </div>
  )
}
