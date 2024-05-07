import {Text, StyleSheet, View} from "react-native";
import {TextInput} from "react-native-paper";

const Input = ({icon, containerStyle, ...props}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <TextInput
                {...props}
                returnKeyType="next"
                right={icon ? <TextInput.Icon icon="eye" /> : ''}
            />
            {props.error ? <Text style={styles.error}>{props.errorText}</Text> : null}
        </View>
    )
}
export default Input;
const styles = StyleSheet.create({
    container: {
        marginBottom: 10
    },
    error: {
        marginTop: 5,
        color: 'red'
    }
})
