import {useState} from "react";
import {Camera, CameraType} from "expo-camera";
import {View, StyleSheet, TouchableOpacity, Dimensions} from "react-native";
import {Button, Text} from "react-native-paper";

const Scan = () => {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    if (!permission) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }
    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }
    const handleBarCodeScanned = ({ type, data }) => {
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    return (
        <View style={styles.container}>
            <Camera
                style={styles.camera}
                type={type}
                onBarCodeScanned={handleBarCodeScanned}
                autoFocus={true}
                onFacesDetected={(fd) => console.log(fd)}
                faceDetectorSettings={{
                    tracking: true,
                }}
            >
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                        <Text style={styles.text}>Flip Camera</Text>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );


}

export default Scan;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
        maxHeight: Dimensions.get("window").height / 2,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});