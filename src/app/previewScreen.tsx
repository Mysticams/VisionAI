import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PreviewScreen() {
  const router = useRouter();
  const { photoUri } = useLocalSearchParams<{ photoUri?: string }>();

  const uri = Array.isArray(photoUri) ? photoUri[0] : photoUri;

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
        <TouchableOpacity style={styles.btn} onPress={() => router.back()}>
          <Text style={styles.btnText}>Retake</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "#2E5BBA" }]}
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
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 16,
  },

  title: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    marginBottom: 10,
  },

  image: {
    width: "100%",
    height: 400,
    backgroundColor: "#111",
    borderRadius: 10,
  },

  row: {
    flexDirection: "row",
    gap: 10,
    marginTop: 15,
  },

  btn: {
    flex: 1,
    backgroundColor: "#555",
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
