import { Link } from 'react-router-dom';

export default function Card({ ...props }) {
  const { name, url, birthYear, mass, height, gender, skinColor } = props;
  const idCharacter = url.split('/')[url.split('/').length - 2];
  return (
    <div className="card">
      <Link to={`character/${idCharacter}`}>
        <div className="wrapper-card">
          <div className="color_bg" />
          <div
            className="card_img"
            style={{
              backgroundImage: `url(https://starwars-visualguide.com/assets/img/characters/${idCharacter}.jpg)`,
            }}
          />
          <div className="card-info">
            <h2>{name}</h2>
            <ul>
              <li>
                <strong>Birth year: </strong>
                {birthYear}
              </li>
              <li>
                <strong>Mass: </strong>
                {mass}
              </li>
              <li>
                <strong>Height: </strong>
                {height}
              </li>
              <li>
                <strong>Gender: </strong>
                {gender}
              </li>
              <li>
                <strong>Skin color: </strong>
                {skinColor}
              </li>
            </ul>
          </div>
        </div>
      </Link>
    </div>
  );
}
