export default function SelectCards() {
  return (
    <div className="select-input-characters-label">
      <label className="select-input-characters-label" htmlFor="select">
        per page:
        <select
          name="select"
          id="select"
        //   onChange={(event) => {
        //     dispatch(addPerPage(`${event.target.value}`));
        //     dispatch(addPage(`1`));
        //     navigate('/pages/1', { replace: true });
        //   }}
        >
          <option data-testid="option-1" value="10">
            10
          </option>
          <option data-testid="option-2" value="20">
            20
          </option>
        </select>
      </label>
    </div>
  );
}