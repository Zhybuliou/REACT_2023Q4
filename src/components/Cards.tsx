import { nanoid } from 'nanoid';
import { useContext } from 'react';
import { IPeople } from '../types/interface';
import Card from './Card';
import PageNotFound from './PageNotFound';
import { AppContext } from '../context/AppContext';

export default function Cards() {
  const { storeCharacters } = useContext(AppContext);
  const arrayPeople = storeCharacters;
  return (
    <>
      {arrayPeople?.length &&
        arrayPeople?.map((card: IPeople) => (
          <Card name={card.name} url={card.url} key={nanoid()} />
        ))}
      {!arrayPeople?.length && <PageNotFound />}
    </>
  );
}
