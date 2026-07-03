import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import { getStudyPlan } from "../services/api";

function Study() {
  const [modules, setModules] = useState<
    Array<{ title: string; progress: number; detail?: string }>
  >([]);

  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [subject, setSubject] = useState("Machine Learning");
  const [hours, setHours] = useState("2 Hours / Day");

  const loadStudyPlan = async () => {
    setLoading(true);
    setError(null);

    try {
      const payload = await getStudyPlan();

      const plan = payload?.plan ?? {};
      const schedule = Array.isArray(plan?.schedule) ? plan.schedule : [];

      const fallbackModules = [
        {
          title: `${subject} Fundamentals`,
          progress: 75,
          detail: `Study ${hours}`,
        },
        {
          title: "Practice Questions",
          progress: 55,
          detail: "Solve topic-wise questions",
        },
        {
          title: "Revision & Mock Test",
          progress: 35,
          detail: "Complete weekly revision",
        },
      ];

      const normalizedModules =
        schedule.length > 0
          ? schedule.map((item: any, index: number) => ({
              title:
                item.focus ||
                item.title ||
                `Study Block ${index + 1}`,
              progress:
                item.progress ??
                [75, 55, 35][index] ??
                50,
              detail:
                item.detail ||
                item.schedule ||
                "AI-generated study module",
            }))
          : fallbackModules;

      setModules(normalizedModules);

      setSummary(
        plan.summary ??
          `${subject} study plan generated successfully.`
      );
    } catch (err: any) {
      setError(err?.message ?? "Unable to load study plan.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudyPlan();
  }, []);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Study Center"
        description="Track your learning journey with curated modules, goal progress, and exam readiness."
      />

      {/* Controls */}

      <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-5">
        <div className="flex flex-wrap gap-4">

          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-white"
          >
            <option>Machine Learning</option>
            <option>Artificial Intelligence</option>
            <option>Data Structures</option>
            <option>DBMS</option>
            <option>Operating Systems</option>
            <option>Computer Networks</option>
          </select>

          <select
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-white"
          >
            <option>2 Hours / Day</option>
            <option>4 Hours / Day</option>
            <option>6 Hours / Day</option>
          </select>

          <button
            onClick={loadStudyPlan}
            className="rounded-xl bg-cyan-600 px-5 py-2 font-semibold text-white transition hover:bg-cyan-500"
          >
            Generate Study Plan
          </button>

        </div>
      </div>

      {/* Summary */}

      <div className="rounded-[28px] border border-slate-800 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/40">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
          Latest Plan
        </p>

        <p className="mt-3 text-lg text-white">
          {summary || "Loading study plan..."}
        </p>

        {error && (
          <p className="mt-3 text-sm text-rose-400">
            {error}
          </p>
        )}
      </div>

      {/* Modules */}

      <div className="grid gap-6 xl:grid-cols-3">

        {loading ? (
          <p className="text-slate-400">
            Generating AI study plan...
          </p>
        ) : (
          modules.map((module) => (
            <motion.div
              key={module.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="rounded-[28px] border border-slate-800 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/40"
            >
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
                    Module
                  </p>

                  <h3 className="mt-2 text-xl font-semibold text-white">
                    {module.title}
                  </h3>
                </div>

                <div className="text-right">
                  <p className="text-lg font-semibold text-cyan-300">
                    {module.progress}%
                  </p>

                  <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                    Complete
                  </p>
                </div>

              </div>

              <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-sky-600"
                  style={{
                    width: `${module.progress}%`,
                  }}
                />
              </div>

              <p className="mt-4 text-sm text-slate-400">
                {module.detail}
              </p>

            </motion.div>
          ))
        )}

      </div>
    </div>
  );
}

export default Study;