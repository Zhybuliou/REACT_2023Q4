import { useRef, useState } from 'react';
import update from 'immutability-helper';
import { useDispatch } from 'react-redux';
import { addFormValues } from '../store/sliceFormReducer';
import userScheme from '../validations/userValidation';

export default function FormPage() {
  const dispatch = useDispatch();
  const formState = useRef(null);

  const [errors, setErrors] = useState({
    name: false,
    age: false,
    email: false,
    gender: false,
    check: false,
    country: false,
    image: false,
    password: false,
    confirmPassword: false,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (formState.current) {
      const myForm = formState.current as HTMLFormElement;
      const formObject = new FormData(myForm);
      const formValue = Object.fromEntries(formObject.entries());
      const isFormValid = await userScheme.isValid(formValue, {
        abortEarly: false,
      });

      if (!isFormValid) {
        userScheme.validate(formValue, { abortEarly: false }).catch((err) => {
          const errorsData = err.inner.reduce(
            (acc: { key: boolean }, error: { path: string }) => {
              return {
                ...acc,
                [error.path]: true,
              };
            },
            {}
          );

          setErrors((prevErrors) =>
            update(prevErrors, {
              $set: errorsData,
            })
          );
        });
      }
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
            <div className="error-message-block">
              {errors.name && 'Please enter valid name'}
            </div>
            <label htmlFor="temp-age">Age :</label>
            <input id="temp-age" type="number" name="age" />
            <div className="error-message-block">
              {errors.age && 'Please enter valid age'}
            </div>
            <label htmlFor="temp-email">Email :</label>
            <input id="temp-email" type="email" name="email" />
            <div className="error-message-block">
              {errors.email && 'Please enter valid email'}
            </div>
            <label htmlFor="temp-password">Password :</label>
            <input id="temp-password" type="password" name="password" />
            <div className="error-message-block">
              {errors.password && 'Please enter valid password'}
            </div>
            <label htmlFor="confirmPassword">Repeat password :</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
            />
            <div className="error-message-block">
              {errors.confirmPassword && 'Please enter valid confirm password'}
            </div>
            <fieldset id="temp-gender" className="group-gender">
              <p>Gender : </p> Male
              <input type="radio" value="Male" name="gender" defaultChecked />
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
            <div className="error-message-block">
              {errors.image &&
                'Please enter valid image < 2MB format .png .jpeg'}
            </div>
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
