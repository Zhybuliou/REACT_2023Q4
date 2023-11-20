import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import SearchBlock from '../components/SearchBlock';
import Cards from '../components/Cards';
import ApiPagination from '../components/ApiPagination';
import SelectCards from '../components/SelectCards';

import { RootState } from '../store/store';
import { useGetApiResultQuery } from '../store/createApiResult';
import {
  addCharacters,
  removeCharacters,
} from '../store/sliceCharactersReducer';
import API_BASE_URL from '../data/url';
import apiRequest from '../service/apiRequest';
import { addPage } from '../store/slicePagesReducer';
import { IResultPeople } from '../types/interface';
import PageNotFound from '../components/PageNotFound';

export default function HomePage() {
  const inputSearch = useSelector(
    (state: RootState) => state.inputSearch.inputSearch
  );
  const perPage = useSelector((state: RootState) => state.perPage.perPage);
  const characters = useSelector(
    (state: RootState) => state.characters.characters
  );
  const dispatch = useDispatch();
  const { id, page } = useParams();
  const { data = [], isFetching } = useGetApiResultQuery({
    search: inputSearch,
    page,
  });

  const handlerOnTwenty = async (currentPage: string): Promise<void> => {
    dispatch(removeCharacters());
    const countPages = data?.count ? Math.ceil(data.count / 10) : 9;
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
    ).then((res) => res.results);

    const promise2 =
      countPages >= +myPage + 1
        ? await apiRequest(API_BASE_URL, inputSearch, `${+myPage! + 1}`).then(
            (response) => response.results
          )
        : [];

    await Promise.all([promise, promise2]).then((res) =>
      dispatch(addCharacters(res.flat(Infinity)))
    );
  };

  const handlerOnClick = async (
    getPage: string,
    resData: IResultPeople
  ): Promise<void> => {
    await dispatch(addPage('1'));
    await dispatch(removeCharacters());
    if (getPage === '10') {
      dispatch(addCharacters(resData?.results));
    }

    if (getPage === '20') {
      handlerOnTwenty('1');
    }
    localStorage.setItem('search', inputSearch);
  };

  const handlerOnChengUrl = async (
    getPerPage: string,
    resData: IResultPeople,
    currentPage: string = '1'
  ): Promise<void> => {
    await dispatch(addPage(currentPage));
    await dispatch(removeCharacters());

    if (getPerPage === '10') {
      dispatch(addCharacters(resData?.results));
    }

    if (getPerPage === '20') {
      handlerOnTwenty(currentPage);
    }
  };

  useEffect(() => {
    handlerOnClick(perPage, data).catch((error) => error);
    return () => {
      dispatch(removeCharacters());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputSearch, perPage]);

  useEffect(() => {
    if (!id) {
      handlerOnChengUrl(perPage, data, page).catch((error) => error);
    }
    return () => {
      dispatch(removeCharacters());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, isFetching]);

  return (
    <div className="home-page">
      <div className="home-page-header">
        <SelectCards />
        {!!characters.length && !isFetching && (
          <ApiPagination countItems={data.count} />
        )}
        <SearchBlock />
      </div>
      <div className="home-page-content-wrapper">
        <div className="home-page-content">
          {!data.count && !isFetching && <PageNotFound />}
          {!!characters.length && !isFetching ? <Cards /> : <Loading />}
        </div>
        <Outlet />
      </div>
    </div>
  );
}
