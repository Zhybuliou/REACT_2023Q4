import Link from "next/link";


export default function Card({ name, url }: { name: string; url: string }) {
  const idCharacter = url.split('/')[url.split('/').length - 2];
  return (
    <div className="card" data-testid="card">
      <Link href={`character/${idCharacter}`}>
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
          </div>
        </div>
      </Link>
    </div>
  );
}