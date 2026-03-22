import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { supabase } from '../lib/supabase'

function Home() {
  const [projects, setProjects] = useState([])

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
            .limit(1)
          return { ...project, images }
        })
      )
      setProjects(projectsWithImages)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Building Trust. Shaping Tomorrow.</h1>
          <p style={styles.heroText}>
            Expert residential, commercial, and industrial construction services.
          </p>
          <div style={styles.heroButtons}>
            <Link to="/projects" style={{ ...styles.btn, ...styles.primaryBtn }}>
              View Projects
            </Link>
            <Link to="/contact" style={{ ...styles.btn, ...styles.secondaryBtn }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Our Project Journey</h2>
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
                <h3 style={styles.projectTitle}>{project.title}</h3>
                <p style={styles.projectDesc}>{project.description}</p>
                <Link to={`/projects`} style={styles.projectLink}>View Details →</Link>
              </div>
            ))
          ) : (
            <p>No projects yet. Check back soon!</p>
          )}
        </div>
      </section>

      <section style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Ready to start your next project?</h2>
        <Link to="/contact" style={styles.ctaBtn}>Request a Consultation</Link>
      </section>

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
  },
  heroButtons: {
    display: 'flex',
    gap: '16px',
  },
  btn: {
    padding: '12px 22px',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'all 0.3s ease',
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
  },
  projectImage: {
    height: '200px',
    borderRadius: '10px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    marginBottom: '15px',
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
  },
  projectLink: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#2563eb',
    textDecoration: 'none',
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
  ctaBtn: {
    background: '#ffffff',
    color: '#1f6fe5',
    padding: '12px 26px',
    borderRadius: '8px',
    fontWeight: 600,
    textDecoration: 'none',
    display: 'inline-block',
  },
}

export default Home
