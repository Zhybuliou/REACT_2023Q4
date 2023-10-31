import { useEffect, useState } from 'react';
import apiRequest from '../service/apiRequest';
import API_BASE_URL from '../data/url';
import { IResultPeople } from '../types/interface';
import Loading from '../components/Loading';
import SearchBlock from '../components/SearchBlock';
import Cards from '../components/Cards';

export default function HomePage() {
  const [storeApiResult, setStoreApiResult] = useState<IResultPeople | null>(
    null
  );
  const [searchString, setSearchString] = useState(
    localStorage.getItem('search') || ''
  );

  const handlerOnClick = async (value: string): Promise<void> => {
    await setStoreApiResult(null);
    await setSearchString(value);
    localStorage.setItem('search', value);
    apiRequest(API_BASE_URL, value).then((data) => setStoreApiResult(data));
  };

  useEffect(() => {
    handlerOnClick(searchString);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent, value: string): void => {
    if (event.key === 'Enter') {
      handlerOnClick(value);
    }
  };

  return (
    <div className="home-page">
      <div className="home-page-header">
        <h1>Home page</h1>
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
      </div>
    </div>
  );
}
