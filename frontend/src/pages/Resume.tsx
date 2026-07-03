import { ChangeEvent, useState } from 'react'
import * as pdfjsLib from 'pdfjs-dist'
import { GlobalWorkerOptions } from 'pdfjs-dist'
import PageHeader from '../components/PageHeader'
import { getResumeScore } from '../services/api'

GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString()

function Resume() {
  const [resumeText, setResumeText] = useState('')
  const [score, setScore] = useState<number | null>(null)
  const [feedback, setFeedback] = useState('')
  const [highlights, setHighlights] = useState<string[]>([])
  const [recommendations, setRecommendations] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [analyzedAt, setAnalyzedAt] = useState<string | null>(null)

  const handleAnalyze = async (text = resumeText) => {
    const trimmed = text.trim()
    if (!trimmed) {
      setError('Paste resume content or upload a PDF/text file to analyze.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await getResumeScore(trimmed)
      setScore(response?.score ?? 0)
      setFeedback(response?.feedback ?? '')
      setHighlights(response?.highlights ?? [])
      setRecommendations(response?.recommendations ?? [])
      setAnalyzedAt(new Date().toLocaleString())
    } catch (err: any) {
      setError(err?.message ?? 'Unable to analyze resume')
    } finally {
      setLoading(false)
    }
  }

  const parseFileToText = async (file: File) => {
    if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
      let extractedText = ''

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
        const page = await pdf.getPage(pageNumber)
        const content = await page.getTextContent()
        const pageText = (content.items as Array<{ str?: string }>)
          .filter((item) => typeof item.str === 'string')
          .map((item) => item.str)
          .join(' ')

        extractedText += `${pageText}\n`
      }

      return extractedText.trim()
    }

    return file.text()
  }

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setLoading(true)
      setError(null)
      const text = await parseFileToText(file)
      setResumeText(text)
      await handleAnalyze(text)
    } catch {
      setError('Unable to read the selected file. Please choose a PDF, TXT, or Markdown document.')
    } finally {
      setLoading(false)
    }
  }

  const opportunity = recommendations[0] || (feedback ? 'Resume analysis generated' : 'Upload a resume to generate your first analysis.')

  return (
    <div className="space-y-8">
      <PageHeader title="Resume Analyzer" description="Get instant guidance on your CV, highlight gaps, and see a polished score." />
      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-[28px] border border-slate-800 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/40">
          <h2 className="text-xl font-semibold text-white">Latest review</h2>
          <div className="mt-6 space-y-4">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Resume quality</p>
              <p className="mt-3 text-4xl font-semibold text-cyan-300">{loading ? '…' : `${score ?? 0}%`}</p>
              <p className="mt-2 text-slate-400">{feedback || 'Paste your resume text or upload a file to generate feedback.'}</p>
              {analyzedAt ? <p className="mt-2 text-xs uppercase tracking-[0.25em] text-slate-500">Analyzed {analyzedAt}</p> : null}
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Top opportunity</p>
              <h3 className="mt-2 text-xl font-semibold text-white">{opportunity}</h3>
              <p className="mt-1 text-sm text-slate-400">The analysis updates from the live Resume Agent response after each submission.</p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Resume input</p>
              <textarea
                value={resumeText}
                onChange={(event) => setResumeText(event.target.value)}
                rows={8}
                placeholder="Paste your resume here..."
                className="mt-3 w-full rounded-2xl border border-slate-800 bg-slate-950 p-4 text-sm text-slate-100 outline-none focus:border-cyan-400"
              />
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => handleAnalyze(resumeText)}
                  disabled={loading}
                  className="rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? 'Analyzing...' : 'Analyze resume'}
                </button>
                <label className="cursor-pointer rounded-2xl border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300">
                  Upload PDF or text file
                  <input type="file" accept=".pdf,.txt,.md" className="hidden" onChange={handleFileUpload} />
                </label>
              </div>
              {error ? <p className="mt-3 text-sm text-rose-400">{error}</p> : null}
            </div>
          </div>
        </div>
        <div className="rounded-[28px] border border-slate-800 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/40">
          <h2 className="text-xl font-semibold text-white">Review summary</h2>
          <ul className="mt-6 space-y-3 text-slate-400">
            {highlights.length > 0 ? highlights.map((item) => <li key={item} className="rounded-2xl bg-slate-900/80 p-4">{item}</li>) : <li className="rounded-2xl bg-slate-900/80 p-4">Analyze a resume to see your AI-generated summary.</li>}
            {recommendations.map((item) => <li key={item} className="rounded-2xl bg-slate-900/80 p-4">{item}</li>)}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Resume
