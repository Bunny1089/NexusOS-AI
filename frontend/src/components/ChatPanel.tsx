import { useState, useRef, useEffect } from 'react'
import { dispatchRequest, sendChat } from '../services/api'
import { useAgentDataStore } from '../stores/agentDataStore'

type Message = { role: 'user' | 'ai' | 'system'; text: string }

function ChatPanel() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const updateFromCoordinatorResponse = useAgentDataStore((state) => state.updateFromCoordinatorResponse)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, loading])

  const handleSend = async () => {
    const trimmed = message.trim()
    if (!trimmed) return
    setError(null)

    setMessages((m) => [...m, { role: 'user', text: trimmed }])
    setMessage('')
    setLoading(true)
    setMessages((m) => [...m, { role: 'system', text: 'NexusOS is thinking...' }])

    try {
      const dispatchResult = await dispatchRequest({
        user_id: 'student-1',
        payload: { request_text: trimmed },
      })
      updateFromCoordinatorResponse(dispatchResult)

      const chatResponse = await sendChat({ user_id: 'student-1', message: trimmed })
      const replyText = chatResponse?.reply ?? dispatchResult?.summary ?? 'No reply from AI.'

      setMessages((m) => {
        const withoutTyping = m.filter((_, i) => i !== m.length - 1)
        return [...withoutTyping, { role: 'ai', text: replyText }]
      })
    } catch (err: any) {
      const msg = err?.message ?? 'Unable to send chat request.'
      setError(msg)
      setMessages((m) => {
        const withoutTyping = m.filter((_, i) => i !== m.length - 1)
        return [...withoutTyping, { role: 'ai', text: `Error: ${msg}` }]
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-900/20">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">AI Chat</h2>
        <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200">Powered by Gemini</span>
      </div>
      <p className="mt-3 text-slate-400">Ask NexusOS for study strategies, resume feedback, internship support, or interview advice.</p>

      <div className="mt-6 flex flex-col gap-4">
        <div ref={scrollRef} className="max-h-64 overflow-auto rounded-2xl border border-slate-800 bg-slate-950 p-4 text-slate-100">
          {messages.length === 0 && (
            <p className="text-slate-500">No messages yet — ask something to start the conversation.</p>
          )}
          {messages.map((m, idx) => (
            <div key={idx} className={`mb-3 flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-xl p-3 text-sm ${m.role === 'user' ? 'bg-cyan-500 text-slate-900' : m.role === 'system' ? 'bg-slate-800 text-slate-400' : 'bg-slate-800 text-slate-200'}`}>
                <div className="whitespace-pre-line">{m.text}</div>
              </div>
            </div>
          ))}
        </div>

        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="w-full rounded-2xl border border-slate-800 bg-slate-950 p-4 text-slate-100 outline-none focus:border-cyan-400"
          rows={4}
          placeholder="Type your question..."
        />

        <div className="flex items-center gap-3">
          <button
            onClick={handleSend}
            disabled={loading}
            className="inline-flex items-center justify-center rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Thinking...' : 'Send to NexusOS'}
          </button>
          {error && <div className="text-sm text-rose-400">{error}</div>}
        </div>

        {messages.filter((m) => m.role === 'ai').length > 0 && (
          <div className="mt-2 rounded-3xl bg-slate-950 p-4 text-slate-200 shadow-inner shadow-slate-900/40">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">NexusOS AI Reply</h3>
            <p className="mt-3 whitespace-pre-line">{messages.slice().reverse().find((m) => m.role === 'ai')?.text}</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default ChatPanel
