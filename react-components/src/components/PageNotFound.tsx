import { PureComponent } from 'react';
import man from '../assets/source.gif';

export default class PageNotFound extends PureComponent {
  render() {
    return (
      <div className="page-not-found">
        <div className="page-not-found-content text-style">
          This is not page you are looking for.
        </div>
        <div className="page-not-found-image">
          <img src={man} alt="Page Not Found" />
        </div>
      </div>
    );
  }
}
