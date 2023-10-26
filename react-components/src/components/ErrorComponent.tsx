import { PureComponent } from 'react';

export default class ErrorComponent extends PureComponent {
  render() {
    throw new Error('Oops, something went wrong!');
    return <div>ErrorComponent</div>;
  }
}
