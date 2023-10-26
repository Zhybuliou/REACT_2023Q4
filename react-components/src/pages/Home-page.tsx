import { Component } from 'react';
import apiRequest from '../service/apiRequest';
import API_BASE_URL from '../data/url';
import { IResultPeople } from '../types/interface';
import Loading from '../components/Loading';
import SearchBlock from '../components/SearchBlock';
import Cards from '../components/Cards';

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
    this.setState({ storeApiResult: null });
    const stringTrim = value.trim();
    await this.setState({ searchString: stringTrim });
    const { searchString } = this.state;
    apiRequest(API_BASE_URL, searchString).then((data) =>
      this.setState({ storeApiResult: data })
    );
    localStorage.setItem('search', stringTrim);
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
            <Cards arrayPeople={storeApiResult.results} />
          ) : (
            <Loading />
          )}
        </div>
      </div>
    );
  }
}
