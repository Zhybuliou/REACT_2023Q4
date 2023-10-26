import { Component } from 'react';

type SearchType = {
  search: string;
  handleKeyDown: (event: React.KeyboardEvent, value: string) => void;
  handlerOnClick: (value: string) => void;
};
type MySearch = {
  searchString: string;
};

export default class SearchBlock extends Component<SearchType, MySearch> {
  constructor(props: SearchType) {
    super(props);
    const { search } = this.props;
    this.state = {
      searchString: search,
    };
    this.handlerOnChange = this.handlerOnChange.bind(this);
  }

  handlerOnChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ searchString: event.target.value });
  }

  render() {
    const { searchString } = this.state;
    const { handlerOnClick } = this.props;
    return (
      <div className="search-block">
        <input
          className="search-block-input"
          name="value"
          type="text"
          placeholder="search character ..."
          value={searchString}
          onChange={(e) => this.handlerOnChange(e)}
        />
        <button
          onClick={() => {
            this.setState({ searchString: searchString.trim() });
            handlerOnClick(searchString);
          }}
          type="button"
          className="search-block-button"
        >
          Search
        </button>
      </div>
    );
  }
}
