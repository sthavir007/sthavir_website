export default function Projects() {
  return (
    <div className="min-h-screen bg-white text-black font-mono">
      <header className="p-6">
        <div className="text-sm">
          <a href="/" className="underline hover:no-underline">
            sthavir.xyz
          </a>
        </div>
      </header>

      <main className="px-6 py-12">
        <div className="max-w-2xl">
          <h1 className="text-2xl mb-8">projects</h1>

          <div className="space-y-8 text-sm">
            <div>
              <h2 className="font-semibold mb-2">coming soon</h2>
              <p className="text-gray-600 leading-relaxed">
                i'm currently working on some exciting projects. check back soon to see what i've been building.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="fixed bottom-6 left-6 text-xs text-gray-600">Sthavir Vinjamuri</footer>
    </div>
  )
}
