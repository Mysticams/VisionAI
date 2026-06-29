import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

export default function ResultScreen() {
  const { photoUri } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Result</Text>

      <Image source={{ uri: photoUri as string }} style={styles.image} />

      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#2E5BBA" />
          <Text style={styles.text}>Analyzing...</Text>
        </View>
      ) : (
        <Text style={styles.result}>Analysis Complete ✔</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111", padding: 20 },
  title: { color: "#fff", fontSize: 22, textAlign: "center", marginBottom: 10 },

  image: { width: "100%", height: 300, borderRadius: 10 },

  loading: { marginTop: 20, alignItems: "center" },

  text: { color: "#aaa", marginTop: 10 },

  result: {
    color: "#0f0",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});
