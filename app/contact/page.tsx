export default function Contact() {
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
          <h1 className="text-2xl mb-8">contact</h1>

          <div className="space-y-6 text-sm leading-relaxed">
            <p>
              feel free to reach out if you'd like to chat about technology, collaborate on a project, or just say
              hello.
            </p>

            <div>
              <p className="mb-2">email:</p>
              <a href="mailto:sthavir007@gmail.com" className="underline hover:no-underline">
                sthavir007@gmail.com
              </a>
            </div>
          </div>
        </div>
      </main>

      <footer className="fixed bottom-6 left-6 text-xs text-gray-600">Sthavir Vinjamuri</footer>
    </div>
  )
}
