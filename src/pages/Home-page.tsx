import { useEffect, useContext } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import apiRequest from '../service/apiRequest';
import API_BASE_URL from '../data/url';
import Loading from '../components/Loading';
import SearchBlock from '../components/SearchBlock';
import Cards from '../components/Cards';
import ApiPagination from '../components/ApiPagination';
import SelectCards from '../components/SelectCards';
import { AppContext } from '../context/AppContext';

export default function HomePage() {
  const { id, page } = useParams();
  const navigate = useNavigate();

  const {
    addStoreApiResult,
    addAllCharacters,
    removeStoreApiResult,
    removeAllCharacters,
    addPages,
    inputSearch,
    storeApiResult,
    storeCharacters,
    perPage,
    pages,
  } = useContext(AppContext);

  const handlerOnTwenty = async (currentPage: string): Promise<void> => {
    await removeAllCharacters();
    const countPages = storeApiResult?.count
      ? Math.ceil(storeApiResult.count / 10)
      : 9;
    let myPage = +currentPage! === 1 ? currentPage : +currentPage! + 1;
    if (+currentPage > 2) {
      myPage = +currentPage + 2;
    }
    if (+currentPage >= 4) {
      myPage = +currentPage + 3;
    }
    if (+currentPage === 5) {
      myPage = 9;
    }
    const promise = await apiRequest(
      API_BASE_URL,
      inputSearch,
      `${myPage}`
    ).then((data) => data.results);

    const promise2 =
      countPages >= +myPage + 1
        ? await apiRequest(API_BASE_URL, inputSearch, `${+myPage! + 1}`).then(
            (data) => data.results
          )
        : [];

    await Promise.all([promise, promise2]).then((data) =>
      addAllCharacters(data.flat(Infinity))
    );
  };

  const handlerOnClick = async (
    value: string,
    getPage: string = perPage
  ): Promise<void> => {
    await removeAllCharacters();
    await removeStoreApiResult();
    apiRequest(API_BASE_URL, value, '1').then((data) => {
      addStoreApiResult(data);
      if (getPage === '10') {
        addAllCharacters(data.results);
      }
    });
    navigate('/pages/1', { replace: true });
    if (getPage === '20') {
      handlerOnTwenty('1');
    }
  };

  const handlerOnChengUrl = async (getPerPage: string): Promise<void> => {
    await removeAllCharacters();
    await removeStoreApiResult();
    await apiRequest(API_BASE_URL, inputSearch, page).then((data) => {
      addStoreApiResult(data);
      if (getPerPage === '10') {
        addAllCharacters(data.results);
      }
    });
    if (page) {
      addPages(page);
      if (getPerPage === '20') {
        handlerOnTwenty(page);
      }
    }
  };

  useEffect(() => {
    handlerOnClick(inputSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputSearch, perPage]);

  useEffect(() => {
    if (!id && page !== pages) {
      handlerOnChengUrl(perPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className="home-page">
      <div className="home-page-header">
        <SelectCards />
        {!!storeApiResult?.count && <ApiPagination />}
        <SearchBlock />
      </div>
      <div className="home-page-content-wrapper">
        <div className="home-page-content">
          {storeCharacters ? <Cards /> : <Loading />}
        </div>
        <Outlet />
      </div>
    </div>
  );
}
