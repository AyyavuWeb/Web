import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

function AdminAddProject() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    details: '',
    price: '',
    location: '',
    status: 'ongoing'
  })
  const [images, setImages] = useState([])

  useEffect(() => {
    checkAuth()
  }, [])

  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      navigate('/admin/login')
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function handleImageChange(e) {
    setImages(Array.from(e.target.files))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const { data: project, error: projectError } = await supabase
      .from('projects')
      .insert([formData])
      .select()
      .single()

    if (projectError) {
      alert('Error: ' + projectError.message)
      return
    }

    if (images.length > 0 && project) {
      for (const image of images) {
        const fileName = `${Date.now()}_${image.name}`
        const { error: uploadError } = await supabase.storage
          .from('project-images')
          .upload(fileName, image)

        if (!uploadError) {
          const { data: { publicUrl } } = supabase.storage
            .from('project-images')
            .getPublicUrl(fileName)

          await supabase
            .from('project_images')
            .insert([{ project_id: project.id, image: publicUrl }])
        }
      }
    }

    alert('Project Added!')
    navigate('/admin/dashboard')
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logo}>Ayyavu Construction</div>
        <Link to="/admin/dashboard" style={styles.link}>Dashboard</Link>
      </header>

      <div style={styles.formContainer}>
        <div style={styles.formCard}>
          <h2 style={styles.title}>Add New Project</h2>

          <form onSubmit={handleSubmit}>
            <label style={styles.label}>Project Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              style={styles.input}
              required
            />

            <label style={styles.label}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={styles.textarea}
              required
            />

            <label style={styles.label}>Details</label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              style={styles.textarea}
            />

            <label style={styles.label}>Price</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              style={styles.input}
              required
            />

            <label style={styles.label}>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              style={styles.input}
              required
            />

            <label style={styles.label}>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="upcoming">Upcoming</option>
            </select>

            <label style={styles.label}>Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              style={styles.input}
            />

            <button type="submit" style={styles.button}>Add Project</button>
          </form>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: { background: '#0f172a', color: 'white', minHeight: '100vh' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 50px', borderBottom: '1px solid #1f2937' },
  logo: { fontSize: '20px', fontWeight: 'bold' },
  link: { color: 'white', textDecoration: 'none' },
  formContainer: { display: 'flex', justifyContent: 'center', padding: '60px 20px' },
  formCard: { background: '#1e293b', padding: '35px', borderRadius: '12px', width: '450px' },
  title: { textAlign: 'center', marginBottom: '25px' },
  label: { display: 'block', marginTop: '12px', fontSize: '14px' },
  input: { width: '100%', padding: '10px', marginTop: '5px', borderRadius: '6px', border: 'none', background: '#0f172a', color: 'white', fontSize: '14px', fontFamily: 'inherit' },
  textarea: { width: '100%', padding: '10px', marginTop: '5px', borderRadius: '6px', border: 'none', background: '#0f172a', color: 'white', fontSize: '14px', minHeight: '80px', fontFamily: 'inherit' },
  button: { width: '100%', padding: '12px', marginTop: '20px', background: '#2563eb', border: 'none', borderRadius: '6px', color: 'white', fontSize: '15px', cursor: 'pointer' },
}

export default AdminAddProject
