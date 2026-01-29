"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState, type ReactNode } from "react"

interface PageTransitionProps {
  children: ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [displayChildren, setDisplayChildren] = useState(children)
  const [transitionStage, setTransitionStage] = useState("fadeIn")

  useEffect(() => {
    if (children !== displayChildren) {
      setTransitionStage("fadeOut")
    }
  }, [children, displayChildren])

  const handleTransitionEnd = () => {
    if (transitionStage === "fadeOut") {
      setDisplayChildren(children)
      setTransitionStage("fadeIn")
    }
  }

  return (
    <div
      className={`transition-all duration-300 ease-in-out ${
        transitionStage === "fadeOut" 
          ? "opacity-0 scale-[0.98] blur-sm" 
          : "opacity-100 scale-100 blur-0"
      }`}
      onTransitionEnd={handleTransitionEnd}
    >
      {displayChildren}
    </div>
  )
}
