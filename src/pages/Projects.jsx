import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { supabase } from '../lib/supabase'

function Projects() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [projects, setProjects] = useState([])
  const [filter, setFilter] = useState(searchParams.get('status') || 'All')

  useEffect(() => {
    fetchProjects()
  }, [filter])

  async function fetchProjects() {
    let query = supabase.from('projects').select('*').order('created_at', { ascending: false })

    if (filter !== 'All') {
      query = query.eq('status', filter)
    }

    const { data } = await query

    if (data) {
      const projectsWithImages = await Promise.all(
        data.map(async (project) => {
          const { data: images } = await supabase
            .from('project_images')
            .select('image')
            .eq('project_id', project.id)
          return { ...project, images }
        })
      )
      setProjects(projectsWithImages)
    }
  }

  function handleFilterChange(status) {
    setFilter(status)
    if (status === 'All') {
      setSearchParams({})
    } else {
      setSearchParams({ status })
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header showAdminButton={true} />

      <section style={styles.section}>
        <h2 style={styles.title}>Our Projects</h2>
        <p style={styles.subtitle}>A transparent look into our project portfolio.</p>

        <div style={styles.filterBtns}>
          {['All', 'ongoing', 'completed', 'upcoming'].map(status => (
            <button
              key={status}
              onClick={() => handleFilterChange(status)}
              style={{
                ...styles.filterBtn,
                ...(filter === status ? styles.filterBtnActive : {})
              }}
            >
              {status === 'All' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        <div style={styles.projectCards}>
          {projects.length > 0 ? (
            projects.map(project => (
              <div key={project.id} style={styles.projectCard}>
                <div
                  style={{
                    ...styles.projectImage,
                    backgroundImage: project.images?.[0]?.image
                      ? `url(${project.images[0].image})`
                      : 'url(/assets/images/completed.jpg)'
                  }}
                />
                <div style={{
                  padding: '5px 8px',
                  fontSize: '11px',
                  fontWeight: 600,
                  backgroundColor: project.status === 'completed' ? '#22c55e' : project.status === 'ongoing' ? '#f97316' : '#3b82f6',
                  color: '#ffffff',
                  borderRadius: '4px',
                  display: 'inline-block',
                  marginBottom: '10px'
                }}>
                  {project.status.toUpperCase()}
                </div>
                <h3 style={styles.projectTitle}>{project.title}</h3>
                <p style={styles.projectDesc}>{project.description}</p>
                {project.location && <p style={styles.projectInfo}><strong>Location:</strong> {project.location}</p>}
                {project.price && <p style={styles.projectInfo}><strong>Price:</strong> {project.price}</p>}
              </div>
            ))
          ) : (
            <p style={{ gridColumn: '1/-1', textAlign: 'center' }}>No projects found.</p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

const styles = {
  section: { padding: '50px 60px' },
  title: { fontSize: '36px', fontWeight: 700, textAlign: 'center', marginBottom: '10px' },
  subtitle: { fontSize: '15px', color: '#6b7280', textAlign: 'center', marginBottom: '40px' },
  filterBtns: { display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '40px', flexWrap: 'wrap' },
  filterBtn: { padding: '8px 18px', border: '1px solid #ccc', background: '#fff', cursor: 'pointer', borderRadius: '25px', fontSize: '14px', transition: '0.3s' },
  filterBtnActive: { background: '#2563eb', color: '#fff', borderColor: '#2563eb' },
  projectCards: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '36px' },
  projectCard: { background: '#ffffff', borderRadius: '14px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
  projectImage: { height: '200px', borderRadius: '10px', backgroundSize: 'cover', backgroundPosition: 'center', marginBottom: '15px' },
  projectTitle: { fontSize: '18px', fontWeight: 600, marginBottom: '10px' },
  projectDesc: { fontSize: '14px', color: '#6b7280', marginBottom: '10px' },
  projectInfo: { fontSize: '14px', marginBottom: '8px', color: '#6b7280' },
}

export default Projects
