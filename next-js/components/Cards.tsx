import { nanoid } from 'nanoid';
// import { useSelector } from 'react-redux/es/hooks/useSelector';
import { IPeople, IResultPeople } from '../types/interface';
import Card from './Card';
import PageNotFound from './NotFound';
// import Card from './Card';
// import PageNotFound from './PageNotFound';
// import { RootState } from '../store/store';

export default function Cards({characters}:{characters: IResultPeople}) {
//   const characters = useSelector(
//     (state: RootState) => state.characters.characters
//   );
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