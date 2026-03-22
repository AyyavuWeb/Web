import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('')
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success')
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      setIsSubmitting(false)
      
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(''), 5000)
    }, 1000)
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Get in Touch</h1>
          <p style={styles.heroSubtitle}>Ready to start your construction project? Let's discuss your vision.</p>
        </div>
      </section>
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.left}>
            <h2 style={styles.title}>Contact Information</h2>
            <p style={styles.subtitle}>Reach out to us through any of these channels</p>

            <div style={styles.infoCard}>
              <div style={styles.infoIcon}>📍</div>
              <div>
                <h4 style={styles.infoTitle}>Office Address</h4>
                <p style={styles.infoText}>
                  No-17, Vidhya Colony 5th cross, Thadagam rd<br />
                  TVS Nagar, Coimbatore - 641025<br />
                  Tamil Nadu, India
                </p>
              </div>
            </div>

            <div style={styles.infoCard}>
              <div style={styles.infoIcon}>📞</div>
              <div>
                <h4 style={styles.infoTitle}>Phone Numbers</h4>
                <p style={styles.infoText}>
                  <a href="tel:+919360493616" style={styles.link}>+91 93604 93616</a><br />
                  <a href="tel:+919345770330" style={styles.link}>+91 93457 70330</a>
                </p>
              </div>
            </div>

            <div style={styles.infoCard}>
              <div style={styles.infoIcon}>✉️</div>
              <div>
                <h4 style={styles.infoTitle}>Email Address</h4>
                <p style={styles.infoText}>
                  <a href="mailto:ayyavu.ayyavupromoters@gmail.com" style={styles.link}>
                    ayyavu.ayyavupromoters@gmail.com
                  </a>
                </p>
              </div>
            </div>

            <div style={styles.infoCard}>
              <div style={styles.infoIcon}>🕒</div>
              <div>
                <h4 style={styles.infoTitle}>Business Hours</h4>
                <p style={styles.infoText}>
                  Monday - Saturday: 9:00 AM - 6:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>

          <div style={styles.right}>
            <h3 style={styles.formTitle}>Send us a Message</h3>
            <p style={styles.formSubtitle}>Fill out the form below and we'll get back to you within 24 hours</p>
            
            {submitStatus === 'success' && (
              <div style={styles.successMessage}>
                ✅ Thank you for your message! We'll get back to you within 24 hours.
              </div>
            )}
            
            <form style={styles.form} onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Enter your phone number"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Subject *</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  style={styles.input}
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="residential">Residential Construction</option>
                  <option value="commercial">Commercial Construction</option>
                  <option value="industrial">Industrial Construction</option>
                  <option value="renovation">Renovation & Remodeling</option>
                  <option value="consultation">General Consultation</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  style={{ ...styles.input, minHeight: '120px' }}
                  placeholder="Tell us about your project requirements..."
                  required
                />
              </div>

              <button 
                type="submit" 
                style={{
                  ...styles.submitBtn,
                  ...(isSubmitting ? styles.submitBtnDisabled : {})
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <section style={styles.mapSection}>
        <h2 style={styles.sectionTitle}>Find Us</h2>
        <div style={styles.mapContainer}>
          <div style={styles.mapPlaceholder}>
            <img src="/assets/images/map-placeholder.png" alt="Location Map" style={styles.mapImage} />
            <div style={styles.mapOverlay}>
              <p>📍 Coimbatore, Tamil Nadu</p>
              <a 
                href="https://maps.google.com/?q=Coimbatore,Tamil+Nadu" 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.mapLink}
              >
                View on Google Maps
              </a>
            </div>
          </div>
        </div>
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
  section: { padding: '60px 60px' },
  container: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' },
  left: {},
  title: { fontSize: '28px', fontWeight: 700, marginBottom: '10px' },
  subtitle: { fontSize: '16px', color: '#6b7280', marginBottom: '40px' },
  infoCard: { 
    marginBottom: '25px', 
    padding: '20px', 
    background: '#f8fafc', 
    borderRadius: '12px',
    display: 'flex',
    gap: '15px',
    alignItems: 'flex-start'
  },
  infoIcon: {
    fontSize: '24px',
    flexShrink: 0,
  },
  infoTitle: {
    fontSize: '16px',
    fontWeight: 600,
    marginBottom: '8px',
  },
  infoText: {
    fontSize: '14px',
    color: '#6b7280',
    lineHeight: 1.5,
  },
  link: { color: '#2563eb', textDecoration: 'none' },
  right: { background: '#ffffff', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
  formTitle: {
    fontSize: '24px',
    fontWeight: 700,
    marginBottom: '8px',
  },
  formSubtitle: {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '25px',
  },
  successMessage: {
    background: '#d1fae5',
    color: '#065f46',
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '14px',
    border: '1px solid #a7f3d0',
  },
  form: {},
  formGroup: { marginBottom: '20px' },
  label: { display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px' },
  input: { 
    width: '100%', 
    padding: '12px', 
    border: '1px solid #d1d5db', 
    borderRadius: '8px', 
    fontSize: '14px', 
    fontFamily: 'inherit',
    transition: 'border-color 0.3s ease',
  },
  submitBtn: { 
    width: '100%', 
    padding: '14px', 
    background: '#2563eb', 
    color: '#fff', 
    border: 'none', 
    borderRadius: '8px', 
    cursor: 'pointer', 
    fontWeight: 600,
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
  submitBtnDisabled: {
    background: '#9ca3af',
    cursor: 'not-allowed',
  },
  mapSection: {
    background: '#f8fafc',
    padding: '60px 60px',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: '28px',
    fontWeight: 700,
    marginBottom: '30px',
  },
  mapContainer: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  mapPlaceholder: {
    position: 'relative',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  mapImage: {
    width: '100%',
    height: '300px',
    objectFit: 'cover',
  },
  mapOverlay: {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    background: 'rgba(255, 255, 255, 0.95)',
    padding: '15px 20px',
    borderRadius: '8px',
    backdropFilter: 'blur(10px)',
  },
  mapLink: {
    color: '#2563eb',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: '14px',
  },
}

export default Contact
