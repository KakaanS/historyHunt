import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { useEffect, useState } from "react";
import ImagePicker from "../camera/ImagePicker";

import Button from "../ui/Button";
import { FAB } from "react-native-paper";
import { useHuntContext } from "../../store/HuntContext";

const GameMap = ({ navigation, quitGame, gameLocations, title }) => {
  const { markHuntAsCompleted } = useHuntContext();
  const [initialRegion, setInitialRegion] = useState(null);
  const [photoMode, setPhotoMode] = useState(false);
  const [doneMarkers, setDoneMarkers] = useState({});

  useEffect(() => {
    if (gameLocations.length > 0) {
      const firstLocation = gameLocations[0].location;
      setInitialRegion({
        latitude: firstLocation.lat,
        longitude: firstLocation.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [gameLocations]);

  const completeHandler = (title) => {
    markHuntAsCompleted(title);
    setInitialRegion(null);
    quitGame();
  };

  const handleMarkerPress = (index) => {
    const updatedDoneMarkers = { ...doneMarkers };
    updatedDoneMarkers[index] = !updatedDoneMarkers[index];
    setDoneMarkers(updatedDoneMarkers);
  };

  const TakePicture = () => {
    const [image, setImage] = useState();
    const imageHandler = (uri) => {
      setImage(uri);
    };

    const photoCompleted = () => {
      setPhotoMode(false);
    };

    return (
      <ScrollView style={styles.scrollView}>
        <ImagePicker imageHandler={imageHandler} />
        <Button style={styles.button} onPress={photoCompleted}>
          Save Image
        </Button>
        <View style={{ height: 30 }}></View>
      </ScrollView>
    );
  };

  const Game = () => {
    const doneCount = Object.values(doneMarkers).filter(Boolean).length;
    const totalCount = gameLocations.length;
    if (totalCount === doneCount) {
      completeHandler(title);
    }

    return (
      <View>
        <MapView
          style={styles.map}
          showsUserLocation
          initialRegion={initialRegion}
        >
          {gameLocations.map((location, index) => {
            const isDone = doneMarkers[index];
            return (
              <Marker
                key={index}
                coordinate={{
                  latitude: location.location.lat,
                  longitude: location.location.lng,
                }}
                title={location.title}
                onPress={() => handleMarkerPress(index)}
                pinColor={isDone ? "green" : "red"}
              />
            );
          })}
        </MapView>

        <FAB
          style={styles.fab}
          icon="camera"
          onPress={() => setPhotoMode(true)}
        />
        <View style={styles.doneCounter}>
          <Text
            style={styles.textConunter}
          >{`${doneCount}/${totalCount} Marked as Done`}</Text>
        </View>
      </View>
    );
  };

  return <View>{photoMode ? <TakePicture /> : <Game />}</View>;
};

export default GameMap;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  button: {
    position: "absolute",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  checkFab: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },
  doneCounter: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  textConunter: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
