import { useEffect, useMemo, useState } from "react"
import questions from "@/content/questions.json"
import types from "@/content/types.json"
import { scoreAnswers } from "@/lib/scoring"
import { clearSession, createCatId, getResults, saveResult, saveSession } from "@/lib/storage"
import { S1 } from "@/components/S1"
import { S2 } from "@/components/S2"
import { S3 } from "@/components/S3"
import { S3c } from "@/components/S3c"
import { T2 } from "@/components/T2"
import { Shell } from "@/components/Shell"

function replaceStep(screen) { window.history.replaceState({ screen }, "", window.location.href) }

export default function App() {
  const [screen, setScreen] = useState("start")
  const [identityOpen, setIdentityOpen] = useState(false)
  const [session, setSession] = useState(null)
  const [result, setResult] = useState(null)
  const [saveOpen, setSaveOpen] = useState(false)
  const [saveError, setSaveError] = useState("")
  const [results, setResults] = useState(() => getResults())
  const [fromRecords, setFromRecords] = useState(false)

  useEffect(() => {
    window.history.replaceState({ screen: "start" }, "", window.location.href)
    const onPopState = () => setScreen(window.history.state?.screen === "records" ? "records" : "start")
    window.addEventListener("popstate", onPopState)
    return () => window.removeEventListener("popstate", onPopState)
  }, [])

  const type = useMemo(() => result ? types[result.typeCode] : null, [result])
  const go = (nextScreen) => { replaceStep(nextScreen); setScreen(nextScreen) }

  function beginIdentity() { setIdentityOpen(true) }
  function startQuiz(name, existingId) {
    const nextSession = { catId: existingId || createCatId(), catName: name, index: 0, answers: [], dontKnowCount: 0 }
    saveSession(nextSession); setSession(nextSession); setResult(null); setFromRecords(false); setIdentityOpen(false); replaceStep("quiz"); setScreen("quiz")
  }
  function goBackToStart() { clearSession(); setIdentityOpen(false); setSession(null); go("start") }
  function chooseAnswer(optionId) {
    setSession((current) => current ? { ...current, answers: [...current.answers.slice(0, current.index), { questionId: questions[current.index].id, optionId }] } : current)
  }
  const isUnknownAnswer = (answer) => answer?.optionId?.endsWith("-unknown")
  function nextQuestion() {
    if (!session) return
    const selected = session.answers[session.index]
    if (!selected) return
    const answers = [...session.answers]
    const next = { ...session, answers, dontKnowCount: answers.filter(isUnknownAnswer).length }
    if (session.index === questions.length - 1) {
      const scored = scoreAnswers(questions, answers)
      const completed = { ...next, ...scored, id: `result-${Date.now()}`, catName: session.catName, catId: session.catId, testedAt: new Date().toISOString() }
      clearSession(); setSession(null); setResult(completed); setFromRecords(false); replaceStep("result"); setScreen("result"); return
    }
    next.index += 1; next.dontKnowCount = answers.filter(isUnknownAnswer).length
    saveSession(next); setSession(next); replaceStep("quiz")
  }
  function previousQuestion() {
    if (!session || session.index === 0) { goBackToStart(); return }
    const next = { ...session, index: session.index - 1 }
    saveSession(next); setSession(next); replaceStep("quiz")
  }
  function commitResult(name) {
    const saved = saveResult({ ...result, catName: name })
    if (!saved.ok) {
      setSaveError("저장하지 못했어요. 브라우저 저장 공간을 확인한 뒤 다시 시도해 주세요.")
      setSaveOpen(true)
      return
    }
    setResults(saved.results); setResult({ ...result, catName: name }); setSaveError(""); setSaveOpen(false); setFromRecords(false); go("records")
  }
  function viewSavedResult(saved) { setResult(saved); setFromRecords(true); go("result") }
  function retest() { setFromRecords(false); setIdentityOpen(true); go("start") }
  function navigate(destination) {
    if (destination === "records") { setResults(getResults()); setFromRecords(false); go("records") }
    if (destination === "start") { setIdentityOpen(false); setFromRecords(false); go("start") }
  }

  if (screen === "quiz" && session) return <S2 question={questions[session.index]} index={session.index} total={questions.length} selected={session.answers[session.index]?.optionId ?? ""} dontKnowCount={session.answers.filter(isUnknownAnswer).length} onSelect={chooseAnswer} onNext={nextQuestion} onBack={previousQuestion} />
  if (screen === "result" && result && type) return <>{fromRecords ? <Shell active="records" onNavigate={navigate}><S3 result={result} type={type} isSaved onSave={() => { setSaveError(""); setSaveOpen(true) }} onBackToRecords={() => navigate("records")} /></Shell> : <S3 result={result} type={type} onSave={() => { setSaveError(""); setSaveOpen(true) }} />}<S3c open={saveOpen} defaultName={result.catName} error={saveError} onOpenChange={(open) => { setSaveOpen(open); if (!open) setSaveError("") }} onSave={commitResult} /></>
  if (screen === "records") return <T2 results={results} onStart={() => { setIdentityOpen(true); go("start") }} onViewResult={viewSavedResult} onRetest={retest} onNavigate={navigate} />
  return <S1 resultCount={results.length} identityOpen={identityOpen} onIdentityChange={setIdentityOpen} onStart={startQuiz} onRecords={() => navigate("records")} onNavigate={navigate} />
}
