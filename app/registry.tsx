"use client"

import { useState, type ReactNode } from "react"
import { useServerInsertedHTML } from "next/navigation"
import { StyleRegistry, createStyleRegistry } from "styled-jsx"

/** sends styled-jsx styles with the server html, so the page never paints unstyled */
export default function StyledJsxRegistry({ children }: { children: ReactNode }) {
  const [registry] = useState(() => createStyleRegistry())

  useServerInsertedHTML(() => {
    const styles = registry.styles()
    registry.flush()
    return <>{styles}</>
  })

  return <StyleRegistry registry={registry}>{children}</StyleRegistry>
}
