import { createContext, useContext, useState } from "react";

const HuntContext = createContext();

export const useHuntContext = () => {
  return useContext(HuntContext);
};

export const HuntProvider = ({ children }) => {
  const [completedHunts, setCompletedHunts] = useState([]);

  const markHuntAsCompleted = (index) => {
    console.log("markHuntAsCompleted", index, "completedHunts", completedHunts);
    setCompletedHunts((prev) => [...prev, index]);
  };
  const isHuntCompleted = (index) => {
    return completedHunts.includes(index);
  };
  return (
    <HuntContext.Provider
      value={{ markHuntAsCompleted, isHuntCompleted, completedHunts }}
    >
      {children}
    </HuntContext.Provider>
  );
};
