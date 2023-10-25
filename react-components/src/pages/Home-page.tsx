import { Component } from 'react';
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
  searchString: string;
};

export default class HomePage extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {
      storeApiResult: null,
      searchString: localStorage.getItem('search') || '',
    };
    this.handlerOnClick = this.handlerOnClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    const { searchString } = this.state;
    apiRequest(API_BASE_URL, searchString).then((value) =>
      this.setState({ storeApiResult: value })
    );
  }

  async handlerOnClick(value: string): Promise<void> {
    await this.setState({ searchString: value });
    const { searchString } = this.state;
    console.log(searchString);
    apiRequest(API_BASE_URL, searchString).then((data) =>
      this.setState({ storeApiResult: data })
    );
  }

  handleKeyDown(event: React.KeyboardEvent, value: string): void {
    if (event.key === 'Enter') {
      this.handlerOnClick(value);
    }
  }

  render() {
    const { storeApiResult, searchString } = this.state;

    return (
      <div className="home-page">
        <div className="home-page-header">
          <h1>Home page</h1>
          <SearchBlock
            search={searchString}
            handleKeyDown={this.handleKeyDown}
            handlerOnClick={this.handlerOnClick}
          />
        </div>
        <div className="home-page-content">
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
