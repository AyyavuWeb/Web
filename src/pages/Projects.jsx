import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { supabase } from '../lib/supabase'

function Projects() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [projects, setProjects] = useState([])
  const [filter, setFilter] = useState(searchParams.get('status') || 'All')
  const [selectedProject, setSelectedProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [filter])

  async function fetchProjects() {
    setLoading(true)
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
    setLoading(false)
  }

  function handleFilterChange(status) {
    setFilter(status)
    if (status === 'All') {
      setSearchParams({})
    } else {
      setSearchParams({ status })
    }
  }

  function openProjectModal(project) {
    setSelectedProject(project)
  }

  function closeProjectModal() {
    setSelectedProject(null)
  }
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header showAdminButton={true} />

      <section style={styles.section}>
        <h2 style={styles.title}>Our Projects</h2>
        <p style={styles.subtitle}>Explore our comprehensive portfolio of construction projects across residential, commercial, and industrial sectors.</p>

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
              {status !== 'All' && (
                <span style={styles.filterCount}>
                  ({projects.filter(p => p.status === status).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={styles.loading}>
            <div style={styles.spinner}></div>
            <p>Loading projects...</p>
          </div>
        ) : (
          <div style={styles.projectCards}>
            {projects.length > 0 ? (
              projects.map(project => (
                <div 
                  key={project.id} 
                  style={styles.projectCard}
                  onClick={() => openProjectModal(project)}
                >
                  <div
                    style={{
                      ...styles.projectImage,
                      backgroundImage: project.images?.[0]?.image
                        ? `url(${project.images[0].image})`
                        : 'url(/assets/images/completed.jpg)'
                    }}
                  />
                  <div style={{
                    ...styles.statusBadge,
                    backgroundColor: project.status === 'completed' ? '#22c55e' : 
                                   project.status === 'ongoing' ? '#f97316' : '#3b82f6'
                  }}>
                    {project.status.toUpperCase()}
                  </div>
                  <div style={styles.cardContent}>
                    <h3 style={styles.projectTitle}>{project.title}</h3>
                    <p style={styles.projectDesc}>{project.description}</p>
                    <div style={styles.projectMeta}>
                      {project.location && (
                        <p style={styles.projectInfo}>
                          <span style={styles.icon}>📍</span> {project.location}
                        </p>
                      )}
                      {project.price && (
                        <p style={styles.projectInfo}>
                          <span style={styles.icon}>💰</span> {project.price}
                        </p>
                      )}
                    </div>
                    <button style={styles.viewBtn}>View Details</button>
                  </div>
                </div>
              ))
            ) : (
              <div style={styles.noProjects}>
                <h3>No projects found</h3>
                <p>Try adjusting your filter or check back later for new projects.</p>
              </div>
            )}
          </div>
          )}
        </div>
      </section>

      {selectedProject && (
        <div style={styles.modalOverlay} onClick={closeProjectModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.modalClose} onClick={closeProjectModal}>×</button>
            <div style={styles.modalImages}>
              {selectedProject.images && selectedProject.images.length > 0 ? (
                selectedProject.images.map((img, index) => (
                  <img key={index} src={img.image} alt="Project" style={styles.modalImage} />
                ))
              ) : (
                <img src="/assets/images/completed.jpg" alt="Project" style={styles.modalImage} />
              )}
            </div>
            <div style={styles.modalInfo}>
              <div style={styles.modalHeader}>
                <h2>{selectedProject.title}</h2>
                <div style={{
                  ...styles.modalStatusBadge,
                  backgroundColor: selectedProject.status === 'completed' ? '#22c55e' : 
                                 selectedProject.status === 'ongoing' ? '#f97316' : '#3b82f6'
                }}>
                  {selectedProject.status.toUpperCase()}
                </div>
              </div>
              <p style={styles.modalDescription}>{selectedProject.description}</p>
              {selectedProject.details && <p style={styles.modalDetails}>{selectedProject.details}</p>}
              <div style={styles.modalMeta}>
                {selectedProject.location && (
                  <div style={styles.metaItem}>
                    <strong>Location:</strong> {selectedProject.location}
                  </div>
                )}
                {selectedProject.price && (
                  <div style={styles.metaItem}>
                    <strong>Investment:</strong> {selectedProject.price}
                  </div>
                )}
                <div style={styles.metaItem}>
                  <strong>Project Status:</strong> {selectedProject.status.charAt(0).toUpperCase() + selectedProject.status.slice(1)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}

const styles = {
  section: { padding: '50px 60px' },
  title: { fontSize: '36px', fontWeight: 700, textAlign: 'center', marginBottom: '10px' },
  subtitle: { fontSize: '16px', color: '#6b7280', textAlign: 'center', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' },
  filterBtns: { display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '40px', flexWrap: 'wrap' },
  filterBtn: { 
    padding: '10px 20px', 
    border: '1px solid #e5e7eb', 
    background: '#fff', 
    cursor: 'pointer', 
    borderRadius: '25px', 
    fontSize: '14px', 
    transition: 'all 0.3s ease',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  },
  filterBtnActive: { background: '#2563eb', color: '#fff', borderColor: '#2563eb' },
  filterCount: { fontSize: '12px', opacity: 0.8 },
  loading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '60px 20px',
    color: '#6b7280',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid #e5e7eb',
    borderTop: '3px solid #2563eb',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '15px',
  },
  projectCards: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '36px' },
  projectCard: { 
    background: '#ffffff', 
    borderRadius: '14px', 
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
    position: 'relative'
  },
  projectImage: { height: '200px', borderRadius: '10px', backgroundSize: 'cover', backgroundPosition: 'center', marginBottom: '15px' },
  statusBadge: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    padding: '5px 10px',
    fontSize: '11px',
    fontWeight: 700,
    color: '#ffffff',
    borderRadius: '4px',
    zIndex: 1,
  },
  cardContent: { padding: '20px' },
  projectTitle: { fontSize: '18px', fontWeight: 600, marginBottom: '10px' },
  projectDesc: { fontSize: '14px', color: '#6b7280', marginBottom: '15px', lineHeight: 1.5 },
  projectMeta: { marginBottom: '15px' },
  projectInfo: { fontSize: '13px', marginBottom: '5px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '5px' },
  icon: { fontSize: '12px' },
  viewBtn: {
    background: '#2563eb',
    color: '#ffffff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  noProjects: {
    gridColumn: '1/-1',
    textAlign: 'center',
    padding: '60px 20px',
    color: '#6b7280',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    maxWidth: '900px',
    maxHeight: '90vh',
    overflow: 'auto',
    position: 'relative',
    width: '100%',
  },
  modalClose: {
    position: 'absolute',
    top: '15px',
    right: '20px',
    background: 'rgba(0, 0, 0, 0.7)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '50%',
    width: '35px',
    height: '35px',
    fontSize: '20px',
    cursor: 'pointer',
    zIndex: 1001,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalImages: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '10px',
    padding: '20px',
  },
  modalImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  modalInfo: {
    padding: '0 20px 20px',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '15px',
  },
  modalStatusBadge: {
    padding: '6px 12px',
    fontSize: '12px',
    fontWeight: 700,
    color: '#ffffff',
    borderRadius: '6px',
  },
  modalDescription: {
    fontSize: '16px',
    color: '#6b7280',
    marginBottom: '15px',
    lineHeight: 1.6,
  },
  modalDetails: {
    fontSize: '14px',
    lineHeight: 1.6,
    marginBottom: '20px',
  },
  modalMeta: {
    borderTop: '1px solid #e5e7eb',
    paddingTop: '15px',
    display: 'grid',
    gap: '8px',
  },
  metaItem: {
    fontSize: '14px',
    color: '#374151',
  },
}

export default Projects
