import ApiPagination from '@/components/ApiPagination';
import Cards from '@/components/Cards';
import Details from '@/components/Character';
import Loading from '@/components/Loading';
import SearchBlock from '@/components/SearchBlock';
import SelectCards from '@/components/SelectCards';
import { IResultPeople } from '@/types/interface';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

export const getServerSideProps = (async (context) => {
  const res = await fetch(`https://swapi.dev/api/people/?search=${context.query.search || ''}&page=${context.query.page}`)
  const repo = await res.json()
  return { props: { characters : repo } }
}) satisfies GetServerSideProps<{
  characters: IResultPeople
}>

export default function Page({ characters }: { characters: IResultPeople }) {
  const router = useRouter();
  const checkCharacter = router.query.character;
  return (
    <div>
      <div className="home-page">
        <div className="home-page-header">
          <SelectCards />
          <ApiPagination countItems={characters.count} />
          <SearchBlock />
        </div>
        <div className="home-page-content-wrapper">
          <div className="home-page-content">
            {!!characters ? <Cards characters={characters} /> : <Loading />}
          </div>
          {checkCharacter && <Details />}
        </div>
      </div>
    </div>
  );
}
