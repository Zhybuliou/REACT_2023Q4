import { IFormResult } from '../types/interface';

export default function Card({ card }: { card: IFormResult }) {
  const { image, name } = card;
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
        </div>
      </div>
    </div>
  );
}
