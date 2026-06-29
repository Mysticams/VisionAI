import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PreviewScreen() {
  const router = useRouter();
  const { photoUri } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Preview</Text>

      <Image source={{ uri: photoUri as string }} style={styles.image} />

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#555" }]}
          onPress={() => router.back()}
        >
          <Text style={styles.text}>Retake</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#2E5BBA" }]}
          onPress={() =>
            router.push({
              pathname: "/ResultScreen",
              params: { photoUri },
            })
          }
        >
          <Text style={styles.text}>Analyze</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20 },
  title: { color: "#fff", fontSize: 20, textAlign: "center", marginBottom: 10 },

  image: { width: "100%", height: 400, borderRadius: 10 },

  row: { flexDirection: "row", marginTop: 20 },

  button: {
    flex: 1,
    margin: 5,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  text: { color: "#fff", fontWeight: "bold" },
});
