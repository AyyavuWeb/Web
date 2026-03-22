import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useState, useEffect } from 'react'

function Header({ showAdminButton = false }) {
  const navigate = useNavigate()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [])

  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession()
    setIsAdmin(!!session)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <header style={styles.header}>
      <Link to="/" style={styles.logoLink}>
        <div style={styles.logo}>
          <span style={styles.logoIcon}>
            <img src="/assets/images/Logo.png" alt="Logo" style={styles.logoImg} />
          </span>
          <b>Ayyavu Construction</b>
        </div>
      </Link>

      <nav>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <Link to="/" style={styles.navLink}>Home</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/about" style={styles.navLink}>About Us</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/projects" style={styles.navLink}>Projects</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/contact" style={styles.navLink}>Contact Us</Link>
          </li>
        </ul>
      </nav>

      {showAdminButton && isAdmin ? (
        <button onClick={handleLogout} style={styles.quoteBtn}>
          Logout
        </button>
      ) : showAdminButton ? (
        <Link to="/admin/login" style={styles.quoteBtn}>
          Admin
        </Link>
      ) : null}
    </header>
  )
}

const styles = {
  header: {
    width: '100%',
    padding: '16px 60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #e5e7eb',
    backgroundColor: '#ffffff',
  },
  logoLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  logo: {
    marginBottom: '-10px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontWeight: 600,
    fontSize: '18px',
  },
  logoIcon: {
    display: 'flex',
    justifyContent: 'center',
  },
  logoImg: {
    width: '28px',
    height: '28px',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    gap: '28px',
    fontSize: '14px',
  },
  navItem: {
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  },
  navLink: {
    color: 'inherit',
    textDecoration: 'none',
  },
  quoteBtn: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    padding: '10px 18px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    display: 'inline-block',
  },
}

export default Header
