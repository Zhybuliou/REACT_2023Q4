import { PureComponent } from 'react';

type CardType = {
  name: string;
};

export default class Card extends PureComponent<CardType> {
  render() {
    const { name } = this.props;
    return (
      <div className="card">
        <div className="wrapper-card">
          <div className="color_bg" />
          <div
            className="card_img"
            style={{
              backgroundImage: `url(https://starwars-visualguide.com/assets/img/characters/10.jpg)`,
            }}
          />
          <div className="card-info">
            <h2>{name}</h2>
            <p className="date_">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
              quam eveniet ipsum reiciendis voluptatum eligendi exercitationem
              repudiandae molestiae. Quasi, ducimus. Laudantium qui sunt tempore
              incidunt ab aperiam libero, eos laboriosam!
            </p>
            <div className="action">
              <div className="price-group">
                <p className="price old-price">100</p>
                <p className="price new-price">200</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
