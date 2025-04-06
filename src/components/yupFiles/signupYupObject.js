import * as yup from "yup";
const signupObject = yup.object().shape({
        userName: yup.string()
            .required('Name is required')
            .min(4, 'minimum 4 aplhabet required')
            .max(15, 'maximum 15 alphabet allowed'),

        userEmail: yup.string().email('use valid email address')
            .required('Email is required'),

        userPNumber: yup.string()
            .required('Phone number is required')
            .matches(/^\d{10}$/, 'enter valid phone number'),

        userPassword: yup.string()
            .required('Password is required')
            .min(8, 'password must be 8 character long')
            .matches(/[A-Z]/, 'must have atleast one capital letter'),

        confirmPassword: yup.string()
            .required("Confirm Password is required")
            .oneOf([yup.ref("userPassword")], "Passwords must match"),
        gender: yup.string()
            .required("Gender is required"),
    });
export default signupObject