import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.brand}>
          <h3 style={styles.logo}>
            <span style={styles.logoWrapper}>
              <img src="/assets/images/Logo.png" alt="Logo" style={styles.logoImg} />
            </span>
            Ayyavu Construction
          </h3>
          <p style={styles.text}>
            Leading the industry with high-quality architectural solutions and
            sustainable building practices.
          </p>
        </div>

        <div style={styles.column}>
          <h4 style={styles.columnTitle}>Quick Links</h4>
          <ul style={styles.list}>
            <li style={styles.listItem}><Link to="/" style={styles.link}>Home</Link></li>
            <li style={styles.listItem}><Link to="/about" style={styles.link}>About Us</Link></li>
            <li style={styles.listItem}><Link to="/projects" style={styles.link}>Projects</Link></li>
            <li style={styles.listItem}><Link to="/contact" style={styles.link}>Contact Us</Link></li>
          </ul>
        </div>

        <div style={styles.column}>
          <h4 style={styles.columnTitle}>Projects</h4>
          <ul style={styles.list}>
            <li style={styles.listItem}><Link to="/projects?status=completed" style={styles.link}>Completed</Link></li>
            <li style={styles.listItem}><Link to="/projects?status=ongoing" style={styles.link}>Ongoing</Link></li>
            <li style={styles.listItem}><Link to="/projects?status=upcoming" style={styles.link}>Upcoming</Link></li>
          </ul>
        </div>

        <div style={styles.column}>
          <h4 style={styles.columnTitle}>Contact</h4>
          <p style={styles.contactText}>📍 Coimbatore, Tamil Nadu</p>
          <p style={styles.contactText}>📞 <a href="tel:+919360493616" style={styles.link}>+91 93604 93616</a></p>
          <p style={styles.contactText}>✉️ <a href="mailto:ayyavu.ayyavupromoters@gmail.com" style={styles.link}>ayyavu.ayyavupromoters@gmail.com</a></p>
        </div>
      </div>

      <div style={styles.bottom}>
        <p>© 2026 Ayyavu Construction. All rights reserved.</p>
      </div>
    </footer>
  )
}

const styles = {
  footer: {
    background: 'linear-gradient(180deg, #0b1220, #020617)',
    color: '#cbd5e1',
    padding: '70px 80px 30px',
    marginTop: 'auto',
  },
  container: {
    display: 'grid',
    gridTemplateColumns: '1.4fr 1fr 1fr 1.2fr',
    gap: '60px',
    marginBottom: '50px',
  },
  brand: {},
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '18px',
    fontWeight: 600,
    marginBottom: '18px',
  },
  logoWrapper: {
    display: 'flex',
  },
  logoImg: {
    width: '28px',
    height: '28px',
  },
  text: {
    fontSize: '14px',
    lineHeight: 1.7,
    margin: '18px 0 24px',
    color: '#94a3b8',
  },
  column: {},
  columnTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#ffffff',
    marginBottom: '18px',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    marginBottom: '12px',
  },
  link: {
    textDecoration: 'none',
    fontSize: '14px',
    color: '#94a3b8',
    transition: 'color 0.3s ease',
  },
  contactText: {
    fontSize: '14px',
    marginBottom: '14px',
    color: '#94a3b8',
  },
  bottom: {
    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
    paddingTop: '20px',
    fontSize: '13px',
    color: '#64748b',
  },
}

export default Footer
