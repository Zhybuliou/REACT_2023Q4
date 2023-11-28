export default function PageError({ ...props }) {
  const { error } = props;
  return (
    <div className="page-error">
      <div className="page-error-image" />
      <div className="page-error-content">
        <h2 className="text-style">oops, something went wrong issue.</h2>
        <p>`Error: {error}`</p>
        <a className="page-error-reset" href="/pages/1">
          RESET
        </a>
      </div>
    </div>
  );
}
