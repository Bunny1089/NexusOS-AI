import PageHeader from '../components/PageHeader'

const exams = [
  { name: 'Machine Learning', date: 'Jul 10', readiness: 84 },
  { name: 'Career Strategy', date: 'Jul 14', readiness: 66 },
  { name: 'Interview Practice', date: 'Jul 18', readiness: 72 },
]

function Exams() {
  return (
    <div className="space-y-8">
      <PageHeader title="Exams Hub" description="Track exam readiness and see the next outcomes for every focus area." />
      <div className="grid gap-6 xl:grid-cols-3">
        {exams.map((exam) => (
          <div key={exam.name} className="rounded-[28px] border border-slate-800 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/40">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">{exam.date}</p>
            <h3 className="mt-4 text-2xl font-semibold text-white">{exam.name}</h3>
            <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-sky-600" style={{ width: `${exam.readiness}%` }} />
            </div>
            <p className="mt-4 text-sm text-slate-400">Readiness {exam.readiness}%</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Exams
