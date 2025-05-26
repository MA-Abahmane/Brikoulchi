import { NavLink } from 'react-router-dom';

function Sidebar({ onLinkClick }) {
  return (
    <div className="sidebar-content">
      <div className="sidebar-logo">Admin Panel</div>
      <nav>
        <NavLink 
          to="/admin/dashboard" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          onClick={onLinkClick}
        >
          <i className="fas fa-chart-line mr-2"></i> Dashboard
        </NavLink>
        <NavLink 
          to="/admin/users" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          onClick={onLinkClick}
        >
          <i className="fas fa-users mr-2"></i> Users
        </NavLink>
        <NavLink 
          to="/admin/map" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          onClick={onLinkClick}
        >
          <i className="fas fa-map-marker-alt mr-2"></i> Map
        </NavLink>
        <NavLink 
          to="/admin/categories" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          onClick={onLinkClick}
        >
          <i className="fas fa-tags mr-2"></i> Categories
        </NavLink>
        <NavLink 
          to="/admin/analytics" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          onClick={onLinkClick}
        >
          <i className="fas fa-chart-bar mr-2"></i> Analytics
        </NavLink>
        <NavLink 
          to="/admin/reports" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          onClick={onLinkClick}
        >
          <i className="fas fa-file-alt mr-2"></i> Reports
        </NavLink>
        <NavLink 
          to="/admin/settings" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          onClick={onLinkClick}
        >
          <i className="fas fa-cog mr-2"></i> Settings
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;