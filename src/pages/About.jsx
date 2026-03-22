import Header from '../components/Header'
import Footer from '../components/Footer'

function About() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>About Ayyavu Construction</h1>
          <p style={styles.heroSubtitle}>Building dreams into reality since 2003</p>
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.contentGrid}>
          <div style={styles.textContent}>
            <h2 style={styles.sectionTitle}>Our Story</h2>
            <p style={styles.text}>
              Since 2003, Ayyavu Construction has been a trusted name in the construction industry.
              We specialize in creating structures that combine aesthetic excellence with structural integrity,
              delivering projects that stand the test of time.
            </p>
            
            <p style={styles.text}>
              Our journey began with a simple vision: to transform the construction landscape by delivering
              exceptional quality, innovative solutions, and unmatched customer service. Today, we are proud
              to have completed over 150 projects across Tamil Nadu and Karnataka.
            </p>
          </div>
          
          <div style={styles.imageContent}>
            <img src="/assets/images/about-building.png" alt="Construction" style={styles.aboutImage} />
          </div>
        </div>
      </section>

      <section style={styles.valuesSection}>
        <div style={styles.valuesGrid}>
          <div style={styles.valueCard}>
            <div style={styles.valueIcon}>🎯</div>
            <h3 style={styles.valueTitle}>Our Mission</h3>
            <p style={styles.valueText}>
              To deliver innovative construction solutions that exceed client expectations while maintaining
              the highest standards of quality and safety.
            </p>
          </div>
          
          <div style={styles.valueCard}>
            <div style={styles.valueIcon}>👁️</div>
            <h3 style={styles.valueTitle}>Our Vision</h3>
            <p style={styles.valueText}>
              To be recognized as the leading construction company that builds sustainable, modern
              structures for a better tomorrow.
            </p>
          </div>
          
          <div style={styles.valueCard}>
            <div style={styles.valueIcon}>⭐</div>
            <h3 style={styles.valueTitle}>Our Values</h3>
            <p style={styles.valueText}>
              Integrity, excellence, innovation, and customer satisfaction are the cornerstones
              of everything we do.
            </p>
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.content}>
          <h2 style={styles.sectionTitle}>Why Choose Ayyavu Construction</h2>
          <div style={styles.featuresGrid}>
            <div style={styles.featureItem}>
              <div style={styles.featureIcon}>🏆</div>
              <div>
                <h4 style={styles.featureTitle}>20+ Years Experience</h4>
                <p style={styles.featureDesc}>Two decades of expertise in residential, commercial, and industrial construction</p>
              </div>
            </div>
            
            <div style={styles.featureItem}>
              <div style={styles.featureIcon}>👨‍💼</div>
              <div>
                <h4 style={styles.featureTitle}>Certified Professionals</h4>
                <p style={styles.featureDesc}>Licensed architects, engineers, and skilled craftsmen</p>
              </div>
            </div>
            
            <div style={styles.featureItem}>
              <div style={styles.featureIcon}>🛡️</div>
              <div>
                <h4 style={styles.featureTitle}>Quality & Safety</h4>
                <p style={styles.featureDesc}>Uncompromising commitment to quality standards and safety protocols</p>
              </div>
            </div>
            
            <div style={styles.featureItem}>
              <div style={styles.featureIcon}>⏰</div>
              <div>
                <h4 style={styles.featureTitle}>Timely Delivery</h4>
                <p style={styles.featureDesc}>Consistent track record of completing projects on schedule</p>
              </div>
            </div>
            
            <div style={styles.featureItem}>
              <div style={styles.featureIcon}>💬</div>
              <div>
                <h4 style={styles.featureTitle}>Transparent Communication</h4>
                <p style={styles.featureDesc}>Regular updates and clear communication throughout the project lifecycle</p>
              </div>
            </div>
            
            <div style={styles.featureItem}>
              <div style={styles.featureIcon}>🌱</div>
              <div>
                <h4 style={styles.featureTitle}>Sustainable Practices</h4>
                <p style={styles.featureDesc}>Eco-friendly construction methods and sustainable building materials</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={styles.statsSection}>
        <h2 style={styles.sectionTitle}>Our Achievements</h2>
        <div style={styles.statsGrid}>
          <div style={styles.statItem}>
            <h3 style={styles.statNumber}>150+</h3>
            <p style={styles.statLabel}>Projects Completed</p>
          </div>
          <div style={styles.statItem}>
            <h3 style={styles.statNumber}>500+</h3>
            <p style={styles.statLabel}>Happy Clients</p>
          </div>
          <div style={styles.statItem}>
            <h3 style={styles.statNumber}>20+</h3>
            <p style={styles.statLabel}>Years Experience</p>
          </div>
          <div style={styles.statItem}>
            <h3 style={styles.statNumber}>100%</h3>
            <p style={styles.statLabel}>Quality Assured</p>
          </div>
        </div>
      </section>

      <section style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Ready to Build Your Dream Project?</h2>
        <p style={styles.ctaText}>Let's discuss how we can bring your vision to life</p>
        <a href="/contact" style={styles.ctaButton}>Get Started Today</a>
      </section>

      <Footer />
    </div>
  )
}

const styles = {
  heroSection: {
    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
    color: '#ffffff',
    padding: '80px 60px',
    textAlign: 'center',
  },
  heroContent: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  heroTitle: {
    fontSize: '42px',
    fontWeight: 700,
    marginBottom: '15px',
  },
  heroSubtitle: {
    fontSize: '18px',
    opacity: 0.9,
  },
  section: { 
    padding: '60px 60px',
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '60px',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  textContent: {},
  imageContent: {},
  aboutImage: {
    width: '100%',
    height: '300px',
    objectFit: 'cover',
    borderRadius: '12px',
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  sectionTitle: { 
    fontSize: '32px', 
    fontWeight: 700, 
    marginBottom: '30px',
    textAlign: 'center',
  },
  valuesSection: {
    background: '#f8fafc',
    padding: '60px 60px',
  },
  valuesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  valueCard: {
    background: '#ffffff',
    padding: '40px 30px',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  valueIcon: {
    fontSize: '48px',
    marginBottom: '20px',
  },
  valueTitle: {
    fontSize: '20px',
    fontWeight: 600,
    marginBottom: '15px',
  },
  valueText: {
    fontSize: '14px',
    color: '#6b7280',
    lineHeight: 1.6,
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '30px',
    marginTop: '40px',
  },
  featureItem: {
    display: 'flex',
    gap: '20px',
    padding: '20px',
    background: '#f8fafc',
    borderRadius: '10px',
  },
  featureIcon: {
    fontSize: '32px',
    flexShrink: 0,
  },
  featureTitle: {
    fontSize: '16px',
    fontWeight: 600,
    marginBottom: '8px',
  },
  featureDesc: {
    fontSize: '14px',
    color: '#6b7280',
    lineHeight: 1.5,
  },
  statsSection: {
    background: '#1f2937',
    color: '#ffffff',
    padding: '60px 60px',
    textAlign: 'center',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '40px',
    maxWidth: '800px',
    margin: '40px auto 0',
  },
  statItem: {
    padding: '20px',
  },
  statNumber: {
    fontSize: '36px',
    fontWeight: 700,
    color: '#60a5fa',
    marginBottom: '8px',
  },
  statLabel: {
    fontSize: '14px',
    opacity: 0.9,
  },
  ctaSection: {
    background: '#2563eb',
    color: '#ffffff',
    padding: '60px 60px',
    textAlign: 'center',
  },
  ctaTitle: {
    fontSize: '28px',
    fontWeight: 700,
    marginBottom: '15px',
  },
  ctaText: {
    fontSize: '16px',
    opacity: 0.9,
    marginBottom: '25px',
  },
  ctaButton: {
    background: '#ffffff',
    color: '#2563eb',
    padding: '14px 28px',
    borderRadius: '8px',
    fontWeight: 600,
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'transform 0.3s ease',
  },
  text: { fontSize: '15px', lineHeight: 1.7, color: '#6b7280', marginBottom: '20px' },
}

export default About