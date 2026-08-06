export const AXES = [
  { id: "neuroticism", high: "N", low: "C", gentle: "C" },
  { id: "extraversion", high: "E", low: "I", gentle: "I" },
  { id: "dominance", high: "D", low: "G", gentle: "G" },
  { id: "impulsiveness", high: "P", low: "T", gentle: "T" },
]

export function scoreAnswers(questions, answers) {
  const byId = new Map(answers.map((answer) => [answer.questionId, answer.optionId]))
  const axisScores = {}
  const letters = []
  let insufficientAxis = false

  AXES.forEach((axis) => {
    const counts = { high: 0, low: 0 }
    questions.filter((question) => question.axisId === axis.id).forEach((question) => {
      const optionId = byId.get(question.id)
      const poleId = question.options.find((option) => option.id === optionId)?.poleId
      if (poleId === "high" || poleId === "low") counts[poleId] += 1
    })
    if (counts.high + counts.low < 3) insufficientAxis = true
    axisScores[axis.id] = Math.max(counts.high, counts.low)
    letters.push(counts.high > counts.low ? axis.high : counts.low > counts.high ? axis.low : axis.gentle)
  })

  const dontKnowCount = answers.reduce((count, answer) => {
    const question = questions.find((item) => item.id === answer.questionId)
    const option = question?.options.find((item) => item.id === answer.optionId)
    return count + (option?.poleId === null ? 1 : 0)
  }, 0)
  return { typeCode: letters.join(""), axisScores, dontKnowCount, tentative: dontKnowCount > 4 || insufficientAxis }
}
