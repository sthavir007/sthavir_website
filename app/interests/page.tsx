import Link from "next/link"

export default function Interests() {
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
          <Link href="/awards" prefetch={true} className="underline hover:no-underline hover:text-red-500 transition-colors">
            awards
          </Link>
        </div>
      </header>

      <main className="px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl mb-8 text-center">interests</h1>

          <div className="text-lg leading-relaxed">
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="mr-3">•</span>
                <a
                  href="https://www.frontiersin.org/journals/cellular-neuroscience/articles/10.3389/fncel.2020.00171/full"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline hover:text-red-500 transition-colors"
                >
                  ophthalmology
                </a>
              </li>
              <li className="flex items-center">
                <span className="mr-3">•</span>
                <a
                  href="https://github.com/10XGenomics/cellranger"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline hover:text-red-500 transition-colors"
                >
                  computational genomics
                </a>
              </li>
              <li className="flex items-center">
                <span className="mr-3">•</span>
                <a
                  href="https://docs.google.com/document/d/1-fkoHSkkQf6mRMDMS4xp49RV51WZfw-3S-cBF41TXUA/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline hover:text-red-500 transition-colors"
                >
                  concerts should be banned @circus maximus
                </a>
              </li>
              <li className="flex items-center">
                <span className="mr-3">•</span>
                <a
                  href="https://www.youtube.com/watch?v=XjZ3N05lMo0&list=LL&index=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline hover:text-red-500 transition-colors"
                >
                  schrodinger time evolution
                </a>
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
                  href="https://www.gordonmurrayautomotive.com/automotive/t50"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline hover:text-red-500 transition-colors"
                >
                  gordon murray t.50
                </a>
              </li>
              <li className="flex items-start">
                <span className="mr-3">•</span>
                <span>
                  <a
                    href="https://www.youtube.com/watch?v=xCwwxNbtK6Y&pp=ygURY29icmEga2FpIHRyYWlsZXI%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:no-underline hover:text-red-500 transition-colors"
                  >
                    cobra kai
                  </a>
                  : "strike first, strike hard, no mercy"
                </span>
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
                <a
                  href="https://www.uffizi.it/en/artworks/the-tribune"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline hover:text-red-500 transition-colors"
                >
                  the tribune: bernardo buontalenti
                </a>
              </li>
              <li className="flex items-center">
                <span className="mr-3">•</span>
                <a
                  href="https://www.youtube.com/watch?v=3s0LTDhqe5A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline hover:text-red-500 transition-colors"
                >
                  my octopus teacher
                </a>
              </li>
              <li className="flex items-center">
                <span className="mr-3">•</span>
                <a
                  href="https://www.youtube.com/watch?v=rcQ_xZdzPBc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline hover:text-red-500 transition-colors"
                >
                  farzi
                </a>
              </li>
              <li className="flex items-center">
                <span className="mr-3">•</span>
                <a
                  href="https://www.youtube.com/@Waveform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline hover:text-red-500 transition-colors"
                >
                  wvfrm podcast
                </a>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
