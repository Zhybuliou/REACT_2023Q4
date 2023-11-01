import { PureComponent } from 'react';

export default class ErrorComponent extends PureComponent {
  render() {
    throw new Error('  This is a test error');
    return <div>ErrorComponent</div>;
  }
}
