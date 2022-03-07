import * as yup from 'yup'

export const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .required('E-mail is required')
    .email('Invalid e-mail format'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Must contain at least 6 characters'),
  // password_confirmation: yup.string().oneOf(['active', 'canceled']) // exemplo
  password_confirmation: yup.string().oneOf(
    [
      null, // precisa ser vazio ou igual ao password
      yup.ref('password'),
    ],
    'Passwords must match'
  ),
})
