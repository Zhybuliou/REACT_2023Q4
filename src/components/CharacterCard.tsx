import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IPeople } from '../types/interface';
import API_BASE_URL from '../data/url';
import apiRequestCharacter from '../service/apiRequestCharacter';
import Loading from './Loading';

export default function CharacterCard() {
  const [character, setCharacter] = useState<IPeople | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setCharacter(null);
      apiRequestCharacter(API_BASE_URL, id).then((data) => setCharacter(data));
    }
  }, [id]);

  const reset = (): void => {
    navigate('../', { replace: true });
  };

  return (
    <>
      <div className="character-wrapper" role="presentation" onClick={reset} />
      <div className="character-card-wrapper">
        <button
          type="button"
          className="character-card_closed"
          onClick={() => reset()}
        >
          &#10006;
        </button>
        {!character ? (
          <Loading />
        ) : (
          <>
            <div
              className="character-card_img"
              style={{
                backgroundImage: `url(https://starwars-visualguide.com/assets/img/characters/${id}.jpg)`,
              }}
            />
            <div className="character-card-img">{character?.name} </div>
            <div className="character-card-content"> Content </div>
          </>
        )}
      </div>
    </>
  );
}
