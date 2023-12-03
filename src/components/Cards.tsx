import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Card from './Card';
import PageNotFound from './PageNotFound';
import { RootState } from '../store/store';
import { IFormResult } from '../types/interface';

export default function Cards() {
  const formValues = useSelector(
    (state: RootState) => state.formValues.formValues
  );
  return (
    <>
      {!!formValues?.length &&
        formValues?.map((card: IFormResult) => (
          <Card card={card} key={nanoid()} />
        ))}
      {!formValues?.length && <PageNotFound />}
    </>
  );
}
