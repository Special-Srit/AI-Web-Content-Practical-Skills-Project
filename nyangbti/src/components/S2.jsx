import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function S2({ question, index, total, selected, dontKnowCount, onSelect, onNext, onBack }) {
  const value = selected === null || selected === undefined ? "" : selected
  return <div className="min-h-dvh bg-stone-50 px-4 pb-28 text-stone-950">
    <main className="mx-auto max-w-xl pt-5">
      <header className="flex min-h-11 items-center justify-between"><Button type="button" variant="ghost" className="-ml-3 px-3" onClick={onBack}><span className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-100"><ArrowLeft size={19} strokeWidth={1.75} /></span>뒤로</Button><span className="text-base font-medium text-stone-600" aria-current="step">{index + 1}/{total}</span><span className="w-16" /></header>
      <Progress value={((index + 1) / total) * 100} aria-label="검사 진행률" className="mt-4" />
      <section className="pt-12"><p className="text-sm font-medium text-stone-500">최근 일주일 관찰</p><h1 className="mt-3 text-[clamp(1.8rem,7vw,2.5rem)] font-semibold leading-[1.25] tracking-[-0.04em]">{question.text}</h1></section>
      <RadioGroup value={value} onValueChange={onSelect} className="mt-9 space-y-3">
        {question.options.map((option, optionIndex) => <label key={option.id} htmlFor={option.id} className={`flex min-h-11 items-center gap-4 rounded-2xl px-5 py-3 text-base leading-6 ring-1 transition-colors ${optionIndex === question.options.length - 1 ? "mt-5 bg-stone-100/80 ring-stone-200" : "bg-white ring-stone-200/80"} ${value === option.id ? "ring-2 ring-stone-400/30" : "hover:bg-stone-100"}`}>
          <RadioGroupItem id={option.id} value={option.id} />
          <span>{option.label}</span>
        </label>)}
      </RadioGroup>
      <p className="mt-7 text-center text-sm text-stone-500">모르겠음 {dontKnowCount}개 <span className="text-stone-400">(허용 4개)</span></p>
    </main>
    <div className="fixed inset-x-0 bottom-0 z-10 bg-stone-50/95 px-4 pb-[calc(16px+env(safe-area-inset-bottom))] pt-3 backdrop-blur"><div className="mx-auto max-w-xl"><Button type="button" className="w-full" disabled={!value} onClick={onNext}>다음</Button></div></div>
  </div>
}
