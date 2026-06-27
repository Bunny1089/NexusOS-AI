type DataPanelProps = {
  title: string
  items: Array<Record<string, string>>
  fields?: string[]
}

function DataPanel({ title, items, fields }: DataPanelProps) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-900/20">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <div className="mt-4 space-y-3">
        {items.length === 0 ? (
          <p className="text-slate-400">No data available yet.</p>
        ) : (
          items.map((item, index) => (
            <div key={index} className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
              {fields ? (
                <div className="space-y-1">
                  {fields.map((field) => (
                    <p key={field} className="text-sm text-slate-300">
                      <span className="font-semibold text-slate-100">{field}:</span> {item[field]}
                    </p>
                  ))}
                </div>
              ) : (
                <pre className="whitespace-pre-wrap text-sm text-slate-300">{JSON.stringify(item, null, 2)}</pre>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  )
}

export default DataPanel
