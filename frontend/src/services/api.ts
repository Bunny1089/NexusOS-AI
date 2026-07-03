const BASE_URL = (import.meta as any).env?.VITE_API_URL ?? 'http://localhost:8000'

async function fetchJson(path: string, options?: RequestInit) {
  const response = await fetch(`${BASE_URL}${path}`, options)
  if (!response.ok) {
    let errText = response.statusText
    try {
      const body = await response.json()
      if (body?.detail) errText = body.detail
      else if (body?.error) errText = body.error
      else if (body?.message) errText = body.message
    } catch {
      try {
        const text = await response.text()
        if (text) errText = text
      } catch {}
    }
    throw new Error(errText || `Request failed with status ${response.status}`)
  }
  return response.json()
}

function unwrapCoordinator(result: any, agent?: string) {
  const root = result?.result ?? result
  if (agent && root?.responses?.[agent]) {
    return root.responses[agent]
  }
  return root
}

export async function sendChat(body: { user_id: string; message: string }) {
  return fetchJson('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

export async function getDashboard(userId = 'student-1') {
  return fetchJson(`/api/dashboard?user_id=${encodeURIComponent(userId)}`)
}

export async function getCalendar() {
  const payload = await fetchJson('/api/mcp/calendar')
  return Array.isArray(payload) ? payload : payload?.events ?? []
}

export async function getDocuments(keyword = '') {
  const payload = await fetchJson(`/api/mcp/documents?keyword=${encodeURIComponent(keyword)}`)
  return payload?.documents ?? []
}

export async function getSearchResults(query: string) {
  const payload = await fetchJson(`/api/mcp/search?query=${encodeURIComponent(query)}`)
  return payload?.results ?? []
}

export async function getInternships() {
  const json = await fetchJson('/api/agents/internship-search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: 'student-1', payload: { request_text: 'Find internships', interests: ['AI', 'Data'] } }),
  } as RequestInit)
  return unwrapCoordinator(json, 'internship')
}

export async function getResumeScore(resumeText: string) {
  const json = await fetchJson('/api/agents/resume-review', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: 'student-1', payload: { request_text: 'Review my resume', resume_text: resumeText, resumeText } }),
  } as RequestInit)
  return unwrapCoordinator(json, 'resume')
}

export async function getPlannerPlan() {
  const json = await fetchJson('/api/agents/plan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: 'student-1', payload: { request_text: 'Create a weekly study plan', goals: { exam: 'Capstone and interviews' } } }),
  } as RequestInit)
  return unwrapCoordinator(json, 'planner')
}

export async function getStudyPlan() {
  const json = await fetchJson('/api/agents/study-plan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: 'student-1', payload: { request_text: 'Create a study plan', goals: { exam: 'Capstone and interviews' } } }),
  } as RequestInit)
  return unwrapCoordinator(json, 'study')
}

export async function getCareerRecommendations() {
  const json = await fetchJson('/api/agents/career', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: 'student-1', payload: { request_text: 'Find career opportunities', interests: ['AI', 'Product'] } }),
  } as RequestInit)
  return unwrapCoordinator(json, 'career')
}

export async function getInterviewCoach(role = 'intern') {
  const json = await fetchJson('/api/agents/interview-coach', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: 'student-1', payload: { request_text: 'Prepare interview coaching', role } }),
  } as RequestInit)
  return unwrapCoordinator(json, 'interview')
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
