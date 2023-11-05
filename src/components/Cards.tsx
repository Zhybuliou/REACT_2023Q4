import { nanoid } from 'nanoid';
import { IPeople } from '../types/interface';
import Card from './Card';
import PageNotFound from './PageNotFound';

export default function Cards({ arrayPeople }: { arrayPeople: IPeople[] }) {
  return (
    <>
      {arrayPeople.length &&
        arrayPeople?.map((card: IPeople) => (
          <Card name={card.name} url={card.url} key={nanoid()} />
        ))}
      {!arrayPeople.length && <PageNotFound />}
    </>
  );
}
