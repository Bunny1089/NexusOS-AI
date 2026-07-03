import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Button from "../components/ui/button";

const features = [
  {
    title: "Google ADK",
    desc: "Coordinator with 7 specialist AI agents.",
  },
  {
    title: "Multi-Agent System",
    desc: "Planner, Study, Resume, Career, Interview, Internship and Calendar agents.",
  },
  {
    title: "Gemini AI",
    desc: "Natural language conversations powered by Google Gemini.",
  },
  {
    title: "Resume Analyzer",
    desc: "Upload resumes, receive ATS score and AI suggestions.",
  },
  {
    title: "Study Planner",
    desc: "Generate personalized study schedules and learning roadmaps.",
  },
  {
    title: "Career Hub",
    desc: "AI-powered internship recommendations and career guidance.",
  },
  {
    title: "Interview Coach",
    desc: "Practice interviews with role-based preparation tips.",
  },
  {
    title: "MCP Integration",
    desc: "Calendar, Documents, Search and GitHub connected through MCP tools.",
  },
  {
    title: "SQLite Activity Tracking",
    desc: "Persistent dashboard metrics, activity logs and analytics.",
  },
];

function Landing() {
  const scrollToFeatures = () => {
    document.getElementById("platform-features")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const goToDashboard = () => {
    window.location.href = "/dashboard";
  };

  return (
    <div className="space-y-14">

      {/* Hero */}

      <section className="grid gap-10 xl:grid-cols-[0.9fr_0.7fr]">

        <div className="space-y-6">

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/90 px-4 py-2 text-sm text-cyan-300">
              <Sparkles className="h-4 w-4" />
              AI Powered Academic Operating System
            </span>

            <h1 className="mt-6 text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              NexusOS AI
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-400">
              Your intelligent academic and career companion powered by
              Google ADK, Gemini AI, Multi-Agent orchestration and MCP
              integrations.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">

              {/* Get Started */}

              <Button
                onClick={goToDashboard}
                className="bg-gradient-to-r from-emerald-500 to-cyan-600 border border-emerald-400 text-white shadow-[0_0_25px_rgba(16,185,129,0.45)] hover:shadow-[0_0_40px_rgba(16,185,129,0.8)] hover:scale-105 transition-all duration-300"
              >
                Get Started
              </Button>

              {/* View Features */}

              <Button
                onClick={scrollToFeatures}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 border border-cyan-400 text-white shadow-[0_0_25px_rgba(34,211,238,0.45)] hover:shadow-[0_0_40px_rgba(34,211,238,0.8)] hover:scale-105 transition-all duration-300"
              >
                View Features
              </Button>

            </div>

          </motion.div>

        </div>

        {/* Live Preview */}

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-[32px] border border-slate-800 bg-slate-950/80 p-8 shadow-xl shadow-slate-950/50"
        >

          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">
            Live AI Workspace
          </p>

          <div className="mt-6 rounded-[28px] bg-slate-900/90 p-6">

            <div className="flex items-center justify-between">

              <span className="text-slate-300">
                Coordinator Status
              </span>

              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs uppercase tracking-[0.35em] text-emerald-300">
                Active
              </span>

            </div>

            <div className="mt-8 space-y-4">

              {[
                "Coordinator",
                "Planner",
                "Study",
                "Resume",
                "Career",
                "Interview",
                "Internship",
              ].map((agent) => (
                <div
                  key={agent}
                  className="flex items-center justify-between rounded-3xl bg-slate-950/90 px-4 py-4"
                >
                  <span className="text-sm text-slate-200">
                    {agent}
                  </span>

                  <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400">
                    Ready
                  </span>

                </div>
              ))}

            </div>

            <div className="mt-8 flex items-center justify-between rounded-3xl border border-slate-800 bg-slate-950/90 p-4">

              <div>

                <p className="text-sm text-slate-400">
                  Current Workflow
                </p>

                <p className="mt-1 text-base font-semibold text-white">
                  AI Career Preparation Pipeline
                </p>

              </div>

              <ArrowRight className="h-6 w-6 text-cyan-300" />

            </div>

          </div>

        </motion.div>

      </section>

      {/* Platform Features */}

      <section id="platform-features">

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8 text-3xl font-bold text-white"
        >
          Platform Features
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                scale: 1.03,
              }}
              className="rounded-[28px] border border-slate-800 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/40 transition-all duration-300 hover:border-cyan-500 hover:shadow-cyan-500/20"
            >
              <h3 className="text-xl font-semibold text-cyan-300">
                {feature.title}
              </h3>

              <p className="mt-4 text-slate-400">
                {feature.desc}
              </p>

            </motion.div>
          ))}

        </div>

      </section>

    </div>
  );
}

export default Landing;