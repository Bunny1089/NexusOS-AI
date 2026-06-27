import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'

const studyModules = [
  { title: 'AI Strategy', progress: 76 },
  { title: 'Data Structures', progress: 58 },
  { title: 'Interview Prep', progress: 44 },
]

function Study() {
  return (
    <div className="space-y-8">
      <PageHeader title="Study Center" description="Track your learning journey with curated modules, goal progress, and exam readiness." />
      <div className="grid gap-6 xl:grid-cols-3">
        {studyModules.map((module) => (
          <motion.div
            key={module.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="rounded-[28px] border border-slate-800 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/40"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Module</p>
                <h3 className="mt-2 text-xl font-semibold text-white">{module.title}</h3>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-cyan-300">{module.progress}%</p>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">complete</p>
              </div>
            </div>
            <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-sky-600" style={{ width: `${module.progress}%` }} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Study
