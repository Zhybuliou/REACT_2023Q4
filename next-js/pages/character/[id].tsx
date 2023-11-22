import React from 'react';
import { IPeople } from '@/types/interface';
import { nanoid } from 'nanoid';
import Loading from '@/components/Loading';
import planets from '@/data/planets';
import { useRouter } from 'next/router';

export async function getStaticPaths() {
  const arr = new Array(82);
  return {
    paths: await arr.map((i: number) => ({
      params: { id: i.toString() },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const resp = await fetch(`https://swapi.dev/api/people/${params.id}`);
  return {
    props: {
      people: await resp.json(),
      id: params.id,
    },
  };
}

export default function Details({
  people,
  id,
}: {
  people: IPeople;
  id: string;
}) {
  const router = useRouter();
  const reset = () => {
    router.push('/');
  };
  let idPlanet = '';
  if (typeof people?.homeworld === 'string') {
    idPlanet =
      people!.homeworld.split('/')[people!.homeworld.split('/').length - 2];
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
        {!people ? (
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
                <h1>{people.name}</h1>
              </div>
              <div className="character-card-description">
                <ul>
                  <li>
                    <strong>Birth Year:</strong> {people.birth_year}
                  </li>
                  <li>
                    <strong>Height:</strong> {people.height}
                  </li>
                  <li>
                    <strong>Mass:</strong> {people.mass}
                  </li>
                  <li>
                    <strong>Gender:</strong> {people.gender}
                  </li>
                  <li>
                    <strong>Hair Color:</strong> {people.hair_color}
                  </li>
                  <li>
                    <strong>Skin Color:</strong> {people.skin_color}
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
                {people.films.map((film: string) => (
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
