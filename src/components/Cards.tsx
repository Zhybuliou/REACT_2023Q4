import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { IPeople } from '../types/interface';
import Card from './Card';
import PageNotFound from './PageNotFound';
import { RootState } from '../store/store';

export default function Cards() {
  const characters = useSelector(
    (state: RootState) => state.characters.characters
  );
  return (
    <>
      {characters?.length &&
        characters?.map((card: IPeople) => (
          <Card name={card.name} url={card.url} key={nanoid()} />
        ))}
      {!characters?.length && <PageNotFound />}
    </>
  );
}
