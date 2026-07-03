import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { getDocuments } from "../services/api";

interface DocumentItem {
  title: string;
  summary: string;
}

function Documents() {
  const [docs, setDocs] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [category, setCategory] = useState("Career");
  const [search, setSearch] = useState("");

  const loadDocuments = async () => {
    setLoading(true);
    setError(null);

    try {
      const payload = await getDocuments(category.toLowerCase());

      const fallbackDocs: DocumentItem[] = [
        {
          title: "Resume.pdf",
          summary: "Latest AI-reviewed resume with ATS improvements.",
        },
        {
          title: "Machine Learning Notes",
          summary: "Study notes for ML interview preparation.",
        },
        {
          title: "Capstone Proposal",
          summary: "Project architecture and documentation.",
        },
      ];

      setDocs(payload.length ? payload : fallbackDocs);
    } catch (err: any) {
      setError(err?.message ?? "Unable to load documents.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];

    const newDoc: DocumentItem = {
      title: file.name,
      summary: `Uploaded document • ${(file.size / 1024).toFixed(1)} KB`,
    };

    setDocs((prev) => [newDoc, ...prev]);
  };

  const filteredDocs = docs.filter((doc) =>
    doc.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <PageHeader
        title="Documents"
        description="Manage resumes, certificates, notes and project files."
      />

      <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-5">

        <div className="flex flex-wrap gap-4 items-center">

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-white"
          >
            <option>Career</option>
            <option>Study</option>
            <option>Projects</option>
            <option>Certificates</option>
          </select>

          <input
            type="text"
            placeholder="Search document..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-white"
          />

          <button
            onClick={loadDocuments}
            className="rounded-xl bg-cyan-600 px-5 py-2 font-semibold text-white hover:bg-cyan-500"
          >
            Refresh
          </button>

          <label className="cursor-pointer rounded-xl bg-emerald-600 px-5 py-2 font-semibold text-white hover:bg-emerald-500">
            Upload
            <input
              type="file"
              hidden
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleUpload}
            />
          </label>

          <div className="ml-auto rounded-xl bg-slate-900 px-4 py-2 text-sm text-cyan-300">
            {filteredDocs.length} Documents
          </div>

        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">

        {loading ? (
          <p className="text-slate-400">Loading documents...</p>
        ) : (
          filteredDocs.map((doc) => (
            <div
              key={doc.title}
              className="rounded-[28px] border border-slate-800 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">
                  {doc.title}
                </h3>

                <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-300">
                  AI Indexed
                </span>
              </div>

              <p className="mt-4 text-slate-400">{doc.summary}</p>

              <div className="mt-6 flex gap-3">

                <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800">
                  View
                </button>

                <button className="rounded-xl bg-red-600/20 px-4 py-2 text-sm text-red-300 hover:bg-red-600/30">
                  Delete
                </button>

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

export default Documents;