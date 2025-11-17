import * as yup from 'yup';

export const CheckoutValidation =  yup.object().shape({
        fullName: yup.string().required(),
        street: yup.string().required(),
        city: yup.string().required(),
        state: yup.string().required(),
        postalCode: yup.string().required(),
        country: yup.string().required(),
    });