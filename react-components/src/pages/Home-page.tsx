import { PureComponent } from 'react';
import apiRequest from '../service/apiRequest';
import API_BASE_URL from '../data/url';
import { IResultPeople } from '../types/interface';

type MyProps = {
  value?: string;
};
type MyState = {
  storeApiResult: IResultPeople | null;
};

export default class HomePage extends PureComponent<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {
      storeApiResult: null,
    };
  }

  componentDidMount() {
    apiRequest(API_BASE_URL, '').then((value) =>
      this.setState({ storeApiResult: value })
    );
  }

  render() {
    const { storeApiResult } = this.state;

    return (
      <div className="home-page">
        <h1>Home page</h1>
        {storeApiResult?.results.map((card) => (
          <div key={card.name}>
            <p>{card.name}</p>
          </div>
        ))}
      </div>
    );
  }
}
