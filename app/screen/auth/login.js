import UnauthorizedLayout from "../../components/layouts/unauthorizedLayout";
import {View, StyleSheet} from "react-native";
import {Formik} from "formik";
import Input from "../../components/form/input";
import {Button} from "react-native-paper";
import {userValidation} from "../../validations/loginValidation";
import {useEffect, useRef} from "react";
import {loginUser} from "../../store/services/auth/authActions";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
    const ref = useRef();
    const { loading, error, user, token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const initialValues = {
        email: 'ajr.jahid@gmail.com',
        password: '123456789'
    }
    const submit = (values, formikProps) => {
        dispatch(loginUser(values));
    }

    useEffect(() => {
        console.log(user)
        console.log(error)
        console.log(loading)
    }, [error, loading])
    return (
        <UnauthorizedLayout>
            <View style={styles.container}>
                <View style={{flex: 1}}>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={submit}
                        validationSchema={userValidation}
                        innerRef={ref}
                    >
                        {
                            ({handleSubmit, values, handleChange, handleBlur, errors, handleReset}) => {
                                return (
                                    <View style={styles.formContainer}>
                                        <Input
                                            label={`Email`}
                                            error={errors.email}
                                            errorText={errors.email}
                                            value={values.email}
                                            autoCapitalize="none"
                                            autoCompleteType="email"
                                            textContentType="emailAddress"
                                            keyboardType="email-address"
                                            onChangeText={handleChange('email')}
                                            onBlur={handleBlur('email')}
                                        />
                                        <Input
                                            label={`Password`}
                                            secureTextEntry
                                            error={errors.password}
                                            errorText={errors.password}
                                            icon="eye"
                                            name="password"
                                            id="password"
                                            onChangeText={handleChange('password')}
                                            onBlur={handleBlur('password')}
                                            value={values.password}
                                        />
                                        <Button
                                            mode="contained"
                                            onPress={handleSubmit}
                                            style={styles.button}
                                            loading={loading}
                                        >
                                            Login
                                        </Button>
                                    </View>
                                )
                            }
                        }
                    </Formik>
                </View>
            </View>
        </UnauthorizedLayout>
    )
}

export default Login;
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    button: {
        marginTop: 24,
    },
    formContainer: {

        paddingHorizontal: 10,
        paddingVertical: 30,
        borderRadius: 4,
        elevation: 5,
        shadowOffset: {
            width: 0,
            height: 2
        }
    }
})
