import * as yup from 'yup';


const emailRegex = /\w*@gmail\.com/
const passwordRegex = /^[A-Z](?=.*[a-z0-9])/

export const LoginSchema = yup.object().shape({
    email: yup.string().required("Email Is Required").matches(emailRegex, {message: 'Email address must be xx@gmial.com'}),
    password: yup.string().required("Password Is Required").matches(passwordRegex, {message: "Password must contain upper-Char"}),
})