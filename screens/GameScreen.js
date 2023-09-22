import React, { useState } from "react";
import { View, Text } from "react-native";
import StartHunter from "../components/game/StartHunter.js";

const GameScreen = ({ route, navigation }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const { adressData } = route.params;

  const firstAddress = adressData.places[0].address;

  const onStartGame = () => {
    setGameStarted(true);
  };

  return (
    <View>
      {gameStarted ? (
        <Text>Game started</Text>
      ) : (
        <StartHunter onStartGame={onStartGame} firstLocation={firstAddress} />
      )}
    </View>
  );
};

export default GameScreen;
