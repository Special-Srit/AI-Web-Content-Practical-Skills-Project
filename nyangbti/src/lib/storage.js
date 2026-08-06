const KEYS = { cats: "nyangbti:v1:cats", session: "nyangbti:v1:session", results: "nyangbti:v1:results" }

function read(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback }
}
function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return { ok: true, value }
  } catch (error) {
    return { ok: false, error }
  }
}
function normalizeAnswers(answers = []) {
  return answers.map(({ questionId, optionId }) => ({ questionId, optionId }))
}

export const getCats = () => read(KEYS.cats, [])
export const getSession = () => read(KEYS.session, null)
export const getResults = () => read(KEYS.results, [])
export const saveSession = (session) => write(KEYS.session, { ...session, answers: normalizeAnswers(session.answers) })
export function clearSession() {
  try {
    localStorage.removeItem(KEYS.session)
    return { ok: true }
  } catch (error) {
    return { ok: false, error }
  }
}

export function saveResult(result) {
  const storedResult = { ...result, answers: normalizeAnswers(result.answers) }
  const storedResults = getResults().filter((item) => item.id !== storedResult.id)
  const existing = storedResults.filter((item) => item.catId !== storedResult.catId)
  const previous = storedResults.filter((item) => item.catId === storedResult.catId).sort((a, b) => new Date(b.testedAt) - new Date(a.testedAt)).slice(0, 1)
  const results = [...existing, ...previous, storedResult].sort((a, b) => new Date(b.testedAt) - new Date(a.testedAt))
  const resultsWrite = write(KEYS.results, results)
  if (!resultsWrite.ok) return resultsWrite
  const cats = getCats().filter((cat) => cat.id !== storedResult.catId)
  const catsWrite = write(KEYS.cats, [...cats, { id: storedResult.catId, name: storedResult.catName, createdAt: storedResult.testedAt }])
  if (!catsWrite.ok) return catsWrite
  const sessionClear = clearSession()
  if (!sessionClear.ok) return sessionClear
  return { ok: true, results }
}

export function createCatId() { return `cat-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` }
