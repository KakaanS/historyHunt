import StartHunter from "../components/game/StartHunter.js";

const GameScreen = (props) => {
  const onStartGame = () => {
    console.log("starting game MF");
  };
  return <StartHunter onStartGame={onStartGame} />;
};

export default GameScreen;
