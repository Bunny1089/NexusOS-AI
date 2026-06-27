import PageHeader from '../components/PageHeader'

const docs = [
  { title: 'Academic Success Guide', description: 'Study techniques for efficient learning.' },
  { title: 'Internship Application Workbook', description: 'Structured checklist for your applications.' },
  { title: 'Project Notebook', description: 'Capture progress across your capstone milestones.' },
]

function Documents() {
  return (
    <div className="space-y-8">
      <PageHeader title="Documents" description="Manage your notes, drafts, and reference assets with AI-enabled document insights." />
      <div className="grid gap-6 xl:grid-cols-3">
        {docs.map((doc) => (
          <div key={doc.title} className="rounded-[28px] border border-slate-800 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/40">
            <h3 className="text-xl font-semibold text-white">{doc.title}</h3>
            <p className="mt-3 text-slate-400">{doc.description}</p>
            <div className="mt-6 inline-flex rounded-2xl bg-slate-900/80 px-4 py-2 text-sm text-slate-300">Open document</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Documents
