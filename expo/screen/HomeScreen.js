import AuthorizedLayout from "../components/layouts/authorizedLayout";
import {Text} from "react-native";
import {Button} from "react-native-paper";
import {useDispatch, useSelector} from "react-redux";
import {useLogoutMutation} from "../store/services/auth/logoutAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {logoutReducer} from "../store/services/auth/authSlice";
import {useNavigation} from "@react-navigation/native";
import pusher from "../soketi";

const HomeScreen = () => {
    const loggedIn = useSelector(state => state.user);
    const [logout, {isLoading, isError, data, isSuccess}] = useLogoutMutation();
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const logOutButton = async () => {
        dispatch(logoutReducer());
        logout()
        await AsyncStorage.clear();
    }

    pusher();

    return (
        <AuthorizedLayout>
            <Text>Home</Text>
            <Button onPress={logOutButton}>Logout</Button>
            <Button onPress={() => navigation.navigate('Scan')}>Scan</Button>
        </AuthorizedLayout>
    )
};

export default HomeScreen;