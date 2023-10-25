import { PureComponent } from 'react';
import loading from '../assets/hugging-grogu.gif';

export default class Loading extends PureComponent {
  render() {
    return (
      <div className="loading">
        <img src={loading} alt="loading..." />
        <div>Loading...</div>
      </div>
    );
  }
}
