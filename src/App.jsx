import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import PostulantesTable from './components/PostulantesTable'
import PostulanteModal from './components/PostulanteModal'
import FilterBar from './components/FilterBar'
import Stats from './components/Stats'
import './App.css'

function App() {
  const [postulantes, setPostulantes] = useState([])
  const [filteredPostulantes, setFilteredPostulantes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('todos')
  const [estadoFilter, setEstadoFilter] = useState('todos')
  const [sortBy, setSortBy] = useState('fecha')
  const [selectedPostulante, setSelectedPostulante] = useState(null)

  const SHEET_ID = '1pdjx9WoPMLvMyCh71Smj44WttAHaDBsBe__OTewiz4o'
  const SHEET_GID = '0' // El gid de tu hoja (visible en la URL: gid=0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Método 1: Intentar con CSV export directo (requiere hoja pública)
        const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${SHEET_GID}`
        
        try {
          console.log('Intentando cargar desde:', csvUrl)
          const response = await axios.get(csvUrl, {
            headers: {
              'Accept': 'text/csv'
            }
          })
          
          console.log('Respuesta recibida, parseando CSV...')
          
          // Parsear CSV completo manejando saltos de línea dentro de comillas
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
                  // Comilla doble escapada ""
                  currentField += '"'
                  i++ // Saltar la siguiente comilla
                } else {
                  // Alternar estado de comillas
                  inQuotes = !inQuotes
                }
              } else if (char === ',' && !inQuotes) {
                // Fin de campo
                currentRow.push(currentField.trim())
                currentField = ''
              } else if ((char === '\n' || char === '\r') && !inQuotes) {
                // Fin de fila (solo si no estamos dentro de comillas)
                if (char === '\r' && nextChar === '\n') {
                  i++ // Saltar el \n en \r\n
                }
                if (currentField || currentRow.length > 0) {
                  currentRow.push(currentField.trim())
                  if (currentRow.some(field => field)) { // Solo agregar filas no vacías
                    rows.push(currentRow)
                  }
                  currentRow = []
                  currentField = ''
                }
              } else {
                currentField += char
              }
            }
            
            // Agregar la última fila si existe
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
          
          // Primera fila = encabezados
          const headers = rows[0]
          console.log('Encabezados:', headers)
          console.log('Número de columnas:', headers.length)
          
          // Crear objetos de postulantes
          const data = rows.slice(1).map((row, index) => {
            // Log para debugging las primeras 3 filas
            if (index < 3) {
              console.log(`Fila ${index + 1}:`, row)
              console.log(`Número de valores: ${row.length}`)
            }
            
            // Crear objeto dinámicamente basado en los encabezados
            const postulante = {}
            headers.forEach((header, i) => {
              const key = header.trim()
              postulante[key] = row[i] || ''
            })
            
            // Convertir VOTE a número si existe
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

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.NOMBRE?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.EMAIL?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.CIUDAD?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filtrar por rol
    if (roleFilter !== 'todos') {
      filtered = filtered.filter(p => p['ROL TRABAJO'] === roleFilter)
    }

    // Filtrar por estado
    if (estadoFilter !== 'todos') {
      filtered = filtered.filter(p => p.ESTADO === estadoFilter)
    }

    // Ordenar
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
      <div className="app">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando postulantes...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="app">
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

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="header-title">
            <h1>📋 Dashboard de Postulantes</h1>
          </div>
          <p className="header-subtitle">Sistema de gestión de candidatos analizados con IA</p>
        </div>
      </header>

      <div className="app-main">
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

      {/* Modal para ver detalles */}
      {selectedPostulante && (
        <PostulanteModal 
          postulante={selectedPostulante}
          onClose={() => setSelectedPostulante(null)}
        />
      )}
    </div>
  )
}

export default App