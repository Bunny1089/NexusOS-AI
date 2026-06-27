import PageHeader from '../components/PageHeader'

function Resume() {
  return (
    <div className="space-y-8">
      <PageHeader title="Resume Analyzer" description="Get instant guidance on your CV, highlight gaps, and see a polished score." />
      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-[28px] border border-slate-800 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/40">
          <h2 className="text-xl font-semibold text-white">Latest review</h2>
          <div className="mt-6 space-y-4">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Resume quality</p>
              <p className="mt-3 text-4xl font-semibold text-cyan-300">82%</p>
              <p className="mt-2 text-slate-400">Good structure with recommendations for measurable impact and keywords.</p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Top opportunity</p>
              <h3 className="mt-2 text-xl font-semibold text-white">AI Product Intern</h3>
              <p className="mt-1 text-sm text-slate-400">Strengthen your project outcomes section with results.</p>
            </div>
          </div>
        </div>
        <div className="rounded-[28px] border border-slate-800 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/40">
          <h2 className="text-xl font-semibold text-white">Review summary</h2>
          <ul className="mt-6 space-y-3 text-slate-400">
            <li className="rounded-2xl bg-slate-900/80 p-4">Optimize accomplishments with metrics and clear action verbs.</li>
            <li className="rounded-2xl bg-slate-900/80 p-4">Align skills section with internship role language.</li>
            <li className="rounded-2xl bg-slate-900/80 p-4">Add a stronger header summary for academic impact.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Resume
