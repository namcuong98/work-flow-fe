import axios from "axios";
import { createContext, useContext, useState } from "react";

export const setLocalstorage = (token, id) => {
  // console.log("id", id);
  localStorage.setItem("token", token);
  localStorage.setItem("id", id);
};

export const getTokenLocalstorage = () => {
  return localStorage.getItem("token");
};

// New - send cookie to all req from backend
axios.defaults.withCredentials = true;

export const loggedInInstance = axios.create({
  baseURL: "http://localhost:8081/",
  headers: {
    Authorization: `Bearer ${getTokenLocalstorage()}`,
  },
});

const StateContext = createContext();
export const useStateContext = () => useContext(StateContext);

export const StateProvider = ({ children }) => {
  const [actionLoading, setActionLoading] = useState();
  const [messageToast, setMessageToast] = useState("");
  const [activatedToastSubTask, setActivatedToastSubTask] = useState(false);

  const updateState = (newValue) => {
    setActionLoading(newValue);
  };

  const updateMessageToast = (value) => {
    setMessageToast(value);
  };

  const updateToastCreateSubTask = (value) => {
    setActivatedToastSubTask(value);
  };

  return (
    <StateContext.Provider
      value={{
        actionLoading,
        updateState,
        messageToast,
        updateMessageToast,
        activatedToastSubTask,
        updateToastCreateSubTask,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
