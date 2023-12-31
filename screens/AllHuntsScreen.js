import {
  ScrollView,
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
} from "react-native";
import React, { useState, useEffect } from "react";

import { getData } from "../util/dataBaseReq";
import { useHuntContext } from "../store/HuntContext";

const AllHuntsScreen = ({ navigation }) => {
  const { completedHunts, isHuntCompleted } = useHuntContext();
  const [huntTitles, setHuntTitles] = useState([]);
  const [allData, setAllData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData("hunts").then((data) => {
      const huntTitlesArray = [];
      const allDataArray = [];

      Object.keys(data).forEach((huntKey, index) => {
        const huntData = data[huntKey];
        if (huntData.title) {
          huntTitlesArray.push(huntData.title);
          allDataArray.push(huntData);
        }
      });
      setAllData(allDataArray);
      setHuntTitles(huntTitlesArray);
      setIsLoading(false);
    });
  }, [setAllData]);

  const navigateToSpecificHunt = (index) => {
    const huntData = allData[index];
    navigation.navigate("GameScreen", { huntData });
  };

  const planedHunts = huntTitles.filter(
    (title) => !completedHunts.includes(title)
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView>
          <Text style={styles.title}>Planned hunts</Text>
          {planedHunts.map((title, index) => (
            <View key={index} style={styles.hunts}>
              <Text
                style={
                  isHuntCompleted(index) ? styles.completedText : styles.title
                }
                onPress={() => navigateToSpecificHunt(index)}
              >
                {title}
              </Text>
            </View>
          ))}
          <View>
            <Text style={styles.title}>Completed Hunts</Text>
            {completedHunts.map((title, index) => (
              <View key={index} style={styles.hunts}>
                <Text style={styles.title}>{title}</Text>
              </View>
            ))}
          </View>
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
  hunts: {
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 10,
  },
  completedText: {
    fontSize: 18,
    fontWeight: "bold",
    textDecorationLine: "line-through",
  },
});

export default AllHuntsScreen;
