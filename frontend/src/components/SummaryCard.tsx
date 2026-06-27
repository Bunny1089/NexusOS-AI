type SummaryCardProps = {
  label: string
  value: string
}

function SummaryCard({ label, value }: SummaryCardProps) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-900/20">
      <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{label}</p>
      <p className="mt-4 text-4xl font-semibold text-white">{value}</p>
    </div>
  )
}

export default SummaryCard
