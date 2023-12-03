/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import secondUserScheme from '../validations/secondValidation';
import { addFormValues } from '../store/sliceFormReducer';

interface IFormInput {
  age?: number | null | undefined;
  gender?: string | undefined;
  check?: string | undefined;
  country?: string | undefined;
  image?: FileList | undefined;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SecondFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(secondUserScheme) });
  const onSubmit = (data: IFormInput) => {
    if (data.image) {
      const image = data.image[0] as Blob;
      const { name, age, email, gender, check, country, password } = data;
      dispatch(
        addFormValues({
          name,
          age,
          email,
          gender,
          check,
          country,
          image,
          password,
        })
      );
      navigate('/');
    }
  };

  return (
    <div className="home-page">
      <div className="home-page-header">
        <h2>Controlled Form</h2>
      </div>
      <div className="home-page-content-wrapper">
        <div className="home-page-content">
          <form
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            className="uncontrolled-form"
          >
            <label htmlFor="temp-id">Name :</label>
            <input id="temp-id" type="text" {...register('name')} />
            <div className="error-message-block">
              {errors.name && <p>{errors.name.message}</p>}
            </div>
            <label htmlFor="temp-age">Age :</label>
            <input id="temp-age" type="number" {...register('age')} />
            <div className="error-message-block">
              {errors.age && <p>{errors.age.message}</p>}
            </div>
            <label htmlFor="temp-email">Email :</label>
            <input id="temp-email" type="email" {...register('email')} />
            <div className="error-message-block">
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <label htmlFor="temp-password">Password :</label>
            <input
              id="temp-password"
              type="password"
              {...register('password')}
            />
            <div className="error-message-block">
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            <label htmlFor="confirmPassword">Repeat password :</label>
            <input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword')}
            />
            <div className="error-message-block">
              {errors.confirmPassword && (
                <p>{errors.confirmPassword.message}</p>
              )}
            </div>
            <fieldset id="temp-gender" className="group-gender">
              <p>Gender : </p> Male
              <input
                type="radio"
                value="Male"
                defaultChecked
                {...register('gender')}
              />
              Female
              <input type="radio" value="Female" {...register('gender')} />
            </fieldset>
            <label htmlFor="temp-checkbox">Check :</label>
            <div className="check-input">
              <input
                id="temp-checkbox"
                type="checkbox"
                {...register('check')}
              />
              <span>
                you agree to our website cookie use as described in our Cookie
                Policy.
              </span>
            </div>
            <label htmlFor="temp-image">Image :</label>
            <input id="temp-image" type="file" {...register('image')} />
            <div className="error-message-block">
              {errors.image && <p>{errors.image.message}</p>}
            </div>
            <label htmlFor="temp-country">Country :</label>
            <input
              id="temp-country"
              type="text"
              list="country"
              {...register('country')}
            />
            <datalist id="country">
              <option>USA</option>
              <option>Canada</option>
              <option>Poland</option>
              <option>Spain</option>
              <option>Belarus</option>
            </datalist>
            <button
              type="submit"
              className="button-submit"
              disabled={!!Object.keys(errors).length}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
