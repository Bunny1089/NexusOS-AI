import { useState } from "react";
import PageHeader from "../components/PageHeader";

function Exams() {
  const [examType, setExamType] = useState("Machine Learning");
  const [mode, setMode] = useState("Revision");

  const [exams, setExams] = useState([
    { name: "Machine Learning", date: "10 Jul", readiness: 84 },
    { name: "Career Strategy", date: "14 Jul", readiness: 66 },
    { name: "Interview Practice", date: "18 Jul", readiness: 72 },
  ]);

  const generatePlan = () => {
    setExams([
      {
        name: examType,
        date: "Next Week",
        readiness: 82,
      },
      {
        name: `${examType} Practice`,
        date: "2 Days Later",
        readiness: 68,
      },
      {
        name: "Final Revision",
        date: "Exam Day -1",
        readiness: 92,
      },
    ]);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Exams Hub"
        description="Track exam readiness and prepare using AI-generated study guidance."
      />

      {/* Controls */}

      <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-5">
        <div className="flex flex-wrap gap-4">

          <select
            value={examType}
            onChange={(e) => setExamType(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-white"
          >
            <option>Machine Learning</option>
            <option>Artificial Intelligence</option>
            <option>Data Structures</option>
            <option>DBMS</option>
            <option>Operating Systems</option>
          </select>

          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-white"
          >
            <option>Revision</option>
            <option>Practice</option>
            <option>Mock Test</option>
          </select>

          <button
            onClick={generatePlan}
            className="rounded-xl bg-cyan-600 px-5 py-2 font-semibold text-white hover:bg-cyan-500"
          >
            Generate Readiness
          </button>

        </div>
      </div>

      {/* Exam Cards */}

      <div className="grid gap-6 xl:grid-cols-3">
        {exams.map((exam) => (
          <div
            key={exam.name}
            className="rounded-[28px] border border-slate-800 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/40"
          >
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
              {exam.date}
            </p>

            <h3 className="mt-4 text-2xl font-semibold text-white">
              {exam.name}
            </h3>

            <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-sky-600"
                style={{ width: `${exam.readiness}%` }}
              />
            </div>

            <p className="mt-4 text-sm text-slate-400">
              Readiness {exam.readiness}%
            </p>
          </div>
        ))}
      </div>

      {/* AI Tips */}

      <div className="rounded-[28px] border border-slate-800 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/40">
        <h2 className="text-xl font-semibold text-white">
          AI Preparation Tips
        </h2>

        <ul className="mt-5 space-y-3 text-slate-300">
          <li>✅ Revise important concepts before attempting mock tests.</li>
          <li>✅ Solve previous year questions for better confidence.</li>
          <li>✅ Focus on weak topics identified during practice.</li>
          <li>✅ Take short revision breaks to improve retention.</li>
        </ul>
      </div>
    </div>
  );
}

export default Exams;