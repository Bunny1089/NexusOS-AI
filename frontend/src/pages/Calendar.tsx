import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { getCalendar } from "../services/api";

function Calendar() {
  const [events, setEvents] = useState<
    Array<{ title: string; date: string; type: string }>
  >([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [category, setCategory] = useState("All");

  const loadCalendar = async () => {
    setLoading(true);
    setError(null);

    try {
      const payload = await getCalendar();

      const fallbackEvents = [
        {
          title: "Capstone Review",
          date: "Monday",
          type: "Project",
        },
        {
          title: "Machine Learning Study",
          date: "Wednesday",
          type: "Study",
        },
        {
          title: "AI Internship Interview",
          date: "Friday",
          type: "Interview",
        },
      ];

      setEvents(payload.length > 0 ? payload : fallbackEvents);
    } catch (err: any) {
      setError(err?.message ?? "Unable to load calendar.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCalendar();
  }, []);

  const filteredEvents =
    category === "All"
      ? events
      : events.filter((event) => event.type === category);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Calendar"
        description="Keep your schedule aligned with study sessions, interviews, and project milestones."
      />

      {/* Controls */}

      <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-5">
        <div className="flex flex-wrap items-center gap-4">

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-white"
          >
            <option>All</option>
            <option>Study</option>
            <option>Interview</option>
            <option>Project</option>
            <option>Exam</option>
          </select>

          <button
            onClick={loadCalendar}
            className="rounded-xl bg-cyan-600 px-5 py-2 font-semibold text-white transition hover:bg-cyan-500"
          >
            Refresh Calendar
          </button>

          <div className="ml-auto rounded-xl bg-slate-900 px-4 py-2 text-sm text-cyan-300">
            Upcoming Events: {filteredEvents.length}
          </div>

        </div>
      </div>

      {/* Events */}

      <div className="grid gap-6 xl:grid-cols-3">

        {loading ? (
          <p className="text-slate-400">Loading calendar...</p>
        ) : (
          filteredEvents.map((event) => (
            <div
              key={event.title}
              className="rounded-[28px] border border-slate-800 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/40"
            >
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
                {event.date}
              </p>

              <h3 className="mt-4 text-2xl font-semibold text-white">
                {event.title}
              </h3>

              <div className="mt-4 inline-flex rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300">
                {event.type}
              </div>
            </div>
          ))
        )}

      </div>

      {error && (
        <p className="text-sm text-rose-400">
          {error}
        </p>
      )}
    </div>
  );
}

export default Calendar;