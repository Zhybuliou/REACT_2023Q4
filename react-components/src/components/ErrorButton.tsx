import { Component } from 'react';
import ErrorComponent from './ErrorComponent';

type MyProps = {
  value?: string;
};
type MyState = {
  hasError: boolean;
};

export default class ErrorButton extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = { hasError: false };
  }

  render() {
    const { hasError } = this.state;
    return (
      <>
        <button type="button" onClick={() => this.setState({ hasError: true })}>
          Get Error
        </button>
        {hasError && <ErrorComponent />}
      </>
    );
  }
}
