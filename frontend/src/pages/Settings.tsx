import PageHeader from '../components/PageHeader'

function Settings() {
  return (
    <div className="space-y-8">
      <PageHeader title="Settings" description="Control NexusOS AI preferences, notifications, and workspace behavior." />
      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-[28px] border border-slate-800 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/40">
          <h2 className="text-xl font-semibold text-white">Preferences</h2>
          <div className="mt-6 space-y-4 text-slate-400">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-4">
              <p className="font-semibold text-white">Theme</p>
              <p className="mt-2 text-sm">Dark premium mode enabled.</p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-4">
              <p className="font-semibold text-white">Notifications</p>
              <p className="mt-2 text-sm">Agent alerts are set to high priority.</p>
            </div>
          </div>
        </div>
        <div className="rounded-[28px] border border-slate-800 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/40">
          <h2 className="text-xl font-semibold text-white">System</h2>
          <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-4 text-slate-400">
            <p className="font-semibold text-white">Local mode</p>
            <p className="mt-2 text-sm">Backend API endpoints are connected with mock fallbacks for a hybrid developer preview.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
