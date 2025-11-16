import * as yup from 'yup';

export const checkoutValidation = () => {
    return yup.object().shape({
        fullName: yup.string().required(),
    });
}