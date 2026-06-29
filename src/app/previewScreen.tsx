import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PreviewScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ photoUri?: string }>();

  const uri = Array.isArray(params.photoUri)
    ? params.photoUri[0]
    : params.photoUri;

  console.log("PREVIEW URI:", uri);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Preview</Text>

      {uri ? (
        <Image source={{ uri }} style={styles.image} resizeMode="contain" />
      ) : (
        <Text style={styles.error}>No image received</Text>
      )}

      <View style={styles.row}>
        <TouchableOpacity style={styles.retake} onPress={() => router.back()}>
          <Text style={styles.btnText}>Retake</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.analyze}
          disabled={!uri}
          onPress={() =>
            router.push({
              pathname: "/ResultScreen",
              params: { photoUri: uri },
            })
          }
        >
          <Text style={styles.btnText}>Analyze</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 15 },

  title: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    marginVertical: 10,
  },

  image: {
    flex: 1,
    width: "100%",
    backgroundColor: "#111",
    borderRadius: 10,
  },

  row: {
    flexDirection: "row",
    gap: 10,
    marginTop: 15,
  },

  retake: {
    flex: 1,
    backgroundColor: "#555",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  analyze: {
    flex: 1,
    backgroundColor: "#2E5BBA",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },

  error: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});
