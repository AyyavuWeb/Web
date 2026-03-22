import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Projects from './pages/Projects'
import About from './pages/About'
import Contact from './pages/Contact'
import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'
import AdminAddProject from './pages/admin/AddProject'
import AdminEditProjects from './pages/admin/EditProjects'
import AdminUpdateProject from './pages/admin/UpdateProject'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/add-project" element={<AdminAddProject />} />
      <Route path="/admin/edit-projects" element={<AdminEditProjects />} />
      <Route path="/admin/update-project/:id" element={<AdminUpdateProject />} />
    </Routes>
  )
}

export default App
