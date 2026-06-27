import PageHeader from '../components/PageHeader'

const events = [
  { title: 'Machine Learning Exam', date: 'Jul 10', status: 'High priority' },
  { title: 'Career Workshop', date: 'Jul 12', status: 'Booked' },
  { title: 'Study Sprint', date: 'Jul 14', status: 'Suggested' },
]

function Calendar() {
  return (
    <div className="space-y-8">
      <PageHeader title="Calendar" description="Keep your schedule aligned with study blocks, interviews, and campus events." />
      <div className="grid gap-6 xl:grid-cols-3">
        {events.map((event) => (
          <div key={event.title} className="rounded-[28px] border border-slate-800 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/40">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">{event.date}</p>
            <h3 className="mt-4 text-2xl font-semibold text-white">{event.title}</h3>
            <p className="mt-3 text-slate-400">{event.status}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Calendar
