import { PureComponent } from 'react';

type CardType = {
  name: string;
  url: string;
};

export default class Card extends PureComponent<CardType> {
  render() {
    const { name, url } = this.props;
    return (
      <div className="card">
        <div className="wrapper-card">
          <div className="color_bg" />
          <div
            className="card_img"
            style={{
              backgroundImage: `url(https://starwars-visualguide.com/assets/img/characters/${
                url.split('/')[url.split('/').length - 2]
              }.jpg)`,
            }}
          />
          <div className="card-info">
            <h2>{name}</h2>
            <p className="date_">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
              quam eveniet ipsum reiciendis voluptatum eligendi exercitationem
            </p>
          </div>
        </div>
      </div>
    );
  }
}
