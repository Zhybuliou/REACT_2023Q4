import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

export default function SearchBlock() {
  const inputSearch = useContext(AppContext);
  const [searchString, setSearchString] = useState(
    inputSearch.inputSearch || ''
  );

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
        onKeyUp={(event) =>
          event.key === 'Enter' &&
          inputSearch.addInputSearch(searchString.trim())
        }
      />
      <button
        onClick={async () => {
          inputSearch.addInputSearch(searchString.trim());
        }}
        type="submit"
        className="search-block-button"
      >
        Search
      </button>
    </div>
  );
}
