import mandalorian from '../assets/shooting-fire-din-djarin.gif';

export default function PageError({ ...props }) {
  const { error } = props;
  return (
    <div className="page-error">
      <div className="page-error-image">
        <img src={mandalorian} alt="Page Not Found" />
      </div>
      <div className="page-error-content">
        <h2 className="text-style">oops, something went wrong issue.</h2>
        <p>`Error: {error}`</p>
        <a className="page-error-reset" href="/">
          RESET
        </a>
      </div>
    </div>
  );
}
