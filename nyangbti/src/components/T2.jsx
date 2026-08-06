import { ArrowRight, ClipboardCheck, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shell } from "@/components/Shell"
import types from "@/content/types.json"

function typeName(typeCode) { return types[typeCode]?.name ?? typeCode }

export function T2({ results, onStart, onViewResult, onRetest, onNavigate }) {
  const latestByCat = Object.values(results.reduce((map, result) => { if (!map[result.catId]) map[result.catId] = []; map[result.catId].push(result); return map }, {})).map((items) => items.sort((a, b) => new Date(b.testedAt) - new Date(a.testedAt)))
  return <Shell active="records" onNavigate={onNavigate}><div className="min-h-dvh bg-stone-50 px-4 pb-28 text-stone-950"><main className="mx-auto max-w-xl pt-8"><header><p className="text-sm font-medium text-stone-500">냥BTI</p><h1 className="mt-2 text-[clamp(2.2rem,10vw,3.6rem)] font-semibold tracking-[-0.06em]">내 기록</h1></header>
    {latestByCat.length === 0 ? <EmptyRecords onStart={onStart} /> : <><section className="mt-8 divide-y divide-stone-200 overflow-hidden rounded-2xl bg-white px-5 ring-1 ring-stone-200/80">{latestByCat.map(([latest, ...previous]) => <article key={latest.catId} className="py-5 first:pt-5 last:pb-5"><div className="flex items-start justify-between gap-4"><div><h2 className="text-2xl font-semibold">{latest.catName}</h2><p className="mt-2 font-semibold text-stone-600">{typeName(latest.typeCode)} <span className="font-normal text-stone-400">· {latest.typeCode}</span></p><p className="mt-2 text-sm text-stone-500">검사일 {formatDate(latest.testedAt)}</p></div><Badge>{latest.tentative ? "잠정" : "최근"}</Badge></div>{previous[0] && <p className="mt-5 border-t border-stone-200 pt-4 text-sm text-stone-500">이전 검사: {typeName(previous[0].typeCode)} · {formatDate(previous[0].testedAt)}</p>}<div className="mt-5 grid grid-cols-2 gap-3"><Button type="button" variant="outline" onClick={() => onViewResult(latest)}><span className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-100"><ArrowRight size={18} strokeWidth={1.75} /></span>결과 보기</Button><Button type="button" variant="secondary" onClick={() => onRetest(latest)}><span className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-100"><RefreshCcw size={18} strokeWidth={1.75} /></span>재검사</Button></div></article>)}</section><p className="mt-5 text-sm text-stone-500">이 기기에만 저장됨</p></>}
  </main></div></Shell>
}

function EmptyRecords({ onStart }) { return <section className="mt-10 rounded-2xl bg-white p-6 ring-1 ring-stone-200/80"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-stone-100"><ClipboardCheck size={22} strokeWidth={1.75} /></div><h2 className="mt-5 text-xl font-semibold">아직 저장된 결과가 없습니다</h2><p className="mt-2 text-base leading-7 text-stone-600">고양이 한 마리를 먼저 검사하고 이 기기에 결과를 남겨보세요.</p><Button type="button" className="mt-6 w-full" onClick={onStart}>검사 시작</Button></section> }
function formatDate(value) { return new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(value)).replaceAll(" ", "") }
