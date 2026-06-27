import { NavLink } from 'react-router-dom'
import { LucideIcon, Home, Terminal, BookOpen, CalendarCheck, Award, FileText, Briefcase, Users, Folder, Calendar, Settings, BarChart2 } from 'lucide-react'
import { navItems } from '../lib/navigation'

const iconMap: Record<string, LucideIcon> = {
  home: Home,
  'bar-chart-2': BarChart2,
  terminal: Terminal,
  'book-open': BookOpen,
  'calendar-check': CalendarCheck,
  award: Award,
  'file-text': FileText,
  briefcase: Briefcase,
  users: Users,
  folder: Folder,
  calendar: Calendar,
  settings: Settings,
}

function Sidebar() {
  return (
    <aside className="hidden w-80 flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/40 xl:flex">
      <div className="mb-8 space-y-3">
        <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">NexusOS AI</p>
        <h2 className="text-2xl font-semibold text-slate-50">AI Operating System</h2>
        <p className="text-sm leading-6 text-slate-400">A premium academic and career command center for students and young professionals.</p>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = iconMap[item.icon]
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? 'border-cyan-400/50 bg-cyan-500/10 text-cyan-200 shadow-inner shadow-cyan-500/10'
                    : 'border-transparent text-slate-300 hover:border-slate-700 hover:bg-slate-900/70 hover:text-slate-100'
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          )
        })}
      </nav>

      <div className="mt-auto rounded-3xl border border-slate-800 bg-slate-900/80 p-4 text-sm text-slate-400">
        <p className="font-semibold text-slate-100">Agent Health</p>
        <p className="mt-3">Coordinator active · Planner ready · Resume analyzer idle</p>
      </div>
    </aside>
  )
}

export default Sidebar
