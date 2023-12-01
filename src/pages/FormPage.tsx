import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addFormValues } from '../store/sliceFormReducer';

export default function FormPage() {
  const dispatch = useDispatch();
  const formState = useRef(null);
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (formState.current) {
      const myForm = formState.current as HTMLFormElement;
      const formObject = new FormData(myForm);
      const formValue = Object.fromEntries(formObject.entries());
      const image = formValue.image as Blob;
      const { name, age, email, gender, check, country } = formValue;
      dispatch(
        addFormValues({ name, age, email, gender, check, country, image })
      );
    }
  }
  return (
    <div className="home-page">
      <div className="home-page-header">
        <h2>Uncontrolled Form</h2>
      </div>
      <div className="home-page-content-wrapper">
        <div className="form-page-content">
          <form
            onSubmit={(e) => handleSubmit(e)}
            ref={formState}
            className="uncontrolled-form"
          >
            <label htmlFor="temp-id">Name :</label>
            <input id="temp-id" type="text" name="name" />
            <label htmlFor="temp-age">Age :</label>
            <input id="temp-age" type="number" name="age" />
            <label htmlFor="temp-email">Email :</label>
            <input id="temp-email" type="email" name="email" />
            <label htmlFor="temp-password">Password :</label>
            <input id="temp-password" type="password" name="password" />
            <label htmlFor="repeat-password">Repeat password :</label>
            <input
              id="repeat-password"
              type="password"
              name="repeat-password"
            />
            <fieldset id="temp-gender" className="group-gender">
              <p>Gender : </p> Male
              <input type="radio" value="Male" name="gender" />
              Female
              <input type="radio" value="Female" name="gender" />
            </fieldset>
            <label htmlFor="temp-checkbox">Check :</label>
            <div className="check-input">
              <input id="temp-checkbox" type="checkbox" name="check" />
              <span>
                you agree to our website cookie use as described in our Cookie
                Policy.
              </span>
            </div>
            <label htmlFor="temp-image">Image :</label>
            <input id="temp-image" type="file" name="image" />
            <label htmlFor="temp-country">Country :</label>
            <input
              id="temp-country"
              type="text"
              name="country"
              list="country"
              autoComplete="off"
            />
            <datalist id="country">
              <option>USA</option>
              <option>Canada</option>
              <option>Poland</option>
              <option>Spain</option>
              <option>Belarus</option>
            </datalist>
            <button type="submit" className="button-submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
