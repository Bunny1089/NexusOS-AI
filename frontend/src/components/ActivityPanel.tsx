import { useEffect, useState } from 'react'
import { getAgentActivity } from '../services/api'

function ActivityPanel() {
  const [entries, setEntries] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const fetch = async () => {
    setLoading(true)
    try {
      const res = await getAgentActivity()
      setEntries(res || [])
    } catch (err) {
      console.error('Failed to fetch activity', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetch()
    const id = setInterval(fetch, 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-900/20">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Agent Activity</h2>
        <span className="text-sm text-slate-400">Live timeline</span>
      </div>

      <div className="mt-4 space-y-4">
        {loading && <div className="text-sm text-slate-400">Loading...</div>}
        {!loading && entries.length === 0 && <div className="text-sm text-slate-400">No activity yet.</div>}

        {entries.map((e) => (
          <div key={e.event_id} className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-white">{e.agent}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.25em] text-slate-500">{e.action}</p>
              </div>
              <div className="space-y-1 text-right text-xs text-slate-400 sm:text-left">
                <div>{new Date(e.timestamp).toLocaleString()}</div>
                <div>Status: {e.status}</div>
              </div>
            </div>
            <div className="mt-3 text-sm text-slate-200">{e.message}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ActivityPanel
