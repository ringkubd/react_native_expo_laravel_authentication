import {View, StyleSheet, ImageBackground, Text} from "react-native";
import {useAssets} from "expo-asset";
import {useTheme} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import Logo from "../Logo";
import {useEffect} from "react";
import {useSelector} from "react-redux";

const UnauthorizedLayout = ({ props, style, children }) => {
    const theme = useTheme();
    const [backgroundImage, error] = useAssets([require("../../assets/noise.png"), require("../../assets/splash.png")]);
    const navigation = useNavigation()
    const { loading, error: loginError, user, token } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user && token){
            navigation.navigate('Home')
        }
    }, [loading, user, token]);

    return (
        <View style={styles.container}>
            {
                !backgroundImage ? <Text>Loading</Text> : (
                    <ImageBackground source={backgroundImage[0]} style={styles.background} >
                        <View style={{flex: 1, backgroundColor: theme.colors.surface, opacity: .8}}>
                            <View style={[{backgroundColor: theme.colors.primaryContainer}, styles.contentContainer]}>
                                <Logo />
                                {children}
                            </View>
                        </View>
                    </ImageBackground>
                )
            }
        </View>
    )
}
export default UnauthorizedLayout;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        margin: 4,
        borderRadius: 4,
        padding: 4,
    }
})
