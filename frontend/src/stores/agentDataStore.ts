import { create } from 'zustand'

export interface AgentResults {
  summary?: string
  agents?: string[]
  responses?: Record<string, any>
  todayTasks?: string[]
  weeklyPlanner?: string
  studyProgress?: number
  studyProgressDescription?: string
  weeklyCompletion?: number
  internshipRecommendations?: Array<{ title: string; company: string; match: number }>
  resumeScore?: number
  resumeHighlights?: string[]
  careerRoadmap?: string
  interviewReadiness?: string
  examTracker?: string
  coordinatorHealth?: string
  studyHealth?: string
  careerHealth?: string
}

interface AgentDataState {
  agentResults: AgentResults
  setAgentResults: (results: AgentResults) => void
  updateFromCoordinatorResponse: (response: any) => void
}

export const useAgentDataStore = create<AgentDataState>((set) => ({
  agentResults: {},
  setAgentResults: (agentResults) => set({ agentResults }),
  updateFromCoordinatorResponse: (response) => {
    const responses = response.responses || {}
    const summary = response.summary || ''

    const planner = responses.planner || {}
    const study = responses.study || {}
    const career = responses.career || {}
    const resume = responses.resume || {}
    const interview = responses.interview || {}

    const todayTasks = planner.tasks?.map((item: any) => item.task) || []
    const weeklyPlanner = planner.plan ? 'Study schedule updated with key milestones' : 'Awaiting planner output'
    const studyProgress = study.plan ? 72 : 48
    const studyProgressDescription = study.summary || 'Follow your latest study plan'
    const weeklyCompletion = planner.tasks ? Math.min(100, 60 + planner.tasks.length * 8) : 60
    const internshipRecommendations = career.recommendations || []
    const resumeScore = resume.score || 0
    const resumeHighlights = resume.highlights || []
    const careerRoadmap = career.interests ? `Roadmap built for ${career.interests.join(', ')}` : 'Career goals set'
    const interviewReadiness = interview.tips || interview.coaching || 'Interview readiness suggestions are ready'
    const examTracker = study.plan ? 'Next exam milestones scheduled in your study plan.' : 'No exam plan yet'

    set({
      agentResults: {
        summary,
        agents: response.agents,
        responses,
        todayTasks,
        weeklyPlanner,
        studyProgress,
        studyProgressDescription,
        weeklyCompletion,
        internshipRecommendations,
        resumeScore,
        resumeHighlights,
        careerRoadmap,
        interviewReadiness,
        examTracker,
        coordinatorHealth: response.agents?.includes('coordinator') ? 'Active' : 'Healthy',
        studyHealth: response.agents?.includes('study') ? 'On track' : 'Idle',
        careerHealth: response.agents?.includes('career') ? 'Engaged' : 'Idle',
      },
    })
  },
}))
