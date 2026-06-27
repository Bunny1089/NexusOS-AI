import PageHeader from '../components/PageHeader'

const recommendations = [
  { title: 'Research Assistant Role', status: 'High fit' },
  { title: 'AI Product Internship', status: 'Matching' },
  { title: 'Campus DevOps Program', status: 'Consider' },
]

function Career() {
  return (
    <div className="space-y-8">
      <PageHeader title="Career Hub" description="Explore guided career recommendations and internship pathways driven by intelligent signals." />
      <div className="grid gap-6 xl:grid-cols-3">
        {recommendations.map((opportunity) => (
          <div key={opportunity.title} className="rounded-[28px] border border-slate-800 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/40">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Recommendation</p>
            <h3 className="mt-4 text-2xl font-semibold text-white">{opportunity.title}</h3>
            <span className="mt-5 inline-flex rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300">{opportunity.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Career
