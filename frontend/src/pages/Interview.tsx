import PageHeader from '../components/PageHeader'

const coachingTips = [
  'Practice concise STAR stories.',
  'Use research examples to show impact.',
  'Ask thoughtful project-focused questions.',
]

function Interview() {
  return (
    <div className="space-y-8">
      <PageHeader title="Interview Coach" description="Refine your interview presence with smart prompts, sample answers, and coaching insights." />

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[28px] border border-slate-800 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/40">
          <h2 className="text-xl font-semibold text-white">Coaching quick-start</h2>
          <ul className="mt-6 space-y-3 text-slate-400">
            {coachingTips.map((tip) => (
              <li key={tip} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-4">{tip}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-[28px] border border-slate-800 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/40">
          <h2 className="text-xl font-semibold text-white">Live readiness</h2>
          <p className="mt-4 text-slate-400">Your interview coach is preparing questions matched to your resume and role target.</p>
          <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Next action</p>
            <p className="mt-3 text-lg font-semibold text-white">Review 3 behavioral scenarios.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Interview
