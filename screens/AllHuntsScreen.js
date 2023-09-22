import {
  ScrollView,
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
} from "react-native";
import React, { useState, useEffect } from "react";
import { getData } from "../util/dataBaseReq";

const AllHuntsScreen = ({ navigation }) => {
  const [huntTitles, setHuntTitles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData("hunts").then((data) => {
      const huntTitlesArray = [];
      Object.keys(data).forEach((huntKey) => {
        const huntData = data[huntKey];
        if (huntData.title) {
          huntTitlesArray.push(huntData.title);
        }
      });
      setHuntTitles(huntTitlesArray);
      setIsLoading(false);
    });
  }, []);

  const navigateToSpecificHunt = (hunt) => {
    navigation.navigate("SpecificHuntScreen", { hunt });
  };

  // Ovan ska vi navigera till den jakt vi klickar på, men den ska också vara en "map" där vi kan se alla jaktens platser.

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView>
          {huntTitles.map((title, index) => (
            <View key={index}>
              <Text
                onPress={() => navigateToSpecificHunt(title)}
                style={styles.title}
              >
                {title}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AllHuntsScreen;
