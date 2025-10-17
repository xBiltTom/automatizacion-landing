import { Mail, Phone, MapPin, Briefcase, GraduationCap, Star, FileText, CheckCircle, Clock } from 'lucide-react';
import './PostulanteCard.css';

const PostulanteCard = ({ postulante }) => {
  const FECHA = postulante.FECHA;
  const NOMBRE = postulante.NOMBRE;
  const TELEFONO = postulante.TELEFONO;
  const CIUDAD = postulante.CIUDAD;
  const EMAIL = postulante.EMAIL;
  const ROL_TRABAJO = postulante['ROL TRABAJO'];
  const EDUCACIÓN = postulante.EDUCACIÓN;
  const EXPERIENCIA_LABORAL = postulante['EXPERIENCIA LABORAL'];
  const HABILIDADES = postulante.HABILIDADES;
  const CERTIFICADOS = postulante.CERTIFICADOS;
  const RESUMEN = postulante.RESUMEN;
  const VOTE = postulante.VOTE;
  const CONSIDERACION = postulante.CONSIDERACION;
  const ESTADO = postulante.ESTADO;

  // Función para procesar habilidades/certificados con guiones o asteriscos
  const procesarLista = (texto) => {
    if (!texto) return [];
    
    // Dividir por saltos de línea y limpiar
    const lineas = texto.split(/\n|\r\n/).map(l => l.trim()).filter(l => l);
    
    // Procesar cada línea
    const items = [];
    lineas.forEach(linea => {
      // Si la línea empieza con -, *, •, o número seguido de punto
      if (/^[-*•]\s/.test(linea) || /^\d+\.\s/.test(linea)) {
        // Remover el prefijo y agregar
        items.push(linea.replace(/^[-*•]\s/, '').replace(/^\d+\.\s/, '').trim());
      } else if (linea.includes(';')) {
        // Si tiene punto y coma, dividir por eso
        linea.split(';').forEach(parte => {
          const limpio = parte.trim();
          if (limpio) items.push(limpio);
        });
      } else {
        // Agregar la línea completa
        items.push(linea);
      }
    });
    
    return items.filter(item => item.length > 0);
  };

  const getEstadoColor = (estado) => {
    if (estado?.toLowerCase().includes('enviado')) return 'enviado';
    return 'evaluar';
  };

  const getVoteColor = (vote) => {
    const voteNum = parseInt(vote);
    if (voteNum >= 8) return 'high';
    if (voteNum >= 6) return 'medium';
    return 'low';
  };

  const getRolColor = (rol) => {
    if (rol?.toLowerCase().includes('Web Developer')) return 'web';
    if (rol?.toLowerCase().includes('Analista de datos') || rol?.toLowerCase().includes('data')) return 'data';
    if (rol?.toLowerCase().includes('Cyberseguridad') || rol?.toLowerCase().includes('seguridad')) return 'cyber';
    return 'default';
  };

  return (
    <div className="postulante-card">
      <div className="card-header">
        <div className="header-left">
          <h2 className="nombre">{NOMBRE}</h2>
          <span className={`rol-badge ${getRolColor(ROL_TRABAJO)}`}>{ROL_TRABAJO}</span>
        </div>
        <div className="header-right">
          <span className={`vote-badge ${getVoteColor(VOTE)}`}>
            <Star size={16} fill="currentColor" />
            {VOTE}/10
          </span>
          <span className={`estado-badge ${getEstadoColor(ESTADO)}`}>
            {ESTADO?.toLowerCase().includes('enviado') ? (
              <CheckCircle size={16} />
            ) : (
              <Clock size={16} />
            )}
            {ESTADO}
          </span>
        </div>
      </div>

      <div className="card-body">
        <div className="info-section contact-info">
          <div className="info-item">
            <Mail size={16} />
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>
          <div className="info-item">
            <Phone size={16} />
            <span>{TELEFONO}</span>
          </div>
          <div className="info-item">
            <MapPin size={16} />
            <span>{CIUDAD}</span>
          </div>
          <div className="info-item fecha">
            <span className="fecha-label">Fecha:</span>
            <span>{FECHA}</span>
          </div>
        </div>

        <div className="info-section">
          <div className="section-title">
            <GraduationCap size={18} />
            <h3>Educación</h3>
          </div>
          <p className="section-content">{EDUCACIÓN}</p>
        </div>

        <div className="info-section">
          <div className="section-title">
            <Briefcase size={18} />
            <h3>Experiencia Laboral</h3>
          </div>
          <p className="section-content">{EXPERIENCIA_LABORAL}</p>
        </div>

        <div className="info-section">
          <div className="section-title">
            <FileText size={18} />
            <h3>Habilidades</h3>
          </div>
          <div className="habilidades-list">
            {procesarLista(HABILIDADES).map((habilidad, index) => (
              <div key={index} className="habilidad-item">
                <span className="habilidad-bullet">•</span>
                <span className="habilidad-text">{habilidad}</span>
              </div>
            ))}
          </div>
        </div>

        {CERTIFICADOS && CERTIFICADOS.trim() && (
          <div className="info-section certificados-section">
            <div className="section-title">
              <Star size={20} />
              <h3>Certificados</h3>
            </div>
            <div className="certificados-list">
              {procesarLista(CERTIFICADOS).map((certificado, index) => (
                <div key={index} className="certificado-item">
                  <span className="certificado-icon">🏆</span>
                  <span className="certificado-text">{certificado}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="info-section">
          <div className="section-title">
            <FileText size={18} />
            <h3>Resumen del CV</h3>
          </div>
          <p className="section-content resumen">{RESUMEN}</p>
        </div>

        {CONSIDERACION && (
          <div className="info-section consideracion">
            <div className="section-title">
              <Star size={18} />
              <h3>Consideración IA</h3>
            </div>
            <p className="section-content">{CONSIDERACION}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostulanteCard;
