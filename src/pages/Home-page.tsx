import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import apiRequest from '../service/apiRequest';
import API_BASE_URL from '../data/url';
import { IResultPeople } from '../types/interface';
import Loading from '../components/Loading';
import SearchBlock from '../components/SearchBlock';
import Cards from '../components/Cards';
import ApiPagination from '../components/ApiPagination';

export default function HomePage() {
  const [storeApiResult, setStoreApiResult] = useState<IResultPeople | null>(
    null
  );
  const [searchString, setSearchString] = useState(
    localStorage.getItem('search') || ''
  );

  const location = useLocation();
  const navigate = useNavigate();

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
    await apiRequest(
      API_BASE_URL,
      searchString,
      location.pathname.split('/')[2]
    ).then((data) => setStoreApiResult(data));
  };
  useEffect(() => {
    handlerOnChengUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const handleKeyDown = (event: React.KeyboardEvent, value: string): void => {
    if (event.key === 'Enter') {
      handlerOnClick(value);
    }
  };

  return (
    <div className="home-page">
      <div className="home-page-header">
        <h1>Home page</h1>
        {storeApiResult && <ApiPagination countItems={storeApiResult.count} />}
        <SearchBlock
          search={searchString}
          handleKeyDown={handleKeyDown}
          handlerOnClick={handlerOnClick}
        />
      </div>
      <div className="home-page-content">
        {storeApiResult ? (
          <Cards arrayPeople={storeApiResult.results} />
        ) : (
          <Loading />
        )}
        <Outlet />
      </div>
    </div>
  );
}
