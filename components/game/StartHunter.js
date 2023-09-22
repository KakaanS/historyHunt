import { View, Text, StyleSheet } from "react-native";

import Button from "../ui/Button";
import { Colors } from "../../constants/styles";

const StartHunter = ({ onStartGame }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Start the game by clicking the button</Text>
      <Button onPress={onStartGame}>Start</Button>
    </View>
  );
};

export default StartHunter;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary800,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
