import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  function handleSubmit(e) {
    e.preventDefault()
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.left}>
            <h2 style={styles.title}>Get in Touch</h2>
            <p style={styles.subtitle}>Let's discuss your next project.</p>

            <div style={styles.infoCard}>
              <h4>Office Address</h4>
              <p>No-17, Vidhya Colony 5th cross, Thadagam rd<br />
                TVS Nagar, Coimbatore - 641025</p>
            </div>

            <div style={styles.infoCard}>
              <h4>Phone</h4>
              <p><a href="tel:+919360493616" style={styles.link}>+91 93604 93616</a><br />
                <a href="tel:+919345770330" style={styles.link}>+91 93457 70330</a></p>
            </div>

            <div style={styles.infoCard}>
              <h4>Email</h4>
              <p><a href="mailto:ayyavu.ayyavupromoters@gmail.com" style={styles.link}>ayyavu.ayyavupromoters@gmail.com</a></p>
            </div>
          </div>

          <div style={styles.right}>
            <form style={styles.form} onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  style={{ ...styles.input, minHeight: '120px' }}
                  required
                />
              </div>

              <button type="submit" style={styles.submitBtn}>Send Message</button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

const styles = {
  section: { padding: '50px 60px' },
  container: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' },
  left: {},
  title: { fontSize: '32px', fontWeight: 700, marginBottom: '10px' },
  subtitle: { fontSize: '15px', color: '#6b7280', marginBottom: '30px' },
  infoCard: { marginBottom: '25px', padding: '15px', background: '#f3f4f6', borderRadius: '8px' },
  link: { color: '#2563eb', textDecoration: 'none' },
  right: { background: '#f9fafb', padding: '30px', borderRadius: '12px' },
  form: {},
  formGroup: { marginBottom: '20px' },
  label: { display: 'block', marginBottom: '8px', fontWeight: 600 },
  input: { width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit' },
  submitBtn: { width: '100%', padding: '12px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 },
}

export default Contact
