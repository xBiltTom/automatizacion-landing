import { Search, Filter, SortAsc } from 'lucide-react';
import './FilterBar.css';

const FilterBar = ({ 
  searchTerm, 
  setSearchTerm, 
  roleFilter, 
  setRoleFilter,
  estadoFilter,
  setEstadoFilter,
  sortBy,
  setSortBy 
}) => {
  return (
    <div className="filter-bar">
      <div className="search-box">
        <Search size={20} />
        <input
          type="text"
          placeholder="Buscar por nombre, email, ciudad..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="filters">
        <div className="filter-group">
          <Filter size={18} />
          <select 
            value={roleFilter} 
            onChange={(e) => setRoleFilter(e.target.value)}
            className="filter-select"
          >
            <option value="todos">Todos los roles</option>
            <option value="Web Developer">Web Developer</option>
            <option value="Analista de datos">Analista de Datos</option>
            <option value="Cyberseguridad">Ciberseguridad</option>
          </select>
        </div>

        <div className="filter-group">
          <Filter size={18} />
          <select 
            value={estadoFilter} 
            onChange={(e) => setEstadoFilter(e.target.value)}
            className="filter-select"
          >
            <option value="todos">Todos los estados</option>
            <option value="Correo Enviado">Correo Enviado</option>
            <option value="Por evaluar">Por Evaluar</option>
          </select>
        </div>

        <div className="filter-group">
          <SortAsc size={18} />
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="fecha">Fecha</option>
            <option value="vote">Puntuación</option>
            <option value="nombre">Nombre</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
