import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { getCareerRecommendations } from "../services/api";

function Career() {
  const [recommendations, setRecommendations] = useState<
    Array<{ title: string; company: string; match: number }>
  >([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [careerGoal, setCareerGoal] = useState("AI Engineer");
  const [level, setLevel] = useState("Beginner");

  const loadCareer = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await getCareerRecommendations();

      const fallback = [
        {
          title: careerGoal,
          company: "Google",
          match: 92,
        },
        {
          title: "Machine Learning Intern",
          company: "Microsoft",
          match: 88,
        },
        {
          title: "AI Research Intern",
          company: "OpenAI",
          match: 84,
        },
      ];

      setRecommendations(
        result?.recommendations?.length
          ? result.recommendations
          : fallback
      );
    } catch (err: any) {
      setError(err?.message ?? "Unable to load career recommendations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCareer();
  }, []);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Career Hub"
        description="Explore AI-powered career roadmaps, internships and learning paths."
      />

      {/* Controls */}

      <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-5">
        <div className="flex flex-wrap gap-4">

          <select
            value={careerGoal}
            onChange={(e) => setCareerGoal(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-white"
          >
            <option>AI Engineer</option>
            <option>Machine Learning Engineer</option>
            <option>Backend Developer</option>
            <option>Frontend Developer</option>
            <option>Full Stack Developer</option>
            <option>Data Scientist</option>
          </select>

          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-white"
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>

          <button
            onClick={loadCareer}
            className="rounded-xl bg-cyan-600 px-5 py-2 font-semibold text-white transition hover:bg-cyan-500"
          >
            Generate Roadmap
          </button>

        </div>
      </div>

      {/* Recommendations */}

      <div className="grid gap-6 xl:grid-cols-3">

        {loading ? (
          <p className="text-slate-400">
            Generating career roadmap...
          </p>
        ) : (
          recommendations.map((opportunity) => (
            <div
              key={opportunity.title}
              className="rounded-[28px] border border-slate-800 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/40"
            >
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
                Recommendation
              </p>

              <h3 className="mt-4 text-2xl font-semibold text-white">
                {opportunity.title}
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                {opportunity.company}
              </p>

              <span className="mt-5 inline-flex rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300">
                Match {opportunity.match}%
              </span>
            </div>
          ))
        )}

      </div>

      {/* Career Roadmap */}

      <div className="rounded-[28px] border border-slate-800 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/40">

        <h2 className="text-xl font-semibold text-white">
          Learning Roadmap
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">

          <div className="rounded-2xl bg-slate-900/80 p-5">
            <h3 className="font-semibold text-white">
              Required Skills
            </h3>

            <ul className="mt-4 space-y-2 text-slate-400 text-sm">
              <li>• Python Programming</li>
              <li>• Data Structures & Algorithms</li>
              <li>• SQL & Databases</li>
              <li>• Git & GitHub</li>
              <li>• Problem Solving</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-slate-900/80 p-5">
            <h3 className="font-semibold text-white">
              Recommended Learning Path
            </h3>

            <ul className="mt-4 space-y-2 text-slate-400 text-sm">
              <li>1. Learn Programming Fundamentals</li>
              <li>2. Build Personal Projects</li>
              <li>3. Practice Interview Questions</li>
              <li>4. Improve Resume</li>
              <li>5. Apply for Internships</li>
            </ul>
          </div>

        </div>

      </div>

      {error && (
        <p className="text-sm text-rose-400">
          {error}
        </p>
      )}

    </div>
  );
}

export default Career;