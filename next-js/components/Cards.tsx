import { nanoid } from 'nanoid';
import { IPeople, IResultPeople } from '../types/interface';
import Card from './Card';
import PageNotFound from './NotFound';

export default function Cards({ characters }: { characters: IResultPeople }) {
  return (
    <>
      {characters.results?.length &&
        characters.results?.map((card: IPeople) => (
          <Card name={card.name} url={card.url} key={nanoid()} />
        ))}
      {!characters.results && <PageNotFound />}
    </>
  );
}
