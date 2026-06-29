import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CameraScreen() {
  const cameraRef = useRef<CameraView>(null);
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  if (!permission) {
    return <View style={{ flex: 1, backgroundColor: "#000" }} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "#fff", marginBottom: 10 }}>
          Camera permission required
        </Text>

        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={{ color: "#fff" }}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const photo = await cameraRef.current?.takePictureAsync({
        quality: 1,
      });

      if (!photo?.uri) {
        Alert.alert("Error", "No image captured");
        return;
      }

      router.push({
        pathname: "/previewScreen",
        params: { photoUri: photo.uri },
      });
    } catch (e) {
      console.log(e);
      Alert.alert("Capture failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing="back"
        onCameraReady={() => setReady(true)}
      />

      {!ready && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#2E5BBA" />
          <Text style={{ color: "#fff", marginTop: 10 }}>
            Starting camera...
          </Text>
        </View>
      )}

      <TouchableOpacity style={styles.captureBtn} onPress={takePicture}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          {loading ? "Capturing..." : "Capture"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  camera: { flex: 1 },

  captureBtn: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "#2E5BBA",
    padding: 15,
    borderRadius: 30,
    paddingHorizontal: 40,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },

  button: {
    backgroundColor: "#2E5BBA",
    padding: 12,
    borderRadius: 10,
  },

  loadingOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
});
