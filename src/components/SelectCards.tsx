import { useDispatch } from 'react-redux';
import { addPerPage } from '../store/slicePrePageReducer';

export default function SelectCards() {
  const dispatch = useDispatch();
  return (
    <div className="select-input-characters-label">
      <label className="select-input-characters-label" htmlFor="select">
        per page:
        <select
          name="select"
          id="select"
          onChange={(event) => {
            dispatch(addPerPage(`${event.target.value}`));
          }}
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
