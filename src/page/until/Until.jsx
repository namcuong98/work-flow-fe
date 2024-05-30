import axios from "axios";
import { createContext, useContext, useState } from "react";

export const setLocalstorage = (token, id) => {
  localStorage.setItem("token", token);
  localStorage.setItem("id", id);
};

export const getTokenLocalstorage = () => {
  return localStorage.getItem("token");
};

// New - send cookie to all req from backend
axios.defaults.withCredentials = true;

export const loggedInInstance = axios.create({
  baseURL: "http://work-flow-be-1.onrender.com",
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
  const [loggedIn, setLoggedIn] = useState(false);
  const [notificationDeadline, setNotificationDeadline] = useState("");
  const [notificationOverdue, setNotificationOverdue] = useState("");

  const updateState = (newValue) => {
    setActionLoading(newValue);
  };

  const updateMessageToast = (value) => {
    setMessageToast(value);
  };

  const updateToastCreateSubTask = (value) => {
    setActivatedToastSubTask(value);
  };

  const updateLoggedIn = (value) => {
    setLoggedIn(value);
  };

  const updateNotificationDeadline = (value) => {
    setNotificationDeadline(value);
  };

  const updateNotificationOverdue = (value) => {
    setNotificationOverdue(value);
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
        loggedIn,
        updateLoggedIn,
        notificationDeadline,
        updateNotificationDeadline,
        notificationOverdue,
        updateNotificationOverdue,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
