import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { supabase } from '../lib/supabase'

function Home() {
  const [projects, setProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    fetchProjects()
  }, [])

  async function fetchProjects() {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3)

    if (data) {
      const projectsWithImages = await Promise.all(
        data.map(async (project) => {
          const { data: images } = await supabase
            .from('project_images')
            .select('image')
            .eq('project_id', project.id)
            .limit(3)
          return { ...project, images }
        })
      )
      setProjects(projectsWithImages)
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
      <Header />

      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Building Trust. Shaping Tomorrow.</h1>
          <p style={styles.heroText}>
            Expert residential, commercial, and industrial construction services with over 20 years of experience in delivering quality projects across Tamil Nadu.
          </p>
          <div style={styles.heroButtons}>
            <Link to="/projects" style={{ ...styles.btn, ...styles.primaryBtn }}>
              View Projects
            </Link>
            <Link to="/contact" style={{ ...styles.btn, ...styles.secondaryBtn }}>
              Get Quote
            </Link>
          </div>
        </div>
      </section>

      <section style={styles.statsSection}>
        <div style={styles.statsContainer}>
          <div style={styles.statCard}>
            <h3 style={styles.statNumber}>20+</h3>
            <p style={styles.statLabel}>Years Experience</p>
          </div>
          <div style={styles.statCard}>
            <h3 style={styles.statNumber}>150+</h3>
            <p style={styles.statLabel}>Projects Completed</p>
          </div>
          <div style={styles.statCard}>
            <h3 style={styles.statNumber}>500+</h3>
            <p style={styles.statLabel}>Happy Clients</p>
          </div>
          <div style={styles.statCard}>
            <h3 style={styles.statNumber}>100%</h3>
            <p style={styles.statLabel}>Quality Assured</p>
          </div>
        </div>
      </section>
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Our Project Journey</h2>
        <p style={styles.sectionSubtitle}>Discover our latest construction projects and architectural achievements</p>
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
                  ...styles.statusBadge,
                  backgroundColor: project.status === 'completed' ? '#22c55e' : 
                                 project.status === 'ongoing' ? '#f97316' : '#3b82f6'
                }}>
                  {project.status.toUpperCase()}
                </div>
                <h3 style={styles.projectTitle}>{project.title}</h3>
                <p style={styles.projectDesc}>{project.description}</p>
                <div style={styles.projectFooter}>
                  {project.location && <p style={styles.projectLocation}>📍 {project.location}</p>}
                  <button onClick={() => openProjectModal(project)} style={styles.projectLink}>
                    View Details →
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div style={styles.noProjects}>
              <h3>Projects Coming Soon</h3>
              <p>We're preparing to showcase our amazing construction projects. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      <section style={styles.servicesSection}>
        <h2 style={styles.sectionTitle}>Our Services</h2>
        <div style={styles.servicesGrid}>
          <div style={styles.serviceCard}>
            <div style={styles.serviceIcon}>🏠</div>
            <h3>Residential Construction</h3>
            <p>Custom homes, villas, and residential complexes built with precision and care.</p>
          </div>
          <div style={styles.serviceCard}>
            <div style={styles.serviceIcon}>🏢</div>
            <h3>Commercial Buildings</h3>
            <p>Office complexes, retail spaces, and commercial developments for modern businesses.</p>
          </div>
          <div style={styles.serviceCard}>
            <div style={styles.serviceIcon}>🏭</div>
            <h3>Industrial Projects</h3>
            <p>Warehouses, factories, and industrial facilities with advanced infrastructure.</p>
          </div>
          <div style={styles.serviceCard}>
            <div style={styles.serviceIcon}>🔧</div>
            <h3>Renovation & Remodeling</h3>
            <p>Transform existing spaces with our expert renovation and remodeling services.</p>
          </div>
        </div>
      </section>
      <section style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Ready to start your next project?</h2>
        <p style={styles.ctaSubtitle}>Let's discuss your vision and bring it to life with our expertise</p>
        <Link to="/contact" style={styles.ctaBtn}>Request a Consultation</Link>
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
              <h2>{selectedProject.title}</h2>
              <p style={styles.modalDescription}>{selectedProject.description}</p>
              {selectedProject.details && <p style={styles.modalDetails}>{selectedProject.details}</p>}
              <div style={styles.modalMeta}>
                {selectedProject.location && <p><strong>Location:</strong> {selectedProject.location}</p>}
                {selectedProject.price && <p><strong>Investment:</strong> {selectedProject.price}</p>}
                <p><strong>Status:</strong> <span style={{
                  color: selectedProject.status === 'completed' ? '#22c55e' : 
                        selectedProject.status === 'ongoing' ? '#f97316' : '#3b82f6'
                }}>{selectedProject.status.toUpperCase()}</span></p>
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
  hero: {
    padding: '60px 60px',
    background: 'linear-gradient(to right, rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.25)), url("/assets/images/Hero.png") center/cover',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    minHeight: '500px',
  },
  heroContent: {
    maxWidth: '520px',
  },
  heroTitle: {
    fontSize: '44px',
    lineHeight: 1.2,
    fontWeight: 700,
    marginBottom: '20px',
  },
  heroText: {
    fontSize: '16px',
    lineHeight: 1.6,
    marginBottom: '28px',
    opacity: 0.95,
  },
  heroButtons: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  },
  btn: {
    padding: '12px 22px',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'all 0.3s ease',
    fontWeight: 600,
  },
  primaryBtn: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
  },
  secondaryBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#ffffff',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(10px)',
  },
  statsSection: {
    padding: '60px 60px',
    background: '#f8fafc',
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '40px',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  statCard: {
    textAlign: 'center',
    padding: '20px',
  },
  statNumber: {
    fontSize: '36px',
    fontWeight: 700,
    color: '#2563eb',
    marginBottom: '8px',
  },
  statLabel: {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: 600,
  },
  section: {
    padding: '50px 60px',
  },
  sectionTitle: {
    fontSize: '32px',
    fontWeight: 700,
    marginBottom: '40px',
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: '16px',
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: '50px',
  },
  projectCards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '36px',
  },
  projectCard: {
    background: '#ffffff',
    borderRadius: '14px',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    position: 'relative',
    cursor: 'pointer',
  },
  projectImage: {
    height: '200px',
    borderRadius: '10px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    marginBottom: '15px',
  },
  statusBadge: {
    position: 'absolute',
    top: '30px',
    right: '30px',
    padding: '4px 8px',
    fontSize: '10px',
    fontWeight: 700,
    color: '#ffffff',
    borderRadius: '4px',
  },
  projectTitle: {
    fontSize: '18px',
    fontWeight: 600,
    marginBottom: '10px',
  },
  projectDesc: {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '15px',
    lineHeight: 1.5,
  },
  projectFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  projectLocation: {
    fontSize: '12px',
    color: '#6b7280',
    margin: 0,
  },
  projectLink: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#2563eb',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  },
  noProjects: {
    gridColumn: '1/-1',
    textAlign: 'center',
    padding: '60px 20px',
    color: '#6b7280',
  },
  servicesSection: {
    padding: '60px 60px',
    background: '#f8fafc',
  },
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px',
  },
  serviceCard: {
    background: '#ffffff',
    padding: '30px 20px',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  serviceIcon: {
    fontSize: '40px',
    marginBottom: '15px',
  },
  ctaSection: {
    background: '#1f6fe5',
    color: '#ffffff',
    padding: '50px 60px',
    textAlign: 'center',
  },
  ctaTitle: {
    fontSize: '28px',
    fontWeight: 700,
    marginBottom: '20px',
  },
  ctaSubtitle: {
    fontSize: '16px',
    opacity: 0.9,
    marginBottom: '25px',
  },
  ctaBtn: {
    background: '#ffffff',
    color: '#1f6fe5',
    padding: '12px 26px',
    borderRadius: '8px',
    fontWeight: 600,
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'transform 0.3s ease',
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
    maxWidth: '800px',
    maxHeight: '90vh',
    overflow: 'auto',
    position: 'relative',
  },
  modalClose: {
    position: 'absolute',
    top: '15px',
    right: '20px',
    background: 'rgba(0, 0, 0, 0.5)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    fontSize: '18px',
    cursor: 'pointer',
    zIndex: 1001,
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
  modalDescription: {
    fontSize: '16px',
    color: '#6b7280',
    marginBottom: '15px',
  },
  modalDetails: {
    fontSize: '14px',
    lineHeight: 1.6,
    marginBottom: '20px',
  },
  modalMeta: {
    borderTop: '1px solid #e5e7eb',
    paddingTop: '15px',
    fontSize: '14px',
  },
}

export default Home
