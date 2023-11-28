import { NavLink } from 'react-router-dom';
import Logo from './Logo';

export default function Header() {
  return (
    <div className="header">
      <Logo />
      <nav className="nav-block">
        <NavLink to="/uncontrolled-form">uncontrolled form</NavLink>
        <NavLink to="/controlled-form">controlled form</NavLink>
      </nav>
    </div>
  );
}
