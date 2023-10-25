import { PureComponent } from 'react';
import Logo from './Logo';
import SearchBlock from './SearchBlock';

export default class Header extends PureComponent {
  render() {
    return (
      <div className="header">
        <Logo />
        <SearchBlock />
      </div>
    );
  }
}
