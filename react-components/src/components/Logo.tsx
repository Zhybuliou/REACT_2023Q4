import { PureComponent } from 'react';

export default class Logo extends PureComponent {
  render() {
    return (
      <div className="logo">
        <a className="logo-link text-style" href="/">
          Star Wars
        </a>
      </div>
    );
  }
}
