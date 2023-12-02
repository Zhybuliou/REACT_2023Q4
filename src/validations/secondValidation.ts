import * as yup from 'yup';

const getCharacterValidationError = (str: string) => {
  return `You password must have at least 1 ${str} character`;
};
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

const secondUserScheme = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Z][A-Z,a-z, ]{1,19}$/, 'Please enter valid name')
    .max(40)
    .required('This field is Required'),
  age: yup
    .number()
    .typeError('age must be a number')
    .required('This field is Required')
    .positive('Please enter valid age')
    .nullable(),
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
    .mixed<FileList>()
    .required('Please re-type your password')
    .test(
      'Check size image',
      'file size > 2MB',
      (file) => !file || (file && file[0].size <= 2000000)
    )
    .test(
      'Check format image',
      'you can use only jpg, png',
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value[0].type))
    ),
  gender: yup.string(),
  check: yup.string(),
  country: yup.string(),
});

export default secondUserScheme;
