import ApiPagination from '@/components/ApiPagination';
import Cards from '@/components/Cards';
import Header from '@/components/Header';
import Loading from '@/components/Loading';
import PageNotFound from '@/components/NotFound';
import SearchBlock from '@/components/SearchBlock';
import SelectCards from '@/components/SelectCards';
import { IResultPeople } from '@/types/interface';
import React from 'react';

export async function getStaticPaths() {
  const arr = new Array(9);
  return {
    paths: await arr.map((i: number) => ({
      params: { page: i.toString() },
    })),
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: {
  params: { id: string; page: string };
}) {
  const resp = await fetch(`https://swapi.dev/api/people/?page=${params.page}`);

  return {
    props: {
      characters: await resp.json(),
    },
  };
}

export default function Page({ characters }: { characters: IResultPeople }) {
  return (
    <div>
      <div className="home-page">
        <div className="home-page-header">
          <SelectCards />
          <ApiPagination countItems={82} />
          <SearchBlock />
        </div>
        <div className="home-page-content-wrapper">
          {!!characters ? <Cards characters={characters} /> : <Loading />}
          {/* <div className="home-page-content">
          {!data.count && !isFetching && <PageNotFound />}
          {!!characters.length && !isFetching ? <Cards /> : <Loading />}
        </div>
        <Outlet /> */}
        </div>
      </div>
    </div>
  );
}
