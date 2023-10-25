import { PureComponent } from 'react';
import apiRequest from '../service/apiRequest';
import API_BASE_URL from '../data/url';
import { IResultPeople } from '../types/interface';
import Loading from '../components/Loading';
import Card from '../components/Card';
import SearchBlock from '../components/SearchBlock';

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
        <div className="home-page-header">
          <h1>Home page</h1>
          <SearchBlock />
        </div>
        <div className="home-page-content">
          {' '}
          {storeApiResult ? (
            storeApiResult?.results.map((card) => (
              <Card
                name={card.name}
                birthYear={card.birth_year}
                url={card.url}
                key={card.name}
                mass={card.mass}
                height={card.height}
                gender={card.gender}
                skinColor={card.skin_color}
              />
            ))
          ) : (
            <Loading />
          )}
        </div>
      </div>
    );
  }
}
