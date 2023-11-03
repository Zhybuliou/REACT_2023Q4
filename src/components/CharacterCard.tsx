import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IPeople } from '../types/interface';
import API_BASE_URL from '../data/url';
import apiRequestCharacter from '../service/apiRequestCharacter';
import Loading from './Loading';
import planets from '../data/planets';

export default function CharacterCard() {
  const [character, setCharacter] = useState<IPeople | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  let idPlanet = '';

  useEffect(() => {
    if (id) {
      setCharacter(null);
      apiRequestCharacter(API_BASE_URL, id).then((data) => setCharacter(data));
    }
  }, [id]);

  const reset = (): void => {
    navigate('../', { replace: true });
  };
  if (typeof character?.homeworld === 'string') {
    idPlanet =
      character!.homeworld.split('/')[
        character!.homeworld.split('/').length - 2
      ];
  }
  let urlImage = `url(https://starwars-visualguide.com/assets/img/planets/${idPlanet}.jpg)`;
  if (planets[`${idPlanet}`] === 'Tatooin') {
    urlImage = 'url(https://i.stack.imgur.com/Ez95o.png)';
  }
  if (planets[`${idPlanet}`] === 'Corellia') {
    urlImage =
      'url(https://cdnb.artstation.com/p/assets/images/images/006/189/823/large/yuval-halevy-corellia-3.jpg)';
  }
  if (+idPlanet > 22) {
    urlImage =
      'url(https://starwars-visualguide.com/assets/img/big-placeholder.jpg)';
  }

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

            <div className="character-card-content">
              <div className="character-card-title">
                <h1>{character.name}</h1>
              </div>
              <div className="character-card-description">
                <ul>
                  <li>
                    <strong>Birth Year:</strong> {character.birth_year}
                  </li>
                  <li>
                    <strong>Height:</strong> {character.height}
                  </li>
                  <li>
                    <strong>Mass:</strong> {character.mass}
                  </li>
                  <li>
                    <strong>Gender:</strong> {character.gender}
                  </li>
                  <li>
                    <strong>Hair Color:</strong> {character.hair_color}
                  </li>
                  <li>
                    <strong>Skin Color:</strong> {character.skin_color}
                  </li>
                  <li>
                    <strong>Homeworld: </strong>
                    {planets[`${idPlanet}`] || ' n/a'}
                  </li>
                </ul>
              </div>
              <div
                className="character-card_planet"
                style={{
                  backgroundImage: `${urlImage}`,
                }}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
