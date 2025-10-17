import { Users, Briefcase, CheckCircle, Clock } from 'lucide-react';
import './Stats.css';

const Stats = ({ postulantes }) => {
  const total = postulantes.length;
  const enviados = postulantes.filter(p => 
    p.ESTADO?.toLowerCase().includes('enviado')
  ).length;
  const porEvaluar = total - enviados;
  
  const rolesCounts = postulantes.reduce((acc, p) => {
    const rol = p['ROL TRABAJO']?.toLowerCase() || '';
    if (rol.includes('web')) acc.web++;
    else if (rol.includes('datos') || rol.includes('data') || rol.includes('analista')) acc.data++;
    else if (rol.includes('cyber') || rol.includes('seguridad') || rol.includes('ciber')) acc.cyber++;
    return acc;
  }, { web: 0, data: 0, cyber: 0 });

  return (
    <div className="stats-container">
      <div className="stat-card total">
        <div className="stat-icon">
          <Users size={28} />
        </div>
        <div className="stat-info">
          <p className="stat-label">Total Postulantes</p>
          <p className="stat-value">{total}</p>
        </div>
      </div>

      <div className="stat-card enviados">
        <div className="stat-icon">
          <CheckCircle size={28} />
        </div>
        <div className="stat-info">
          <p className="stat-label">Correos Enviados</p>
          <p className="stat-value">{enviados}</p>
        </div>
      </div>

      <div className="stat-card evaluar">
        <div className="stat-icon">
          <Clock size={28} />
        </div>
        <div className="stat-info">
          <p className="stat-label">Por Evaluar</p>
          <p className="stat-value">{porEvaluar}</p>
        </div>
      </div>

      <div className="stat-card roles">
        <div className="stat-icon">
          <Briefcase size={28} />
        </div>
        <div className="stat-info">
          <p className="stat-label">Por Rol</p>
          <div className="roles-breakdown">
            <span className="role-stat web">Web Developer: {rolesCounts.web}</span>
            <span className="role-stat data">Analista de datos: {rolesCounts.data}</span>
            <span className="role-stat cyber">Cyberseguridad: {rolesCounts.cyber}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
