import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function SelectCards() {
  const { addPerPage } = useContext(AppContext);
  return (
    <div className="select-input-characters-label">
      <label className="select-input-characters-label" htmlFor="select">
        per page:
        <select
          name="select"
          id="select"
          onChange={(event) => {
            addPerPage(`${event.target.value}`);
          }}
        >
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
    </div>
  );
}
