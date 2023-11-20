import { useNavigate, useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';
import Loading from './Loading';
import planets from '../data/planets';
import { useGetApiResultQuery } from '../store/createApiCharacters';

export default function CharacterCard() {
  const { id } = useParams();
  const navigate = useNavigate();
  let idPlanet = '';
  const { data = [], isFetching } = useGetApiResultQuery(
    {
      id,
    },
    { refetchOnMountOrArgChange: true }
  );

  const reset = (): void => {
    navigate('../', { replace: true });
  };
  if (typeof data?.homeworld === 'string') {
    idPlanet =
      data!.homeworld.split('/')[data!.homeworld.split('/').length - 2];
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
      <div className="character-card-wrapper" data-testid="character-card">
        <button
          data-testid="character-card-close"
          type="button"
          className="character-card_closed"
          onClick={() => reset()}
        >
          &#10006;
        </button>
        {isFetching ? (
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
                <h1>{data.name}</h1>
              </div>
              <div className="character-card-description">
                <ul>
                  <li>
                    <strong>Birth Year:</strong> {data.birth_year}
                  </li>
                  <li>
                    <strong>Height:</strong> {data.height}
                  </li>
                  <li>
                    <strong>Mass:</strong> {data.mass}
                  </li>
                  <li>
                    <strong>Gender:</strong> {data.gender}
                  </li>
                  <li>
                    <strong>Hair Color:</strong> {data.hair_color}
                  </li>
                  <li>
                    <strong>Skin Color:</strong> {data.skin_color}
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
              <div className="character-card-description">
                <h2>Films:</h2>
                {data.films.map((film: string) => (
                  <div
                    key={nanoid()}
                    className="character-card_planet"
                    style={{
                      backgroundImage: `url(https://starwars-visualguide.com/assets/img/films/${
                        film.split('/')[film.split('/').length - 2]
                      }.jpg)`,
                    }}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
