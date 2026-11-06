import { NavLink } from 'react-router-dom';
import Icon from '../common/Icon.jsx';

const links = [
  { to: '/', label: 'Dashboard', icon: 'dashboard' },
  { to: '/vehicles', label: 'Vehicles', icon: 'car' },
  { to: '/customers', label: 'Customers', icon: 'users' }
];

function Sidebar({ open, onClose }) {
  return (
    <>
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <NavLink to="/" className="brand" onClick={onClose}>
          <span className="brand-mark"><Icon name="key" size={18} /></span>
          <span>DriveEasy<small>Vehicle Rental System</small></span>
        </NavLink>
        <p className="nav-label">Manage</p>
        <nav className="side-nav">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} onClick={onClose}>
              <Icon name={l.icon} /> {l.label}
            </NavLink>
          ))}
        </nav>
        <NavLink to="/login" className="side-login" onClick={onClose}><Icon name="login" /> Sign in</NavLink>
      </aside>
      {open && <div className="scrim" onClick={onClose} />}
    </>
  );
}

export default Sidebar;
