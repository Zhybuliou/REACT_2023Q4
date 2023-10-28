import { useState } from 'react';

export default function SearchBlock({ ...props }) {
  const { search, handlerOnClick, handleKeyDown } = props;
  const [searchString, setSearchString] = useState(search);

  function handlerOnChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setSearchString(event.target.value);
  }
  return (
    <div className="search-block">
      <input
        className="search-block-input"
        name="value"
        type="text"
        placeholder="search character ..."
        value={searchString}
        onChange={(event) => handlerOnChange(event)}
        onKeyUp={(event) => handleKeyDown(event, searchString)}
      />
      <button
        onClick={() => {
          setSearchString(searchString.trim());
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
