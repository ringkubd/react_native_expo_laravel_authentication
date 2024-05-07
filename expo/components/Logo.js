import {Image, Text, View, Dimensions, StyleSheet} from "react-native";
import {useAssets} from "expo-asset";

const Logo = () => {
    const [logo, errors] = useAssets([require("../assets/icon.png"), require("../assets/splash.png")]);
    if (!logo) return <Text>Loading Logo....</Text>
    return (
        <View style={styles.container}>
            <Image
                source={logo[0]}
                resizeMethod="scale"
                style={styles.image}
                resizeMode="contain"
            />
        </View>
    )
}
export default Logo;
const window = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    image: {
        width: window.width * .5,
        height: window.height * 0.2
    }
})
