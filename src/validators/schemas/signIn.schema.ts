import * as yup from 'yup'

// cast de dados -> automatizar a conversao da string para objeto pelo yup
export const signInFormSchema = yup.object().shape({
  email: yup
    .string()
    .required('E-mail is required')
    .email('Invalid e-mail format'),
  password: yup.string().required('Password is required'),
})
