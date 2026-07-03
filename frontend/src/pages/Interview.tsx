import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { getInterviewCoach } from "../services/api";

function Interview() {
  const [tips, setTips] = useState<string[]>([]);
  const [role, setRole] = useState("AI Intern");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadInterviewPlan = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await getInterviewCoach(role);

      const fallbackTips = [
        `Revise ${role} fundamentals.`,
        "Practice 2 coding questions daily.",
        "Prepare a strong self-introduction.",
        "Review your resume projects thoroughly.",
        "Practice HR and behavioral questions.",
      ];

      setTips(
        Array.isArray(result?.tips) && result.tips.length > 0
          ? result.tips
          : fallbackTips
      );

      if (result?.role) {
        setRole(result.role);
      }
    } catch (err: any) {
      setError(err?.message ?? "Unable to load interview coach.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInterviewPlan();
  }, []);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Interview Coach"
        description="Prepare for technical interviews with AI-generated tips and guidance."
      />

      {/* Controls */}

      <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-5">
        <div className="flex flex-wrap gap-4">

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-white"
          >
            <option>AI Intern</option>
            <option>ML Intern</option>
            <option>Backend Intern</option>
            <option>Frontend Intern</option>
            <option>Full Stack Intern</option>
          </select>

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-white"
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>

          <button
            onClick={loadInterviewPlan}
            className="rounded-xl bg-cyan-600 px-5 py-2 font-semibold text-white transition hover:bg-cyan-500"
          >
            Generate Interview Plan
          </button>

        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">

        {/* Tips */}

        <div className="rounded-[28px] border border-slate-800 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/40">
          <h2 className="text-xl font-semibold text-white">
            Coaching Quick Start
          </h2>

          <ul className="mt-6 space-y-3">

            {loading ? (
              <li className="rounded-3xl border border-slate-800 bg-slate-900/80 p-4">
                Generating interview plan...
              </li>
            ) : (
              tips.map((tip) => (
                <li
                  key={tip}
                  className="rounded-3xl border border-slate-800 bg-slate-900/80 p-4 text-slate-300"
                >
                  • {tip}
                </li>
              ))
            )}

          </ul>
        </div>

        {/* Readiness */}

        <div className="rounded-[28px] border border-slate-800 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/40">
          <h2 className="text-xl font-semibold text-white">
            Interview Readiness
          </h2>

          <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-5 space-y-4">

            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
                Target Role
              </p>
              <p className="mt-2 text-lg font-semibold text-white">
                {role}
              </p>
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
                Difficulty
              </p>
              <p className="mt-2 text-white">
                {difficulty}
              </p>
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
                Readiness Score
              </p>
              <p className="mt-2 text-2xl font-bold text-cyan-300">
                78%
              </p>
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
                Expected Questions
              </p>
              <p className="mt-2 text-white">
                15 Technical + 5 HR
              </p>
            </div>

            {error && (
              <p className="text-sm text-rose-400">
                {error}
              </p>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

export default Interview;