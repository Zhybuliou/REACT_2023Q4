import { IPeople } from '../types/interface';
import Card from './Card';
import PageNotFound from './PageNotFound';

export default function Cards({ ...props }) {
  const { arrayPeople } = props;
  return (
    <>
      {arrayPeople?.map((card: IPeople) => (
        <Card
          name={card.name}
          birthYear={card.birth_year}
          url={card.url}
          key={card.name}
          mass={card.mass}
          height={card.height}
          gender={card.gender}
          skinColor={card.skin_color}
        />
      ))}
      {!arrayPeople.length && <PageNotFound />}
    </>
  );
}
