const BASE_URL = (import.meta as any).env?.VITE_API_URL ?? 'http://localhost:8000'

async function fetchJson(path: string, options?: RequestInit) {
  const response = await fetch(`${BASE_URL}${path}`, options)
  if (!response.ok) {
    // Try to extract a helpful error message from the response body.
    // Only expose the user-friendly message, not raw backend details.
    let errText = response.statusText
    try {
      const body = await response.json()
      if (body?.detail) errText = body.detail
      else if (body?.error) errText = body.error
      else if (body?.message) errText = body.message
    } catch (e) {
      try {
        const text = await response.text()
        if (text) errText = text
      } catch {}
    }
    throw new Error(errText || `Request failed with status ${response.status}`)
  }
  return response.json()
}

export async function sendChat(body: { user_id: string; message: string }) {
  return fetchJson('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

export async function getCalendar() {
  return fetchJson('/api/mcp/calendar')
}

export async function getInternships() {
  return fetchJson('/api/agents/internship-search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: 'student-1', payload: { interests: ['AI', 'Data'] } }),
  } as RequestInit)
}

export async function getResumeScore() {
  return fetchJson('/api/agents/resume-review', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: 'student-1', payload: { resumeText: 'Sample resume content' } }),
  } as RequestInit)
}

export async function dispatchRequest(body: { user_id: string; payload: object }) {
  const json = await fetchJson('/api/agents/dispatch', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return json.result ?? json
}

export async function getAgentActivity() {
  return fetchJson('/api/agents/activity')
}
