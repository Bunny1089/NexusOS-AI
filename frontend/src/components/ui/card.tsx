import { cn } from '../../lib/utils'
import type { ReactNode } from 'react'

function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('rounded-[28px] border border-slate-800 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/40', className)}>{children}</div>
}

export default Card
