import { PureComponent } from 'react';

export default class SearchBlock extends PureComponent {
  render() {
    return (
      <div className="search-block">
        <input
          className="search-block-input"
          type="text"
          placeholder="search character ..."
        />
        <button type="button" className="search-block-button">
          Search
        </button>
      </div>
    );
  }
}
