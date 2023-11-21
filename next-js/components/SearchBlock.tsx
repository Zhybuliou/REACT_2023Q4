import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { RootState } from '../store/store';
// import { addInputSearch } from '../store/sliceSearchReducer';

export default function SearchBlock() {
//   const dispatch = useDispatch();
//   const searchValue = useSelector(
//     (state: RootState) => state.inputSearch.inputSearch
//   );
  const [searchString, setSearchString] = useState('');
//   const navigate = useNavigate();

  function handlerOnChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setSearchString(event.target.value);
  }
  return (
    <div className="search-block">
      <input
        data-testid="input-search"
        className="search-block-input"
        name="value"
        type="text"
        placeholder="search character ..."
        value={searchString}
        onChange={(event) => handlerOnChange(event)}
        // onKeyUp={(event) =>
        //   event.key === 'Enter' && dispatch(addInputSearch(searchString.trim()))
        // }
      />
      <button
        data-testid="button-search"
        onClick={async () => {
        //   dispatch(addInputSearch(searchString.trim()));
        //   navigate('/pages/1', { replace: true });
        }}
        type="submit"
        className="search-block-button"
      >
        Search
      </button>
    </div>
  );
}