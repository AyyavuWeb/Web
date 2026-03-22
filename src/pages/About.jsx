import Header from '../components/Header'
import Footer from '../components/Footer'

function About() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <section style={styles.section}>
        <div style={styles.content}>
          <h2 style={styles.title}>About Ayyavu Construction</h2>
          <p style={styles.text}>
            Since 2003, Ayyavu Construction has been a trusted name in the construction industry.
            We specialize in creating structures that combine aesthetic excellence with structural integrity.
          </p>

          <h3 style={styles.subtitle}>Our Mission</h3>
          <p style={styles.text}>
            To deliver innovative construction solutions that exceed client expectations while maintaining
            the highest standards of quality and safety.
          </p>

          <h3 style={styles.subtitle}>Our Vision</h3>
          <p style={styles.text}>
            To be recognized as the leading construction company that builds sustainable, modern
            structures for a better tomorrow.
          </p>

          <h3 style={styles.subtitle}>Why Choose Us</h3>
          <ul style={styles.list}>
            <li>✓ 20+ years of industry experience</li>
            <li>✓ Certified architects and engineers</li>
            <li>✓ Commitment to quality and safety</li>
            <li>✓ On-time project delivery</li>
            <li>✓ Transparent communication</li>
            <li>✓ Sustainable building practices</li>
          </ul>
        </div>
      </section>

      <Footer />
    </div>
  )
}

const styles = {
  section: { padding: '50px 60px', maxWidth: '800px', margin: '0 auto' },
  content: {},
  title: { fontSize: '32px', fontWeight: 700, marginBottom: '20px' },
  subtitle: { fontSize: '20px', fontWeight: 600, marginTop: '30px', marginBottom: '15px' },
  text: { fontSize: '15px', lineHeight: 1.7, color: '#6b7280', marginBottom: '20px' },
  list: { fontSize: '15px', color: '#6b7280', lineHeight: 2, marginLeft: '20px' },
}

export default About
