import { nanoid } from 'nanoid';
import { IPeople } from '../types/interface';
import Card from './Card';
import PageNotFound from './PageNotFound';

export default function Cards({ ...props }) {
  const { arrayPeople } = props;
  return (
    <>
      {arrayPeople?.map((card: IPeople) => (
        <Card name={card.name} url={card.url} key={nanoid()} />
      ))}
      {!arrayPeople.length && <PageNotFound />}
    </>
  );
}
