import { PureComponent } from 'react';
import Logo from './Logo';

export default class Header extends PureComponent {
  render() {
    return (
      <div className="header">
        <Logo />
        <div className="search-block">
          <input
            className="search-block-input"
            type="text"
            placeholder="choose..."
          />
          <button type="button" className="search-block-button">
            Search
          </button>
        </div>
      </div>
    );
  }
}
