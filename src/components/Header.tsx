import Logo from './Logo';
import ErrorButton from './ErrorButton';

export default function Header() {
  return (
    <div className="header">
      <Logo />
      <ErrorButton />
    </div>
  );
}
