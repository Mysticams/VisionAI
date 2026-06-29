import * as FileSystem from "expo-file-system";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

// 👉 YOUR GEMINI FUNCTION (must accept base64)
import { analyzeImage } from "../../lib/gemini";

export default function ResultScreen() {
  const { photoUri } = useLocalSearchParams<{ photoUri: string }>();

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState("");

  useEffect(() => {
    run();
  }, []);

  const run = async () => {
    try {
      setLoading(true);

      if (!photoUri) {
        setResult("No image URI received.");
        return;
      }

      // 🔥 STEP 1: Convert file → base64
      const base64 = await FileSystem.readAsStringAsync(photoUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      console.log("BASE64 LENGTH:", base64.length);

      if (!base64) {
        setResult("Failed to convert image to base64.");
        return;
      }

      // 🔥 STEP 2: Send to Gemini
      const response = await analyzeImage(base64);

      setResult(response);
    } catch (e) {
      console.log(e);
      setResult("Analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Result</Text>

      {photoUri && <Image source={{ uri: photoUri }} style={styles.image} />}

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#2E5BBA" />
          <Text style={styles.text}>Analyzing...</Text>
        </View>
      ) : (
        <Text style={styles.result}>{result}</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111", padding: 20 },
  title: { color: "#fff", fontSize: 20, textAlign: "center" },
  image: { width: "100%", height: 300, borderRadius: 10, marginTop: 10 },
  center: { marginTop: 20, alignItems: "center" },
  text: { color: "#ccc", marginTop: 10 },
  result: { color: "#0f0", marginTop: 20 },
});
