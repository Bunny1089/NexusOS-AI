import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import Button from '../components/ui/button'

function Landing() {
  return (
    <div className="space-y-10">
      <section className="grid gap-10 xl:grid-cols-[0.9fr_0.7fr]">
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/90 px-4 py-2 text-sm text-cyan-300">
              <Sparkles className="h-4 w-4" /> Premium AI operating system
            </span>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight text-white sm:text-6xl">NexusOS AI for academic and career mastery</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-400">Command your study schedule, resume growth, internship search and interview readiness through an intelligent OS designed for ambitious students.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button>Get started</Button>
              <Button className="bg-slate-800 text-slate-100 hover:bg-slate-700">View features</Button>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="rounded-[32px] border border-slate-800 bg-slate-950/80 p-8 shadow-xl shadow-slate-950/50">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Live Preview</p>
          <div className="mt-6 rounded-[28px] bg-slate-900/90 p-6">
            <div className="flex items-center justify-between text-slate-300">
              <span>Agent health</span>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs uppercase tracking-[0.35em] text-emerald-300">Active</span>
            </div>
            <div className="mt-8 space-y-4">
              {['Coordinator', 'Study', 'Planner', 'Resume', 'Interview'].map((name) => (
                <div key={name} className="flex items-center justify-between rounded-3xl bg-slate-950/90 px-4 py-4">
                  <span className="text-sm text-slate-200">{name}</span>
                  <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400">Ready</span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex items-center justify-between rounded-3xl border border-slate-800 bg-slate-950/90 p-4">
              <div>
                <p className="text-sm text-slate-400">Next action</p>
                <p className="mt-1 text-base font-semibold text-white">Generate summer internship study plan</p>
              </div>
              <ArrowRight className="h-6 w-6 text-cyan-300" />
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default Landing
