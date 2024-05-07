import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "../screen/auth/login";
import HomeScreen from "../screen/HomeScreen";
import Scan from "../screen/scan";

const Stack = createNativeStackNavigator();
const Navigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Group screenOptions={{
                headerStyle: {
                    backgroundColor: 'rgba(138,53,232,1)',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    align: 'center'
                },
            }}>
                <Stack.Screen name={`login`} component={Login} />
            </Stack.Group>
            <Stack.Screen
                name={`Home`}
                component={HomeScreen}
            />
            <Stack.Screen
                name={`Scan`}
                component={Scan}
            />
        </Stack.Navigator>
    )
}
export default Navigator;
