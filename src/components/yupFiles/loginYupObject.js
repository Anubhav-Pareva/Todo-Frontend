import * as yup from 'yup';
const loginObject = yup.object().shape({
        userEmail: yup.string()
            .required('email is required')
            .email('use valid email'),
        userPassword: yup.string()
            .required('password is required')
            .min(8, 'password must be 8 character long')
            .matches(/[A-Z]/, 'must have atleast one capital letter'),
    });
export default loginObject;