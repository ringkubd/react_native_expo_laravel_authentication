import * as Yup from 'yup';
const userValidation = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(8).required(),
});

export {
    userValidation
}
