"use client"

import { useState } from "react"
import { X } from "lucide-react"

export default function Research() {
  const [activePoster, setActivePoster] = useState<string | null>(null)

  const posters = {
    fmrca: "https://drive.google.com/file/d/1KoQhtUwfeXGaqtQOWsXeJzSgqJTj65X-/preview",
    cooling: "https://drive.google.com/file/d/17IWzsNp6DymwVHrSg6r1SOhmUTX0PK_x/preview",
  }

  return (
    <div className="min-h-screen bg-[#f0ead6] text-black font-sans">
      <header className="p-6 flex justify-between items-center">
        <div className="text-sm">
          <a href="/" className="hover:text-red-500 transition-colors">
            home
          </a>
        </div>
        <div className="text-sm flex space-x-4">
          <a href="/programs" className="underline hover:no-underline hover:text-red-500 transition-colors">
            programs
          </a>
          <a href="/interests" className="underline hover:no-underline hover:text-red-500 transition-colors">
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
                  className="underline hover:text-red-500 transition-colors"
                >
                  Single-cell transcriptome of retinal myeloid cells in response to transplantation of human neurons
                  reveals reversibility of microglial activation
                </a>
              </h2>
              <p className="text-gray-600 mb-2">Preprint on bioRxiv</p>
              <p className="text-gray-600 mb-2">Paper publishing to Molecular Therapy</p>
              <p className="text-gray-600 mb-2">Poster accepted to 2025 Children's Tumor Foundation NF Conference</p>
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
                  className="underline hover:text-red-500 transition-colors"
                >
                  A Comprehensive Exploration of Digital Twinning in Spine Surgery
                </a>
              </h2>
              <p className="text-gray-600 mb-2">Published in Clinical Spine Surgery</p>
              <p className="text-gray-600 mb-2">
                Poster presented at Congress of Neurological Surgeons Conference, Houston, TX. October 2024
              </p>
              <p className="leading-relaxed">
                This study explores the application of digital twin technology in spine surgery, examining how virtual
                replicas of patients can enhance surgical planning, improve outcomes, and reduce complications through
                advanced modeling and simulation techniques.
              </p>
            </div>

            <div className="border-b border-gray-300 pb-6">
              <h2 className="text-lg font-semibold mb-3">
                <button
                  onClick={() => setActivePoster("fmrca")}
                  className="underline hover:text-red-500 transition-colors text-left"
                >
                  fMRCA: Fetal Mouse Single Cell Retina Atlas for Reconstructing Cell Fate during Development
                </button>
              </h2>
              <p className="text-gray-600 mb-2">Poster presented at TJHSST Science and Engineering Fair</p>
              <p className="leading-relaxed">
                This research develops a comprehensive single-cell RNA sequencing atlas of mouse retinal cells across
                developmental stages (E11 to P14), providing researchers with a platform for investigating changes in
                intrinsic retinal genetic heterogeneity and extrinsic cell-cell interactions over time to improve
                retinal organoid modeling for disease research.
              </p>
            </div>

            <div className="border-b border-gray-300 pb-6">
              <h2 className="text-lg font-semibold mb-3">
                <button
                  onClick={() => setActivePoster("cooling")}
                  className="underline hover:text-red-500 transition-colors text-left"
                >
                  Cooling Center Access in New York City
                </button>
              </h2>
              <p className="text-gray-600 mb-2">Poster presented at 2025 ASSIP Poster Fair</p>
              <p className="leading-relaxed">
                This project applies a spatial mismatch framework to quantify where heat hazard exceeds cooling access
                in New York City, integrating FEMA NRI metrics, cooling-access measures, and demographic data to
                identify high-risk, low-access clusters and produce actionable targets for equitable cooling center
                placement.
              </p>
            </div>
          </div>
        </div>
      </main>

      {activePoster && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setActivePoster(null)}
        >
          <div
            className="bg-white rounded-lg w-full max-w-6xl h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">
                {activePoster === "fmrca"
                  ? "fMRCA: Fetal Mouse Single Cell Retina Atlas"
                  : "Cooling Center Access in New York City"}
              </h3>
              <button
                onClick={() => setActivePoster(null)}
                className="hover:text-red-500 transition-colors"
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <iframe
                src={posters[activePoster as keyof typeof posters]}
                className="w-full h-full"
                title="Poster Viewer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
