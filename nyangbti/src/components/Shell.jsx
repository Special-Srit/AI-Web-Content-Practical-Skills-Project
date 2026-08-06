import { NavFooter } from "@/components/NavFooter"

export function Shell({ active, onNavigate, children }) {
  return <>
    {children}
    <NavFooter active={active} onNavigate={onNavigate} />
  </>
}
