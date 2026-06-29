import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CameraScreen() {
  const cameraRef = useRef<any>(null);
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [loading, setLoading] = useState(false);

  if (!permission) return <View style={styles.container} />;

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
    if (!cameraRef.current || loading) return;

    try {
      setLoading(true);

      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
        base64: false,
        skipProcessing: false,
      });

      console.log("CAPTURE RESULT:", photo);

      const uri = photo?.uri ?? photo?.assets?.[0]?.uri;

      if (!uri) {
        Alert.alert("Error", "No image captured");
        return;
      }

      router.push({
        pathname: "/previewScreen", // ✅ FIXED HERE
        params: { photoUri: uri },
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
      <CameraView ref={cameraRef} style={styles.camera} facing="back" />

      <TouchableOpacity
        style={styles.captureBtn}
        onPress={takePicture}
        disabled={loading}
      >
        <Text style={{ color: "#fff" }}>
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
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    backgroundColor: "#2E5BBA",
    padding: 12,
    borderRadius: 10,
  },
});
