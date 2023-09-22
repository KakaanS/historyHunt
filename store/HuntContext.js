import { createContext, useContext, useState } from "react";

const HuntContext = createContext();

export const useHuntContext = () => {
  return useContext(HuntContext);
};

export const HuntProvider = ({ children }) => {
  const [completedHunts, setCompletedHunts] = useState([]);

  const markHuntAsCompleted = (index) => {
    // Update function name
    setCompletedHunts((prev) => [...prev, index]);
  };
  const isHuntCompleted = (index) => {
    return completedHunts.includes(index);
  };
  return (
    <HuntContext.Provider value={{ markHuntAsCompleted, isHuntCompleted }}>
      {children}
    </HuntContext.Provider>
  );
};
