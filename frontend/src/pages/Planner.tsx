import PageHeader from '../components/PageHeader'

const tasks = [
  { title: 'Build exam timeline', due: 'Today', status: 'In progress' },
  { title: 'Review resume keywords', due: 'Tomorrow', status: 'Planned' },
  { title: 'Apply to internship roles', due: 'Next week', status: 'Ready' },
]

function Planner() {
  return (
    <div className="space-y-8">
      <PageHeader title="Planner" description="Organize tasks, milestones, and study sprints with AI-assisted clarity." />

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-[28px] border border-slate-800 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/40">
          <h2 className="text-xl font-semibold text-white">Priority tasks</h2>
          <div className="mt-6 space-y-4">
            {tasks.map((task) => (
              <div key={task.title} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{task.title}</h3>
                    <p className="mt-1 text-sm text-slate-400">Due {task.due}</p>
                  </div>
                  <span className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300">{task.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[28px] border border-slate-800 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/40">
          <h2 className="text-xl font-semibold text-white">Sprint overview</h2>
          <p className="mt-4 text-slate-400">Plan weekly study blocks, set exam preparation goals, and keep your career tasks aligned.</p>
        </div>
      </div>
    </div>
  )
}

export default Planner
