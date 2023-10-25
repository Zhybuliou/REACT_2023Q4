import { PureComponent } from 'react';
import Logo from './Logo';

export default class Header extends PureComponent {
  render() {
    return (
      <div className="header">
        <Logo />
      </div>
    );
  }
}
