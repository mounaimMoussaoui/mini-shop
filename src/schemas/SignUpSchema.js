import * as yup from 'yup';



const emailRegex = /\w*@gmail\.com/
const passwordRegex = /^[A-Z](?=.*[a-z0-9])/
export const signUpSchema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email().matches(emailRegex, "Email xxxxx.xx@gmail.com").required("Email is required"),
    password: yup.string().matches(passwordRegex, "Password Must Start With Upper-Char").min(6, "Password Must Greater Then 6 Characters").required("Password is required"),
})