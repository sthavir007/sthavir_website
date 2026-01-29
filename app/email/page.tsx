import Link from "next/link"

export default function Email() {
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
          <Link href="/interests" prefetch={true} className="underline hover:no-underline hover:text-red-500 transition-colors">
            interests
          </Link>
        </div>
      </header>

      <main className="px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl mb-8 text-center">emails</h1>

          <div className="space-y-8 text-base leading-relaxed">
            <div className="pb-6">
              <a href="mailto:sthavir007@gmail.com" className="text-lg font-semibold block mb-2 group">
                <span className="group-hover:text-red-500 transition-colors duration-200">sthavir007</span>
                <span className="text-gray-500 mx-1">[@]</span>
                <span>gmail.com</span>
              </a>
              <p className="italic text-gray-600">personal email</p>
            </div>

            <div className="pb-6">
              <a href="mailto:2026svinjamu@tjhsst.edu" className="text-lg font-semibold block mb-2 group">
                <span className="group-hover:text-red-500 transition-colors duration-200">2026svinjamu</span>
                <span className="text-gray-500 mx-1">[@]</span>
                <span>tjhsst.edu</span>
              </a>
              <p className="italic text-gray-600">school email (forwards to personal)</p>
            </div>

            <div className="pb-6">
              <a href="mailto:svinjamuri1@meei.harvard.edu" className="text-lg font-semibold block mb-2 group">
                <span className="group-hover:text-red-500 transition-colors duration-200">svinjamuri1</span>
                <span className="text-gray-500 mx-1">[@]</span>
                <span>meei.harvard.edu</span>
              </a>
              <p className="italic text-gray-600">work email</p>
            </div>

            <div className="pb-6">
              <a href="mailto:svinjam3@gmu.edu" className="text-lg font-semibold block mb-2 group">
                <span className="group-hover:text-red-500 transition-colors duration-200">svinjam3</span>
                <span className="text-gray-500 mx-1">[@]</span>
                <span>gmu.edu</span>
              </a>
              <p className="italic text-gray-600">work email</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
