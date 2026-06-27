import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Shell from './components/Shell'
import Dashboard from './pages/Dashboard'
import Workspace from './pages/Workspace'
import Study from './pages/Study'
import Planner from './pages/Planner'
import Exams from './pages/Exams'
import Resume from './pages/Resume'
import Career from './pages/Career'
import Interview from './pages/Interview'
import Documents from './pages/Documents'
import Calendar from './pages/Calendar'
import Settings from './pages/Settings'
import Landing from './pages/Landing'

function App() {
  return (
    <BrowserRouter>
      <Shell>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workspace" element={<Workspace />} />
          <Route path="/study" element={<Study />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/exams" element={<Exams />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/career" element={<Career />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Shell>
    </BrowserRouter>
  )
}

export default App
