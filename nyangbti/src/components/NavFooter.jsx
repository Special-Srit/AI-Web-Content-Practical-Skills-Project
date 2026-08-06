import { ArrowLeftRight, BookMarked, BookOpen, ClipboardCheck } from "lucide-react"
import { cn } from "@/lib/utils"

const items = [
  { id: "start", label: "검사", Icon: ClipboardCheck },
  { id: "records", label: "내 기록", Icon: BookMarked },
  { id: "compare", label: "비교", Icon: ArrowLeftRight, disabled: true },
  { id: "learn", label: "알아보기", Icon: BookOpen, disabled: true },
]

export function NavFooter({ active, onNavigate }) {
  return (
    <nav aria-label="주요 메뉴" className="fixed inset-x-0 bottom-0 z-20 border-t border-stone-200 bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur">
      <div className="mx-auto flex max-w-xl justify-around">
        {items.map(({ id, label, Icon, disabled }) => {
          const selected = active === id
          return <button key={id} type="button" disabled={disabled} aria-current={selected ? "page" : undefined} title={disabled ? "준비 중" : undefined} onClick={() => { if (!disabled) onNavigate(id) }} className={cn("flex min-h-12 min-w-12 flex-1 flex-col items-center justify-center gap-0.5 text-base text-stone-500", disabled && "cursor-not-allowed opacity-50", selected && "font-semibold text-stone-950")}>
            <span className={cn("flex h-7 w-7 items-center justify-center rounded-full bg-stone-100", selected && "ring-1 ring-stone-300")}><Icon size={18} strokeWidth={1.75} /></span>
            <span>{label}</span>
          </button>
        })}
      </div>
    </nav>
  )
}
