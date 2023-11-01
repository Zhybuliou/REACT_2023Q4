import { PureComponent } from 'react';
import Logo from './Logo';
import ErrorButton from './ErrorButton';

export default class Header extends PureComponent {
  render() {
    return (
      <div className="header">
        <Logo />
        <ErrorButton />
      </div>
    );
  }
}
