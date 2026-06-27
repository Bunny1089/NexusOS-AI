import { motion } from 'framer-motion'
import Sidebar from './Sidebar'

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto grid min-h-screen max-w-[1700px] grid-cols-1 gap-6 px-4 py-6 xl:grid-cols-[320px_1fr] xl:px-8">
        <Sidebar />
        <motion.main
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="rounded-[32px] border border-slate-800 bg-slate-950/95 p-6 shadow-2xl shadow-slate-950/40"
        >
          {children}
        </motion.main>
      </div>
    </div>
  )
}

export default Shell
