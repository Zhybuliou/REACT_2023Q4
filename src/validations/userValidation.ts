import * as yup from 'yup';

const getCharacterValidationError = (str: string) => {
  return `You password must have at least 1 ${str} character`;
};
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

const userScheme = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Z][A-Z,a-z, ]{1,19}$/, 'Please enter valid name')
    .max(40)
    .required('This field is Required'),
  age: yup.number().positive('Please enter valid age').nullable(),
  email: yup
    .string()
    .email('Please enter valid email')
    .required('This field is Required'),
  password: yup
    .string()
    .required('Please enter a password')
    .min(8, 'Password must have at least 8 characters')
    .matches(/[0-9]/, getCharacterValidationError('digit'))
    .matches(/[a-z]/, getCharacterValidationError('lowercase'))
    .matches(/[A-Z]/, getCharacterValidationError('uppercase')),
  confirmPassword: yup
    .string()
    .required('Please re-type your password')
    .oneOf([yup.ref('password')], 'Passwords does not match'),
  image: yup
    .mixed<File>()
    .test(
      'Check size image',
      'upload file',
      (value) => !value || (value && value.size <= 1024 * 1024)
    )
    .test(
      'Check format image',
      'upload file',
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
    ),
});

export default userScheme;
