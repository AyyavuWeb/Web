import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

function AdminEditProjects() {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])

  useEffect(() => {
    checkAuth()
    fetchProjects()
  }, [])

  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      navigate('/admin/login')
    }
  }

  async function fetchProjects() {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) {
      const projectsWithImages = await Promise.all(
        data.map(async (project) => {
          const { data: images } = await supabase
            .from('project_images')
            .select('image')
            .eq('project_id', project.id)
            .limit(1)
          return { ...project, images }
        })
      )
      setProjects(projectsWithImages)
    }
  }

  return (
    <div style={styles.container}>
      <Link to="/admin/dashboard" style={styles.backBtn}>
        Back
      </Link>

      <h1 style={styles.title}>Manage Projects</h1>

      <div style={styles.projectCards}>
        {projects.map(project => (
          <div key={project.id} style={styles.projectCard}>
            {project.images?.[0]?.image && (
              <img
                src={project.images[0].image}
                alt="Project"
                style={styles.projectImage}
              />
            )}

            <h3 style={styles.projectTitle}>{project.title}</h3>
            <p style={styles.projectDesc}>{project.description.substring(0, 60)}...</p>

            <Link
              to={`/admin/update-project/${project.id}`}
              style={styles.editBtn}
            >
              Edit
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  container: { background: '#0f172a', color: 'white', padding: '40px', minHeight: '100vh' },
  backBtn: { background: '#2563eb', color: 'white', padding: '10px 18px', borderRadius: '8px', textDecoration: 'none', display: 'inline-block', marginBottom: '20px' },
  title: { marginBottom: '30px' },
  projectCards: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '36px' },
  projectCard: { background: '#1e293b', padding: '22px', borderRadius: '18px' },
  projectImage: { width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px', marginBottom: '10px' },
  projectTitle: { fontSize: '18px', fontWeight: 600, marginBottom: '10px' },
  projectDesc: { fontSize: '14px', color: '#94a3b8', marginBottom: '18px' },
  editBtn: { background: '#2563eb', padding: '8px 15px', borderRadius: '6px', color: 'white', textDecoration: 'none', display: 'inline-block' },
}

export default AdminEditProjects
