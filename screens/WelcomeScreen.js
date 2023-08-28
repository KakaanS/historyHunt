import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";

const WelcomeScreen = () => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    axios
      .get(
        "https://authentication-app-614a8-default-rtdb.europe-west1.firebasedatabase.app/test.json"
      )
      .then((resp) => {
        setMessage(resp.data);
      });
  }, []);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>Message from server: {message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default WelcomeScreen;
