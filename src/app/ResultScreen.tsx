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

import { analyzeImage } from "../../lib/gemini";

export default function ResultScreen() {
  const rawUri = useLocalSearchParams().photoUri;
  const photoUri = Array.isArray(rawUri) ? rawUri[0] : rawUri;

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState("");

  useEffect(() => {
    run();
  }, []);

  const run = async () => {
    try {
      setLoading(true);

      if (!photoUri || typeof photoUri !== "string") {
        setResult("Invalid image");
        return;
      }

      const base64 = await FileSystem.readAsStringAsync(photoUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const response = await analyzeImage(base64);

      setResult(response);
    } catch (e) {
      console.log(e);
      setResult("Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>AI Result</Text>

      {photoUri && <Image source={{ uri: photoUri }} style={styles.image} />}

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#2E5BBA" />
          <Text style={{ color: "#ccc" }}>Analyzing...</Text>
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
  image: { width: "100%", height: 300, marginTop: 10 },
  center: { marginTop: 20, alignItems: "center" },
  result: { color: "#0f0", marginTop: 20 },
});
