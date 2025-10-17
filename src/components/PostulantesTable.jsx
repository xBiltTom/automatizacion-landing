import { useState } from 'react';
import { Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import './PostulantesTable.css';

const PostulantesTable = ({ postulantes, onViewDetails }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calcular paginación
  const totalPages = Math.ceil(postulantes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPostulantes = postulantes.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const getVoteClass = (vote) => {
    const voteNum = parseInt(vote);
    if (voteNum >= 8) return 'vote-high';
    if (voteNum >= 6) return 'vote-medium';
    return 'vote-low';
  };

  const getRolClass = (rol) => {
    if (rol?.toLowerCase().includes('web')) return 'rol-web';
    if (rol?.toLowerCase().includes('datos') || rol?.toLowerCase().includes('data') || rol?.toLowerCase().includes('analista')) return 'rol-data';
    if (rol?.toLowerCase().includes('cyber') || rol?.toLowerCase().includes('seguridad') || rol?.toLowerCase().includes('ciber')) return 'rol-cyber';
    return 'rol-default';
  };

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="postulantes-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Nombre</th>
              <th>Rol de Trabajo</th>
              <th>Calificación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentPostulantes.map((postulante, index) => (
              <tr key={startIndex + index}>
                <td className="fecha-cell">{postulante.FECHA}</td>
                <td className="nombre-cell">{postulante.NOMBRE}</td>
                <td>
                  <span className={`rol-badge ${getRolClass(postulante['ROL TRABAJO'])}`}>
                    {postulante['ROL TRABAJO']}
                  </span>
                </td>
                <td>
                  <span className={`vote-badge ${getVoteClass(postulante.VOTE)}`}>
                    {postulante.VOTE}/10
                  </span>
                </td>
                <td>
                  <button 
                    className="btn-ver"
                    onClick={() => onViewDetails(postulante)}
                    title="Ver detalles del postulante"
                  >
                    <Eye size={16} />
                    <span>Ver</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="pagination">
        <button 
          className="pagination-btn"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={18} />
          Anterior
        </button>

        <div className="pagination-info">
          <span>
            Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong>
          </span>
          <span className="pagination-range">
            Mostrando {startIndex + 1}-{Math.min(endIndex, postulantes.length)} de {postulantes.length}
          </span>
        </div>

        <button 
          className="pagination-btn"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default PostulantesTable;
