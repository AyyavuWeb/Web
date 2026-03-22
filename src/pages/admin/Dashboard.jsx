import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { supabase } from '../../lib/supabase'

function AdminDashboard() {
  const navigate = useNavigate()

  useEffect(() => {
    checkAuth()
  }, [])

  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      navigate('/admin/login')
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0f172a' }}>
      <Header showAdminButton={true} />

      <div style={styles.dashboard}>
        <h1 style={styles.title}>Admin Dashboard</h1>

        <div style={styles.cards}>
          <div style={styles.card}>
            <h3>Add New Project</h3>
            <Link to="/admin/add-project" style={styles.cardBtn}>
              Add
            </Link>
          </div>

          <div style={styles.card}>
            <h3>Manage Projects</h3>
            <Link to="/admin/edit-projects" style={styles.cardBtn}>
              Edit
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

const styles = {
  dashboard: {
    textAlign: 'center',
    padding: '40px',
    color: 'white',
    minHeight: '60vh',
  },
  title: {
    marginBottom: '30px',
  },
  cards: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  },
  card: {
    background: '#1e293b',
    padding: '60px 40px',
    borderRadius: '12px',
    width: '320px',
  },
  cardBtn: {
    marginTop: '10px',
    padding: '8px 15px',
    background: '#38bdf8',
    color: 'black',
    borderRadius: '6px',
    textDecoration: 'none',
    display: 'inline-block',
    fontWeight: 600,
  },
}

export default AdminDashboard
