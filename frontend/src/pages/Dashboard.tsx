import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import PageHeader from '../components/PageHeader'
import ActivityPanel from '../components/ActivityPanel'
import ChatPanel from '../components/ChatPanel'
import { useAgentDataStore } from '../stores/agentDataStore'

function Dashboard() {
  const agentResults = useAgentDataStore((state) => state.agentResults)

  const agentStats = useMemo(() => {
    const progress = agentResults.studyProgress ?? 58
    return [
      { name: 'Mon', value: Math.max(24, progress - 10) },
      { name: 'Tue', value: Math.max(24, progress - 5) },
      { name: 'Wed', value: progress },
      { name: 'Thu', value: Math.min(100, progress + 6) },
      { name: 'Fri', value: Math.min(100, progress + 12) },
      { name: 'Sat', value: Math.min(100, progress + 16) },
      { name: 'Sun', value: Math.min(100, progress + 21) },
    ]
  }, [agentResults.studyProgress])

  const statusMap = {
    Coordinator: agentResults.coordinatorHealth || 'Active',
    Study: agentResults.studyHealth || 'Idle',
    Career: agentResults.careerHealth || 'Idle',
  }

  const metricCards = [
    {
      title: "Today's Tasks",
      value: agentResults.todayTasks?.length ? `${agentResults.todayTasks.length} tasks` : 'No tasks yet',
      description: agentResults.todayTasks?.join(', ') || 'Dispatch a request to generate today’s work items.',
    },
    {
      title: 'Weekly Planner',
      value: agentResults.weeklyCompletion ? `${agentResults.weeklyCompletion}% done` : 'Pending',
      description: agentResults.weeklyPlanner || 'Planner output will appear after a coordinator request.',
    },
    {
      title: 'Study Progress',
      value: `${agentResults.studyProgress ?? 0}%`,
      description: agentResults.studyProgressDescription || 'Start a study workflow to track progress.',
    },
  ]

  const internshipItems = agentResults.internshipRecommendations?.length
    ? agentResults.internshipRecommendations
    : [{ title: 'No recommendations yet', company: 'Dispatch to search', match: 0 }]

  return (
    <div className="space-y-8">
      <PageHeader title="Command Center" description="Monitor your academic and career agents in one premium workspace." />

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6 rounded-[28px] border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/40"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Agent Health</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">Live Operations</h2>
            </div>
            <div className="rounded-2xl bg-slate-950/90 px-4 py-3 text-sm text-slate-300">Coordinator status: {statusMap.Coordinator}</div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {Object.entries(statusMap).map(([label, status]) => (
              <div key={label} className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{label}</p>
                <p className="mt-3 text-3xl font-semibold text-white">
                  {label === 'Coordinator'
                    ? 'Active'
                    : label === 'Study'
                    ? `${agentResults.studyProgress ?? 0}%`
                    : `${agentResults.internshipRecommendations?.length ?? 0} recs`}
                </p>
                <p className="mt-2 text-sm text-slate-400">{status}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {metricCards.map((card) => (
              <div key={card.title} className="rounded-[28px] border border-slate-800 bg-slate-950/90 p-5">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">{card.title}</p>
                <p className="mt-3 text-2xl font-semibold text-white">{card.value}</p>
                <p className="mt-2 text-sm text-slate-400">{card.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 h-[320px] rounded-[28px] border border-slate-800 bg-slate-950/90 p-4">
            <div className="flex items-center justify-between px-3 pb-4">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Analytics</p>
                <h3 className="text-xl font-semibold text-white">Agent collaboration cadence</h3>
              </div>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={agentStats} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#94a3b8' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ background: '#0f172a', borderRadius: 16, borderColor: '#334155' }} itemStyle={{ color: '#e2e8f0' }} />
                <Area type="monotone" dataKey="value" stroke="#22d3ee" strokeWidth={3} fill="url(#gradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="space-y-6 rounded-[28px] border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/40"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Chat</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Trigger AI actions</h2>
            </div>
            <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs uppercase tracking-[0.35em] text-cyan-200">Live</span>
          </div>

          <ChatPanel />
        </motion.section>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="space-y-6 rounded-[28px] border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/40"
        >
          <h2 className="text-xl font-semibold text-white">Career and Study Insights</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Internship Recommendations</p>
              <div className="mt-3 space-y-3">
                {internshipItems.slice(0, 3).map((item, index) => (
                  <div key={index} className="rounded-2xl bg-slate-900/70 p-4">
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="text-xs text-slate-400">{item.company}</p>
                    <p className="mt-1 text-sm text-cyan-300">Match: {item.match}%</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Resume Score</p>
              <p className="mt-3 text-5xl font-semibold text-white">{agentResults.resumeScore ?? '--'}</p>
              <p className="mt-2 text-sm text-slate-400">{agentResults.resumeHighlights?.join(', ') || 'Resume analysis will appear here.'}</p>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="space-y-6 rounded-[28px] border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/40"
        >
          <h2 className="text-xl font-semibold text-white">Progress & Readiness</h2>
          <div className="grid gap-4">
            <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Career Roadmap</p>
              <p className="mt-3 text-white">{agentResults.careerRoadmap || 'No roadmap defined yet.'}</p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Interview Readiness</p>
              <p className="mt-3 text-white">{agentResults.interviewReadiness || 'Ask the system for interview prep.'}</p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Exam Tracker</p>
              <p className="mt-3 text-white">{agentResults.examTracker || 'Dispatch a study request to generate exam milestones.'}</p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default Dashboard
