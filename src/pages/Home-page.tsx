import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import apiRequest from '../service/apiRequest';
import API_BASE_URL from '../data/url';
import { IPeople, IResultPeople } from '../types/interface';
import Loading from '../components/Loading';
import SearchBlock from '../components/SearchBlock';
import Cards from '../components/Cards';
import ApiPagination from '../components/ApiPagination';
import SelectCards from '../components/SelectCards';

export default function HomePage() {
  const { id, page } = useParams();
  const navigate = useNavigate();
  const [storeApiResult, setStoreApiResult] = useState<IResultPeople | null>(
    null
  );
  const [pages, setPages] = useState(page);
  const [allCharacters, setAllCharacters] = useState<IPeople[]>([]);
  const [searchString, setSearchString] = useState(
    localStorage.getItem('search') || ''
  );

  const handlerOnTwenty = async (): Promise<void> => {
    await setAllCharacters([]);
    let myPage = +page! === 1 ? page : +page! + 1;
    if (+page! > 2) {
      myPage = +page! + 2;
    }
    const promise = await apiRequest(
      API_BASE_URL,
      searchString,
      `${myPage}`
    ).then((data) => data.results);

    const promise2 = await apiRequest(
      API_BASE_URL,
      searchString,
      `${+myPage! + 1}`
    ).then((data) => data.results);
    await Promise.all([promise, promise2]).then((data) =>
      setAllCharacters(data.flat(Infinity))
    );
  };

  const handlerOnChangePerPage = async (): Promise<void> => {
    handlerOnTwenty();
  };

  const handlerOnClick = async (value: string): Promise<void> => {
    await setStoreApiResult(null);
    await setSearchString(value);
    localStorage.setItem('search', value);
    apiRequest(API_BASE_URL, value, '1').then((data) =>
      setStoreApiResult(data)
    );
    navigate('/pages/1', { replace: true });
  };
  const handlerOnChengUrl = async (): Promise<void> => {
    await setStoreApiResult(null);
    await apiRequest(API_BASE_URL, searchString, page).then((data) =>
      setStoreApiResult(data)
    );
    if (page) setPages(page);
  };
  useEffect(() => {
    handlerOnTwenty();
    handlerOnChengUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (!id && page !== pages) {
      handlerOnChengUrl();
      handlerOnTwenty();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleKeyDown = (event: React.KeyboardEvent, value: string): void => {
    if (event.key === 'Enter') {
      handlerOnClick(value);
    }
  };

  return (
    <div className="home-page">
      <div className="home-page-header">
        <SelectCards handlerOnChangePerPage={handlerOnChangePerPage} />
        {storeApiResult && <ApiPagination countItems={storeApiResult.count} />}
        <SearchBlock
          search={searchString}
          handleKeyDown={handleKeyDown}
          handlerOnClick={handlerOnClick}
        />
      </div>
      <div className="home-page-content-wrapper">
        <div className="home-page-content">
          {allCharacters.length ? (
            <Cards arrayPeople={allCharacters} />
          ) : (
            <Loading />
          )}
        </div>
        <Outlet />
      </div>
    </div>
  );
}
