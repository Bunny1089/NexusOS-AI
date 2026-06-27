import PageHeader from '../components/PageHeader'
import ActivityPanel from '../components/ActivityPanel'

function Workspace() {
  return (
    <div className="space-y-8">
      <PageHeader title="AI Workspace" description="Launch multi-agent workflows, review live state, and pilot your next study or career session." />
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[28px] border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/40">
          <h3 className="text-lg font-semibold text-white">Active agents</h3>
          <div className="mt-6 space-y-4">
            {['Coordinator', 'Planner', 'Resume', 'Interview', 'Study'].map((label) => (
              <div key={label} className="flex items-center justify-between rounded-3xl border border-slate-800 bg-slate-950/90 p-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-500">{label}</p>
                  <p className="mt-1 text-base font-semibold text-white">Listening for tasks</p>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">Active</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[28px] border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/40">
          <h3 className="text-lg font-semibold text-white">Workspace insights</h3>
          <p className="mt-4 text-slate-400">Your coordinator agent is orchestrating study, resume review, and career workflows. Use this workspace to trigger new goals and review agent output.</p>
          <div className="mt-6 space-y-4">
            <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-4">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Current campaign</p>
              <p className="mt-2 text-base font-semibold text-white">Summer internship prep</p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-4">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Next milestone</p>
              <p className="mt-2 text-base font-semibold text-white">Finalize resume and interview script</p>
            </div>
          </div>
        </div>
        <ActivityPanel />
      </div>
    </div>
  )
}

export default Workspace
