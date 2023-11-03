export default function SelectCards({
  handlerOnChangePerPage,
}: {
  handlerOnChangePerPage: (value: string) => void;
}) {
  return (
    <div className="select-input-characters-label">
      <label className="select-input-characters-label" htmlFor="select">
        per page:
        <select
          name="select"
          id="select"
          onChange={(event) =>
            handlerOnChangePerPage(event.currentTarget.value)
          }
        >
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
    </div>
  );
}
