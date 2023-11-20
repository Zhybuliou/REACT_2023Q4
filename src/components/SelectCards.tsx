import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addPerPage } from '../store/slicePrePageReducer';
import { addPage } from '../store/slicePagesReducer';

export default function SelectCards() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="select-input-characters-label">
      <label className="select-input-characters-label" htmlFor="select">
        per page:
        <select
          name="select"
          id="select"
          onChange={(event) => {
            dispatch(addPerPage(`${event.target.value}`));
            dispatch(addPage(`1`));
            navigate('/pages/1', { replace: true });
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
