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

import { analyzeImage, imageToBase64 } from "../../lib/gemini";

export default function ResultScreen() {
  const { photoUri } = useLocalSearchParams<{ photoUri: string }>();

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState("");

  useEffect(() => {
    runAnalysis();
  }, []);

  async function runAnalysis() {
    try {
      setLoading(true);

      if (!photoUri) {
        setResult("No image received.");
        return;
      }

      // 🔥 FIX: convert here (NOT in previous screen)
      const base64 = await imageToBase64(photoUri);

      const gemini = await analyzeImage(base64);
      setResult(gemini);
    } catch (err) {
      console.log(err);
      setResult("Analysis failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Result</Text>

      {!!photoUri && <Image source={{ uri: photoUri }} style={styles.image} />}

      {loading ? (
        <View style={styles.loading}>
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
  container: {
    flex: 1,
    backgroundColor: "#111",
    padding: 20,
  },

  title: {
    color: "#fff",
    fontSize: 22,
    textAlign: "center",
  },

  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginTop: 10,
  },

  loading: {
    marginTop: 20,
    alignItems: "center",
  },

  text: {
    color: "#ccc",
    marginTop: 10,
  },

  result: {
    color: "#0f0",
    marginTop: 20,
    fontSize: 16,
  },
});
