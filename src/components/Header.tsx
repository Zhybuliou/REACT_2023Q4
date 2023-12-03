import { NavLink } from 'react-router-dom';
import Logo from './Logo';

export default function Header() {
  return (
    <div className="header">
      <Logo />
      <nav className="nav-block">
        <NavLink
          className={({ isActive }) => (isActive ? 'active-link' : '')}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? 'active-link' : '')}
          to="/uncontrolled-form"
        >
          uncontrolled form
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? 'active-link' : '')}
          to="/controlled-form"
        >
          controlled form
        </NavLink>
      </nav>
    </div>
  );
}
