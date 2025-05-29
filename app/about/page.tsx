export default function About() {
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
          <h1 className="text-2xl mb-8">about</h1>

          <div className="space-y-6 text-sm leading-relaxed">
            <p>i'm sthavir, a passionate software engineer with a love for creating meaningful digital experiences.</p>

            <p>
              when i'm not coding, you can find me exploring new technologies, reading about the latest developments in
              tech, or working on side projects that solve real-world problems.
            </p>

            <p>i believe in the power of simple, elegant solutions and clean code that makes a difference.</p>
          </div>
        </div>
      </main>

      <footer className="fixed bottom-6 left-6 text-xs text-gray-600">Sthavir Vinjamuri</footer>
    </div>
  )
}
