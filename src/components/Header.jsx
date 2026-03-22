import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useState, useEffect } from 'react'

function Header({ showAdminButton = false }) {
  const navigate = useNavigate()
  const [isAdmin, setIsAdmin] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [])

  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession()
    setIsAdmin(!!session)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    setIsAdmin(false)
    navigate('/')
  }

  function toggleMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  return (
    <header style={styles.header}>
      <Link to="/" style={styles.logoLink}>
        <div style={styles.logo}>
          <span style={styles.logoIcon}>
            <img src="/assets/images/Logo.png" alt="Logo" style={styles.logoImg} />
          </span>
          <span style={styles.logoText}>
            <b>Ayyavu Construction</b>
            <span style={styles.logoTagline}>Building Excellence</span>
          </span>
        </div>
      </Link>

      <button style={styles.mobileMenuBtn} onClick={toggleMobileMenu}>
        <span style={styles.hamburger}></span>
        <span style={styles.hamburger}></span>
        <span style={styles.hamburger}></span>
      </button>

      <nav style={{
        ...styles.nav,
        ...(isMobileMenuOpen ? styles.navMobileOpen : {})
      }}>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <Link to="/" style={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/about" style={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/projects" style={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>Projects</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/contact" style={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
          </li>
        </ul>

        {showAdminButton && (
          <div style={styles.adminSection}>
            {isAdmin ? (
              <button onClick={handleLogout} style={styles.quoteBtn}>
                Logout
              </button>
            ) : (
              <Link to="/admin/login" style={styles.quoteBtn} onClick={() => setIsMobileMenuOpen(false)}>
                Admin
              </Link>
            )}
          </div>
        )}
      </nav>
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
    position: 'relative',
    zIndex: 100,
  },
  logoLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logoIcon: {
    display: 'flex',
    justifyContent: 'center',
  },
  logoImg: {
    width: '28px',
    height: '28px',
  },
  logoText: {
    display: 'flex',
    flexDirection: 'column',
  },
  logoTagline: {
    fontSize: '10px',
    color: '#6b7280',
    fontWeight: 400,
    marginTop: '-2px',
  },
  mobileMenuBtn: {
    display: 'none',
    flexDirection: 'column',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '5px',
    gap: '3px',
  },
  hamburger: {
    width: '20px',
    height: '2px',
    backgroundColor: '#374151',
    transition: 'all 0.3s ease',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  navMobileOpen: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e5e7eb',
    padding: '20px 60px',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '15px',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    gap: '28px',
    fontSize: '14px',
    margin: 0,
    padding: 0,
  },
  navItem: {
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  },
  navLink: {
    color: 'inherit',
    textDecoration: 'none',
    fontWeight: 500,
    transition: 'color 0.3s ease',
  },
  adminSection: {
    display: 'flex',
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
    fontWeight: 600,
  },
}

// Add responsive styles
const mediaQuery = window.matchMedia('(max-width: 768px)')
if (mediaQuery.matches) {
  styles.header.padding = '16px 20px'
  styles.mobileMenuBtn.display = 'flex'
  styles.nav.display = 'none'
  styles.navMobileOpen.display = 'flex'
  styles.navList.flexDirection = 'column'
  styles.navList.gap = '15px'
  styles.navList.width = '100%'
}
export default Header
