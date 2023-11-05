import man from '../assets/source.gif';

export default function PageNotFoundRouter() {
  return (
    <div className="page-not-found">
      <div className="page-not-found-content text-style">
        <h1>404</h1>
        <h2>This is not page you are looking for.</h2>
      </div>
      <div className="page-not-found-image">
        <img src={man} alt="Page Not Found" />
      </div>
    </div>
  );
}
