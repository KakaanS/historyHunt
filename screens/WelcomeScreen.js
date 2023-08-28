import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../store/AuthContext";

const WelcomeScreen = () => {
  const [message, setMessage] = useState(null);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    axios
      .get(
        "https://authentication-app-9214b-default-rtdb.europe-west1.firebasedatabase.app/test.json?auth=" +
          authCtx.token
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
