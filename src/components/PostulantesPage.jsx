import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import axios from 'axios'
import PostulantesTable from './PostulantesTable'
import PostulanteModal from './PostulanteModal'
import FilterBar from './FilterBar'
import Stats from './Stats'
import './PostulantesPage.css'

function PostulantesPage() {
  const [postulantes, setPostulantes] = useState([])
  const [filteredPostulantes, setFilteredPostulantes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('todos')
  const [estadoFilter, setEstadoFilter] = useState('todos')
  const [sortBy, setSortBy] = useState('fecha')
  const [selectedPostulante, setSelectedPostulante] = useState(null)
  const navigate = useNavigate()

  const SHEET_ID = '1pdjx9WoPMLvMyCh71Smj44WttAHaDBsBe__OTewiz4o'
  const SHEET_GID = '0'

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('username')
    navigate('/login')
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${SHEET_GID}`
        
        try {
          console.log('Intentando cargar desde:', csvUrl)
          const response = await axios.get(csvUrl, {
            headers: {
              'Accept': 'text/csv'
            }
          })
          
          console.log('Respuesta recibida, parseando CSV...')
          
          const parseCSV = (text) => {
            const rows = []
            let currentRow = []
            let currentField = ''
            let inQuotes = false
            
            for (let i = 0; i < text.length; i++) {
              const char = text[i]
              const nextChar = text[i + 1]
              
              if (char === '"') {
                if (inQuotes && nextChar === '"') {
                  currentField += '"'
                  i++
                } else {
                  inQuotes = !inQuotes
                }
              } else if (char === ',' && !inQuotes) {
                currentRow.push(currentField.trim())
                currentField = ''
              } else if ((char === '\n' || char === '\r') && !inQuotes) {
                if (char === '\r' && nextChar === '\n') {
                  i++
                }
                if (currentField || currentRow.length > 0) {
                  currentRow.push(currentField.trim())
                  if (currentRow.some(field => field)) {
                    rows.push(currentRow)
                  }
                  currentRow = []
                  currentField = ''
                }
              } else {
                currentField += char
              }
            }
            
            if (currentField || currentRow.length > 0) {
              currentRow.push(currentField.trim())
              if (currentRow.some(field => field)) {
                rows.push(currentRow)
              }
            }
            
            return rows
          }
          
          const rows = parseCSV(response.data)
          console.log('Total de filas parseadas:', rows.length)
          
          if (rows.length < 2) {
            throw new Error('No se encontraron suficientes filas en el CSV')
          }
          
          const headers = rows[0]
          console.log('Encabezados:', headers)
          console.log('Número de columnas:', headers.length)
          
          const data = rows.slice(1).map((row, index) => {
            if (index < 3) {
              console.log(`Fila ${index + 1}:`, row)
              console.log(`Número de valores: ${row.length}`)
            }
            
            const postulante = {}
            headers.forEach((header, i) => {
              const key = header.trim()
              postulante[key] = row[i] || ''
            })
            
            if (postulante.VOTE) {
              postulante.VOTE = parseInt(postulante.VOTE) || 0
            }
            
            return postulante
          })

          console.log('Datos parseados:', data.length, 'postulantes')
          
          if (data.length === 0) {
            throw new Error('No se encontraron datos en la hoja')
          }
          
          setPostulantes(data)
          setFilteredPostulantes(data)
          setLoading(false)
        } catch (csvError) {
          console.error('Error al cargar datos de Google Sheets:', csvError)
          console.error('URL intentada:', csvUrl)
          throw csvError
        }
      } catch (err) {
        console.error('Error al cargar los datos:', err)
        setError('No se pudieron cargar los datos de Google Sheets. Por favor, verifica que la hoja esté publicada correctamente.')
        setLoading(false)
      }
    }

    fetchData()
  }, [SHEET_ID, SHEET_GID])

  const filterAndSort = useCallback(() => {
    let filtered = [...postulantes]

    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.NOMBRE?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.EMAIL?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.CIUDAD?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (roleFilter !== 'todos') {
      filtered = filtered.filter(p => p['ROL TRABAJO'] === roleFilter)
    }

    if (estadoFilter !== 'todos') {
      filtered = filtered.filter(p => p.ESTADO === estadoFilter)
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'fecha':
          return new Date(b.FECHA) - new Date(a.FECHA)
        case 'vote':
          return (b.VOTE || 0) - (a.VOTE || 0)
        case 'nombre':
          return (a.NOMBRE || '').localeCompare(b.NOMBRE || '')
        default:
          return 0
      }
    })

    setFilteredPostulantes(filtered)
  }, [postulantes, searchTerm, roleFilter, estadoFilter, sortBy])

  useEffect(() => {
    filterAndSort()
  }, [filterAndSort])

  if (loading) {
    return (
      <div className="postulantes-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando postulantes...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="postulantes-page">
        <div className="error-container">
          <div className="error">
            <h2>⚠️ Error</h2>
            <p>{error}</p>
            <div className="error-instructions">
              <h3>Pasos para solucionar:</h3>
              <ol>
                <li>Abre tu hoja de Google Sheets</li>
                <li>Ve a <strong>Archivo → Compartir → Publicar en la web</strong></li>
                <li>Publica la hoja completa o "Hoja 1"</li>
                <li>Alternativamente, haz clic en <strong>Compartir</strong> y cambia a <strong>"Cualquier persona con el vínculo"</strong></li>
                <li>Recarga esta página</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const username = localStorage.getItem('username') || 'Usuario'

  return (
    <div className="postulantes-page">
      <header className="page-header">
        <div className="header-content">
          <div className="header-title">
            <h1>📋 Dashboard de Postulantes</h1>
          </div>
          <div className="header-actions">
            <span className="username-badge">👤 {username}</span>
            <button onClick={handleLogout} className="logout-button">
              <LogOut size={18} />
              Cerrar Sesión
            </button>
          </div>
        </div>
        <p className="header-subtitle">Sistema de gestión de candidatos analizados con IA</p>
      </header>

      <div className="page-main">
        <Stats postulantes={postulantes} />

        <FilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          estadoFilter={estadoFilter}
          setEstadoFilter={setEstadoFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {filteredPostulantes.length === 0 ? (
          <div className="no-results">
            <p>No se encontraron postulantes con los filtros seleccionados</p>
          </div>
        ) : (
          <PostulantesTable 
            postulantes={filteredPostulantes}
            onViewDetails={(postulante) => setSelectedPostulante(postulante)}
          />
        )}
      </div>

      {selectedPostulante && (
        <PostulanteModal 
          postulante={selectedPostulante}
          onClose={() => setSelectedPostulante(null)}
        />
      )}
    </div>
  )
}

export default PostulantesPage
