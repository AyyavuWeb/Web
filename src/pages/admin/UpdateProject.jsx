import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

function AdminUpdateProject() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    details: '',
    price: '',
    location: '',
    status: 'ongoing'
  })
  const [images, setImages] = useState([])
  const [newImages, setNewImages] = useState([])

  useEffect(() => {
    checkAuth()
    fetchProject()
  }, [id])

  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      navigate('/admin/login')
    }
  }

  async function fetchProject() {
    const { data: project } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()

    if (project) {
      setFormData(project)

      const { data: projectImages } = await supabase
        .from('project_images')
        .select('*')
        .eq('project_id', id)

      if (projectImages) {
        setImages(projectImages)
      }
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function handleNewImages(e) {
    setNewImages(Array.from(e.target.files))
  }

  async function handleUpdate(e) {
    e.preventDefault()

    const { error: updateError } = await supabase
      .from('projects')
      .update(formData)
      .eq('id', id)

    if (updateError) {
      alert('Error: ' + updateError.message)
      return
    }

    if (newImages.length > 0) {
      for (const image of newImages) {
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
            .insert([{ project_id: id, image: publicUrl }])
        }
      }
    }

    alert('Project Updated!')
    navigate('/admin/edit-projects')
  }

  async function handleDelete() {
    if (confirm('Delete this project?')) {
      await supabase.from('project_images').delete().eq('project_id', id)
      await supabase.from('projects').delete().eq('id', id)
      navigate('/admin/edit-projects')
    }
  }

  async function handleDeleteImage(imageId) {
    if (confirm('Delete this image?')) {
      await supabase.from('project_images').delete().eq('id', imageId)
      fetchProject()
    }
  }

  return (
    <div style={styles.container}>
      <Link to="/admin/edit-projects" style={styles.backBtn}>
        ← Back
      </Link>

      <div style={styles.formBox}>
        <h2>Edit Project</h2>

        <form onSubmit={handleUpdate}>
          <label style={styles.label}>Title</label>
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

          <label style={styles.label}>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            style={styles.input}
          />

          <label style={styles.label}>Price</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            style={styles.input}
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

          <label style={styles.label}>Current Images</label>
          <div style={styles.imageGallery}>
            {images.map(img => (
              <div key={img.id} style={styles.imageBox}>
                <img src={img.image} alt="Project" style={styles.imageThumb} />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(img.id)}
                  style={styles.deleteIcon}
                >
                  ✖
                </button>
              </div>
            ))}
          </div>

          <label style={styles.label}>Add More Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleNewImages}
            style={styles.input}
          />

          <button type="submit" style={styles.updateBtn}>Update</button>
          <button type="button" onClick={handleDelete} style={styles.deleteBtn}>
            Delete Project
          </button>
        </form>
      </div>
    </div>
  )
}

const styles = {
  container: { background: '#0f172a', color: 'white', padding: '20px', minHeight: '100vh' },
  backBtn: { background: '#6b7280', color: 'white', textDecoration: 'none', display: 'inline-block', marginBottom: '20px', padding: '10px 18px', borderRadius: '8px' },
  formBox: { background: '#1e293b', padding: '30px', borderRadius: '10px', maxWidth: '600px', margin: '0 auto' },
  label: { display: 'block', marginTop: '12px', fontWeight: 'bold' },
  input: { width: '100%', padding: '10px', marginTop: '5px', borderRadius: '6px', border: 'none', background: '#0f172a', color: 'white', fontSize: '14px', fontFamily: 'inherit' },
  textarea: { width: '100%', padding: '10px', marginTop: '5px', borderRadius: '6px', border: 'none', background: '#0f172a', color: 'white', fontSize: '14px', minHeight: '80px', fontFamily: 'inherit' },
  imageGallery: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '12px', marginTop: '15px' },
  imageBox: { position: 'relative' },
  imageThumb: { width: '100%', height: '100px', objectFit: 'cover', borderRadius: '6px' },
  deleteIcon: { position: 'absolute', top: '2px', right: '2px', background: 'red', color: 'white', fontSize: '12px', padding: '2px 5px', borderRadius: '50%', cursor: 'pointer', border: 'none' },
  updateBtn: { background: '#2563eb', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '6px', cursor: 'pointer', marginRight: '10px', marginTop: '20px' },
  deleteBtn: { background: '#dc2626', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '6px', cursor: 'pointer', marginTop: '20px' },
}

export default AdminUpdateProject
