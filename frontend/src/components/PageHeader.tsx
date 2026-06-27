function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-8 flex flex-col gap-3">
      <div className="inline-flex items-center rounded-full bg-slate-900/90 px-4 py-2 text-xs uppercase tracking-[0.35em] text-cyan-300/80">
        NexusOS AI Workspace
      </div>
      <h1 className="text-3xl font-semibold text-white sm:text-4xl">{title}</h1>
      <p className="max-w-3xl text-slate-400">{description}</p>
    </div>
  )
}

export default PageHeader
