import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CameraScreen() {
  const cameraRef = useRef<any>(null);
  const [photo, setPhoto] = useState<string | null>(null);

  const [permission, requestPermission] = useCameraPermissions();

  // Permission is loading
  if (!permission) {
    return <View style={styles.container} />;
  }

  // Permission not granted
  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          We need your permission to use the camera
        </Text>

        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  async function takePicture() {
    if (!cameraRef.current) return;

    try {
      const result = await cameraRef.current.takePictureAsync({
        quality: 0.7,
      });

      setPhoto(result.uri);

      console.log("Photo URI:", result.uri);

      Alert.alert("Picture Captured!", result.uri);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to capture photo.");
    }
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing="back" />

      <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
        <Text style={styles.captureButtonText}>Capture</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  camera: {
    flex: 1,
  },

  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },

  permissionText: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 20,
  },

  permissionButton: {
    backgroundColor: "#2E5BBA",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
  },

  permissionButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  captureButton: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "#2E5BBA",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
  },

  captureButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
