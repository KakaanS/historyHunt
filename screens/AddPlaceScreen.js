import PlaceForm from "../components/hunts/PlaceForm";

const AddPlaceScreen = ({ navigation }) => {
  const addPlaceHandler = (place) => {
    navigation.navigate("Add Hunt", { place });
  };
  return <PlaceForm addPlaceHandler={addPlaceHandler} />;
};

export default AddPlaceScreen;
