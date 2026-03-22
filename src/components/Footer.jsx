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
            <span>
              Ayyavu Construction
              <span style={styles.tagline}>Building Excellence Since 2003</span>
            </span>
          </h3>
          <p style={styles.text}>
            Leading the construction industry with innovative architectural solutions,
            sustainable building practices, and unwavering commitment to quality.
          </p>
          <div style={styles.socialLinks}>
            <a href="#" style={styles.socialLink}>📧</a>
            <a href="tel:+919360493616" style={styles.socialLink}>📞</a>
            <a href="#" style={styles.socialLink}>📍</a>
          </div>
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
          <h4 style={styles.columnTitle}>Services</h4>
          <ul style={styles.list}>
            <li style={styles.listItem}><span style={styles.link}>Residential Construction</span></li>
            <li style={styles.listItem}><span style={styles.link}>Commercial Buildings</span></li>
            <li style={styles.listItem}><span style={styles.link}>Industrial Projects</span></li>
            <li style={styles.listItem}><span style={styles.link}>Renovation & Remodeling</span></li>
          </ul>
        </div>

        <div style={styles.column}>
          <h4 style={styles.columnTitle}>Contact</h4>
          <div style={styles.contactItem}>
            <span style={styles.contactIcon}>📍</span>
            <span style={styles.contactText}>
              No-17, Vidhya Colony 5th cross<br />
              TVS Nagar, Coimbatore - 641025
            </span>
          </div>
          <div style={styles.contactItem}>
            <span style={styles.contactIcon}>📞</span>
            <span style={styles.contactText}>
              <a href="tel:+919360493616" style={styles.link}>+91 93604 93616</a><br />
              <a href="tel:+919345770330" style={styles.link}>+91 93457 70330</a>
            </span>
          </div>
          <div style={styles.contactItem}>
            <span style={styles.contactIcon}>✉️</span>
            <span style={styles.contactText}>
              <a href="mailto:ayyavu.ayyavupromoters@gmail.com" style={styles.link}>
                ayyavu.ayyavupromoters@gmail.com
              </a>
            </span>
          </div>
        </div>
      </div>

      <div style={styles.bottom}>
        <div style={styles.bottomContent}>
          <p>© 2026 Ayyavu Construction. All rights reserved.</p>
          <div style={styles.bottomLinks}>
            <span style={styles.bottomLink}>Privacy Policy</span>
            <span style={styles.separator}>|</span>
            <span style={styles.bottomLink}>Terms of Service</span>
            <span style={styles.separator}>|</span>
            <span style={styles.bottomLink}>Sitemap</span>
          </div>
        </div>
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
  tagline: {
    display: 'block',
    fontSize: '11px',
    fontWeight: 400,
    color: '#94a3b8',
    marginTop: '2px',
  },
  text: {
    fontSize: '14px',
    lineHeight: 1.7,
    margin: '18px 0 24px',
    color: '#94a3b8',
  },
  socialLinks: {
    display: 'flex',
    gap: '12px',
  },
  socialLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '50%',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'background-color 0.3s ease',
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
  contactItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    marginBottom: '14px',
  },
  contactIcon: {
    fontSize: '14px',
    marginTop: '1px',
  },
  contactText: {
    fontSize: '14px',
    color: '#94a3b8',
    lineHeight: 1.4,
  },
  bottom: {
    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
    paddingTop: '20px',
  },
  bottomContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '13px',
    color: '#64748b',
  },
  bottomLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  bottomLink: {
    fontSize: '13px',
    color: '#64748b',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  },
  separator: {
    color: '#64748b',
    fontSize: '13px',
  },
}

export default Footer
