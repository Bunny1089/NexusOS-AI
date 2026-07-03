import PageHeader from "../components/PageHeader";
import ActivityPanel from "../components/ActivityPanel";

function Workspace() {
  const agents = [
    "Coordinator",
    "Planner",
    "Study",
    "Resume",
    "Career",
    "Interview",
    "Internship",
  ];

  const tasks = [
    "Resume Analysis",
    "Generate Study Plan",
    "Career Roadmap",
    "Interview Preparation",
    "Weekly Planning",
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="AI Workspace"
        description="Control all AI agents, monitor workflows, and manage your academic and career journey."
      />

      <div className="grid gap-6 xl:grid-cols-2">

        {/* Agent Health */}

        <div className="rounded-[28px] border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/40">

          <h3 className="text-lg font-semibold text-white">
            Agent Health
          </h3>

          <div className="mt-6 space-y-4">

            {agents.map((agent) => (
              <div
                key={agent}
                className="flex items-center justify-between rounded-3xl border border-slate-800 bg-slate-950/90 p-4"
              >
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
                    {agent}
                  </p>

                  <p className="mt-1 text-base font-semibold text-white">
                    Ready for Tasks
                  </p>
                </div>

                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">
                  Online
                </span>
              </div>
            ))}

          </div>
        </div>

        {/* Workspace */}

        <div className="rounded-[28px] border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/40">

          <h3 className="text-lg font-semibold text-white">
            Workspace Overview
          </h3>

          <p className="mt-4 text-slate-400">
            Google ADK Coordinator is orchestrating Planner,
            Resume, Study, Career and Interview agents.
          </p>

          <div className="mt-6 space-y-4">

            <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-4">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
                Current Workflow
              </p>

              <p className="mt-2 text-white font-semibold">
                AI Career Preparation Pipeline
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-4">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
                Coordinator Status
              </p>

              <p className="mt-2 text-cyan-300 font-semibold">
                Listening for Requests
              </p>
            </div>

          </div>

        </div>

        {/* Active Tasks */}

        <div className="rounded-[28px] border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/40">

          <h3 className="text-lg font-semibold text-white">
            Current Task Queue
          </h3>

          <div className="mt-6 space-y-3">

            {tasks.map((task) => (
              <div
                key={task}
                className="flex items-center justify-between rounded-2xl bg-slate-950/90 p-4"
              >
                <span className="text-white">
                  {task}
                </span>

                <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">
                  Ready
                </span>
              </div>
            ))}

          </div>

        </div>

        {/* AI Features */}

        <div className="rounded-[28px] border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/40">

          <h3 className="text-lg font-semibold text-white">
            AI Capabilities
          </h3>

          <div className="mt-6 grid gap-3">

            {[
              "Google ADK",
              "Gemini AI",
              "Multi-Agent System",
              "MCP Integration",
              "Resume Analysis",
              "Career Guidance",
              "Interview Coaching",
              "Study Planning",
              "SQLite Activity Tracking",
            ].map((feature) => (
              <div
                key={feature}
                className="rounded-2xl bg-slate-950/90 p-4 text-slate-300"
              >
                ✅ {feature}
              </div>
            ))}

          </div>

        </div>

        {/* Existing Activity Timeline */}

        <ActivityPanel />

      </div>
    </div>
  );
}

export default Workspace;