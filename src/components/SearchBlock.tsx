import { useState } from 'react';

export default function SearchBlock({
  search,
  handleKeyDown,
  handlerOnClick,
}: {
  search: string;
  handleKeyDown: (event: React.KeyboardEvent, searchString: string) => void;
  handlerOnClick: (value: string, getPage?: string) => Promise<void>;
}) {
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
        onClick={async () => {
          await setSearchString(searchString.trim());
          handlerOnClick(searchString);
        }}
        type="submit"
        className="search-block-button"
      >
        Search
      </button>
    </div>
  );
}
