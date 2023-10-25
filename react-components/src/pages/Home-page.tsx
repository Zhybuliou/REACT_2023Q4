import { PureComponent } from 'react';
import apiRequest from '../service/apiRequest';
import API_BASE_URL from '../data/url';
import { IResultPeople } from '../types/interface';
import Loading from '../components/Loading';
import Card from '../components/Card';

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
        <div className="home-page-content">
          {' '}
          {storeApiResult ? (
            storeApiResult?.results.map((card) => (
              <Card name={card.name} key={card.name} />
            ))
          ) : (
            <Loading />
          )}
        </div>
      </div>
    );
  }
}
