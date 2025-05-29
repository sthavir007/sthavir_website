export default function Research() {
  return (
    <div className="min-h-screen bg-[#f0ead6] text-black font-mono">
      <header className="p-6 flex justify-between items-center">
        <div className="text-sm">
          <a href="/" className="underline hover:no-underline">
            sthavir.xyz
          </a>
        </div>
        <div className="text-sm">
          <a href="/interests" className="underline hover:no-underline">
            interests
          </a>
        </div>
      </header>

      <main className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl mb-8 text-center">research</h1>

          <div className="text-sm leading-relaxed space-y-8">
            <div className="border-b border-gray-300 pb-6">
              <h2 className="text-lg font-semibold mb-3">
                <a
                  href="https://www.biorxiv.org/content/10.1101/2025.05.16.654622v1.full"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline"
                >
                  Single-cell transcriptome of retinal myeloid cells in response to transplantation of human neurons
                  reveals reversibility of microglial activation
                </a>
              </h2>
              <p className="text-gray-600 mb-2">Preprint on bioRxiv</p>
              <p className="leading-relaxed">
                This research investigates the cellular responses of retinal myeloid cells following human neuron
                transplantation, using single-cell RNA sequencing to reveal the dynamic and reversible nature of
                microglial activation in the context of retinal regenerative therapies.
              </p>
            </div>

            <div className="border-b border-gray-300 pb-6">
              <h2 className="text-lg font-semibold mb-3">
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/39629824/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline"
                >
                  A Comprehensive Exploration of Digital Twinning in Spine Surgery
                </a>
              </h2>
              <p className="text-gray-600 mb-2">Published in Clinical Spine Surgery</p>
              <p className="leading-relaxed">
                This study explores the application of digital twin technology in spine surgery, examining how virtual
                replicas of patients can enhance surgical planning, improve outcomes, and reduce complications through
                advanced modeling and simulation techniques.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
