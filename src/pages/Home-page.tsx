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
  const [pages, setPages] = useState('1');
  const [allCharacters, setAllCharacters] = useState<IPeople[]>([]);
  const [perPage, setPerPage] = useState('10');
  const [searchString, setSearchString] = useState(
    localStorage.getItem('search') || ''
  );

  const handlerOnTwenty = async (currentPage: string): Promise<void> => {
    await setAllCharacters([]);
    let myPage = +currentPage! === 1 ? currentPage : +currentPage! + 1;
    if (+currentPage! > 2) {
      myPage = +currentPage! + 2;
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

  const handlerOnClick = async (
    value: string,
    getPage: string = perPage
  ): Promise<void> => {
    await setAllCharacters([]);
    await setStoreApiResult(null);
    await setSearchString(value);
    localStorage.setItem('search', value);
    apiRequest(API_BASE_URL, value, '1').then((data) => {
      setStoreApiResult(data);
      if (getPage === '10') {
        setAllCharacters(data.results);
      }
    });
    navigate('/pages/1', { replace: true });
    if (getPage === '20') {
      handlerOnTwenty('1');
    }
  };

  const handlerOnChengUrl = async (getPerPage: string): Promise<void> => {
    await setAllCharacters([]);
    await setStoreApiResult(null);
    await apiRequest(API_BASE_URL, searchString, page).then((data) => {
      setStoreApiResult(data);
      if (getPerPage === '10') {
        setAllCharacters(data.results);
      }
    });
    if (page) {
      setPages(page);
      if (getPerPage === '20') {
        handlerOnTwenty(page);
      }
    }
  };

  const handlerOnChangePerPage = async (value: string): Promise<void> => {
    await setAllCharacters([]);
    await setPerPage(value);
    await handlerOnClick(searchString, value);
  };
  useEffect(() => {
    handlerOnChengUrl(perPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (!id && page !== pages) {
      handlerOnChengUrl(perPage);
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
        {storeApiResult && (
          <ApiPagination countItems={storeApiResult.count} perPage={perPage} />
        )}
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
