import { CalendarDays, CircleHelp, ShieldCheck, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { useMemo, useState } from "react"
import catPhoto from "@/assets/hero-cat.webp"
import { Shell } from "@/components/Shell"

function IconBadge({ children }) { return <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-600">{children}</span> }

export function S1({ resultCount, identityOpen, onIdentityChange, onStart, onRecords, onNavigate }) {
  return <Shell active="start" onNavigate={onNavigate}><div className="min-h-dvh bg-stone-50 px-4 pb-28 text-stone-950">
    <main className="mx-auto max-w-xl pt-7">
      <header className="flex items-center justify-between"><span className="text-xl font-semibold tracking-tight">냥BTI</span><span className="text-sm text-stone-500">4축 · 16유형</span></header>
      <section className="pt-10">
        <h1 className="text-[clamp(2.2rem,10vw,3.8rem)] font-semibold leading-[1.1] tracking-[-0.05em]">우리 고양이가<br />왜 그러는지</h1>
        <img src={catPhoto} alt="창가에서 편안하게 쉬고 있는 고양이" className="mt-7 h-[min(60vw,360px)] w-full rounded-3xl object-cover ring-1 ring-stone-200/80" />
      </section>
      <section className="pt-6 text-center">
        <Button type="button" className="w-full" onClick={() => onIdentityChange(true)}>검사 시작</Button>
        <p className="mt-4 text-base text-stone-500">회원가입 없음 · 약 3분 · 16문항</p>
      </section>
      <Separator className="my-8" />
      <section aria-label="검사 안내" className="space-y-5">
        <GuideRow icon={<CalendarDays size={21} strokeWidth={1.75} />} text="최근 일주일 관찰 기준" />
        <GuideRow icon={<CircleHelp size={21} strokeWidth={1.75} />} text="모르겠음 선택 가능" />
        <GuideRow icon={<ShieldCheck size={21} strokeWidth={1.75} />} text="결과는 이 기기에만 저장" />
      </section>
      {resultCount > 0 && <Button type="button" variant="secondary" className="mt-8 w-full" onClick={onRecords}>저장된 결과 {resultCount}건 보기</Button>}
    </main>
    <IdentitySheet open={identityOpen} onOpenChange={onIdentityChange} onStart={onStart} />
  </div></Shell>
}

function GuideRow({ icon, text }) { return <div className="flex items-center gap-4 text-base text-stone-600"><IconBadge>{icon}</IconBadge><span>{text}</span></div> }

function IdentitySheet({ open, onOpenChange, onStart }) {
  const [name, setName] = useState("")
  const cats = useMemo(() => { try { return JSON.parse(localStorage.getItem("nyangbti:v1:cats") || "[]") } catch { return [] } }, [open])
  return <Drawer open={open} onOpenChange={onOpenChange}><DrawerContent>
    <DrawerHeader className="flex flex-row items-start justify-between"><div><p className="mb-2 text-sm text-stone-500">검사 시작</p><DrawerTitle>어떤 고양이를<br />검사할까요?</DrawerTitle></div><DrawerClose asChild><Button type="button" variant="secondary" size="icon" aria-label="닫기"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-100"><X size={21} strokeWidth={1.75} /></span></Button></DrawerClose></DrawerHeader>
    <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-[calc(16px+env(safe-area-inset-bottom))]">
      {cats.length > 0 && <div className="mb-5 space-y-2"><p className="text-sm font-medium text-stone-600">기존 개체</p>{cats.map((cat) => <button key={cat.id} type="button" className="flex min-h-11 w-full items-center rounded-xl bg-stone-50 px-4 text-left text-base ring-1 ring-stone-200 hover:bg-stone-100" onClick={() => onStart(cat.name, cat.id)}>{cat.name}</button>)}</div>}
      <label className="block text-sm font-medium text-stone-600" htmlFor="cat-name">새 고양이 이름</label>
      <Input id="cat-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="예: 나비" autoComplete="off" className="mt-2" />
      <DrawerDescription className="mt-3 leading-6">이름은 이 기기의 검사 기록을 구분하는 데만 사용됩니다.</DrawerDescription>
      <Button type="button" className="mt-5 w-full" disabled={!name.trim()} onClick={() => onStart(name.trim())}>이 고양이로 시작</Button>
    </div>
  </DrawerContent></Drawer>
}
