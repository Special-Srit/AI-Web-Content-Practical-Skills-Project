import { ChevronDown, ExternalLink, Hand, HeartHandshake, Lightbulb, PackageOpen, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import catPhoto from "@/assets/hero-cat.webp"

function IconBadge({ children, className = "" }) { return <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-600 ${className}`}>{children}</span> }

export function S3({ result, type, isSaved = false, onSave, onBackToRecords }) {
  return <div className="min-h-dvh bg-stone-50 px-4 pb-28 text-stone-950">
    <main className="mx-auto max-w-xl pt-6">
      {onBackToRecords && <Button type="button" variant="ghost" className="-ml-3 mb-3 px-3" onClick={onBackToRecords}><span className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-100"><X size={18} strokeWidth={1.75} /></span>기록으로</Button>}
      {result.tentative && <div className="mb-4 rounded-xl bg-stone-100 px-4 py-3 text-sm leading-6 text-stone-600 ring-1 ring-stone-200">잠정 결과 · 모르겠음 {result.dontKnowCount}개로 계산했어요. 관찰이 더 쌓이면 다시 확인해 볼 수 있습니다.</div>}
      <section className="relative overflow-hidden rounded-3xl bg-white ring-1 ring-stone-200/80">
        <img src={catPhoto} alt="결과를 확인하는 고양이" className="h-56 w-full object-cover" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/80 to-transparent" />
        <div className="relative p-6 pt-5"><Badge>{result.typeCode}</Badge><h1 className="mt-3 text-[28px]/[34px] font-semibold tracking-[-0.04em]">{type.name}</h1><p className="mt-3 text-base leading-7 text-stone-600">{type.summary}</p></div>
      </section>
      <section className="mt-5 rounded-2xl bg-stone-50 p-5 ring-1 ring-stone-200/80 shadow-[0_2px_8px_-2px_rgb(28_25_23/0.08)]">
        <div className="grid grid-cols-3 divide-x divide-stone-200">
          {type.prescription.map((block) => <div key={block.label} className="px-3 text-center first:pl-0 last:pr-0"><IconBadge className="mx-auto"><PrescriptionIcon label={block.label} /></IconBadge><p className="mt-3 text-sm font-semibold text-stone-900">{block.label}</p>{block.priority && <p className="mt-1 text-xs font-medium text-stone-500">이것부터 1종</p>}</div>)}
        </div>
        <div className="mt-5 space-y-3 border-t border-stone-200 pt-4">{type.prescription.map((block) => <div key={`${block.label}-text`}><p className="text-sm font-semibold text-stone-800">{block.label}</p><p className="mt-1 text-sm leading-6 text-stone-600">{block.text}</p></div>)}</div>
      </section>
      <section className="mt-5 rounded-2xl bg-stone-50 p-5 ring-1 ring-stone-200/80"><h2 className="text-lg font-semibold">이럴 때는 잠시 줄여보세요</h2><ul className="mt-3 divide-y divide-stone-200">{type.prohibitions.map((item) => <li key={item} className="flex gap-3 py-3 text-base leading-7 text-stone-600 first:pt-0 last:pb-0"><IconBadge className="mt-1 h-8 w-8"><Hand size={17} strokeWidth={1.75} /></IconBadge><span>{item}</span></li>)}</ul></section>
      <Collapsible defaultOpen={false}>
        <section className="mt-5 overflow-hidden rounded-2xl bg-white ring-1 ring-stone-200/80"><CollapsibleTrigger><span className="flex min-h-12 w-full items-center justify-between px-5 text-left text-lg font-medium">유형 서사<span className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-100"><ChevronDown size={21} strokeWidth={1.75} /></span></span></CollapsibleTrigger><CollapsibleContent className="border-t border-stone-200 px-5 py-4 text-base leading-7 text-stone-600">{type.narrative}</CollapsibleContent></section>
      </Collapsible>
      <p className="mt-6 text-sm leading-6 text-stone-500">4축 16문항을 최근 일주일 관찰 기준으로 단순화한 결과예요.</p>
    </main>
    {!isSaved && <div className="fixed inset-x-0 bottom-0 z-10 bg-stone-50/95 px-4 pb-[calc(16px+env(safe-area-inset-bottom))] pt-3 backdrop-blur"><div className="mx-auto max-w-xl"><Button type="button" className="w-full" onClick={onSave}>결과 저장</Button></div></div>}
  </div>
}

function PrescriptionIcon({ label }) {
  if (label === "추천 놀이") return <Lightbulb size={21} strokeWidth={1.75} />
  if (label === "추천 장난감") return <PackageOpen size={21} strokeWidth={1.75} />
  return <HeartHandshake size={21} strokeWidth={1.75} />
}
