import { IFormResult } from '../types/interface';

export default function Card({ card }: { card: IFormResult }) {
  const { image, name, age, email, gender, check, country, password } = card;
  return (
    <div className="card" data-testid="card">
      <div className="wrapper-card">
        <div className="color_bg" />
        <div
          className="card_img"
          style={{
            backgroundImage: `url(${URL.createObjectURL(image)})`,
          }}
        />
        <div className="card-info">
          <h2>{name}</h2>
          <ul>
            <li>
              <strong>Age: </strong>
              {age}
            </li>
            <li>
              <strong>Email: </strong>
              {email}
            </li>
            <li>
              <strong>Gender: </strong>
              {gender}
            </li>
            <li>
              <strong>T&C: </strong>
              {check ? 'yes' : 'no'}
            </li>
            <li>
              <strong>Password: </strong>
              {password}
            </li>
            <li>
              <strong>Country: </strong>
              {country}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
