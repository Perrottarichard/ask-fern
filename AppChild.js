import "react-native-gesture-handler";
import { AsyncStorage, Platform } from "react-native";
import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "react-native-paper";
import { ToastAndroid } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { initStats, setUser } from "./reducers/activeUserReducer";
import {
  initializeForumAnswered,
  getAllArticles,
} from "./reducers/forumReducer";
import forumService from "./services/forumService";
import TabNav from "./components/TabNav";
import userService from "./services/userService";
import OnboardingScreen from "./components/OnboardingScreen";
import { useNetInfo } from "@react-native-community/netinfo";

const AppChild = () => {
  const netInfo = useNetInfo();
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const [netTimer, setNetTimer] = useState(false);

  setTimeout(() => {
    setNetTimer(true);
  }, 3000);
  useEffect(() => {
    if (netInfo.isConnected === false && netTimer) {
      console.log("no internet");
      ToastAndroid.show(
        "บางส่วนอาจขัดข้องหากคุณไม่เชื่อมต่ออินเตอร์เน็ต",
        ToastAndroid.LONG
      );
    }
  }, [netInfo.isConnected, netTimer]);

  let user = useSelector((state) => state.activeUser);
  if (user !== null) {
    user = user.user;
  } else {
    user = null;
  }
  const dispatch = useDispatch();
  const theme = useTheme();
  const getLoggedUser = useCallback(async () => {
    let loggedUserJSON;
    if (Platform.OS === "android") {
      loggedUserJSON = await AsyncStorage.getItem("loggedForumUser");
    } else {
      loggedUserJSON = window.localStorage.getItem("loggedForumUser");
    }
    if (loggedUserJSON) {
      const existingUser = await JSON.parse(loggedUserJSON);
      console.log(existingUser);
      dispatch(setUser(existingUser));
      forumService.setToken(existingUser.token);
      userService.setToken(existingUser.token);
      dispatch(initStats(existingUser._id));
    } else {
      console.log("no user");
    }
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      getLoggedUser();
    } else {
      forumService.setToken(user.token);
      userService.setToken(user.token);
      dispatch(initStats(user._id));
    }
  }, [dispatch, getLoggedUser, user]);

  useEffect(() => {
    if (Platform.OS === "android") {
      AsyncStorage.getItem("alreadyLaunched").then((value) => {
        if (value === null) {
          AsyncStorage.setItem("alreadyLaunched", "true");
          setIsFirstLaunch(true);
        } else {
          setIsFirstLaunch(false);
        }
      });
    } else {
      let seen = window.localStorage.getItem("alreadyLaunched");
      if (!seen) {
        window.localStorage.setItem("alreadyLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    }
  }, []);

  useEffect(() => {
    dispatch(initializeForumAnswered());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllArticles());
  }, [dispatch]);

  return (
    <NavigationContainer theme={theme}>
      {isFirstLaunch ? (
        <OnboardingScreen setIsFirstLaunch={setIsFirstLaunch} />
      ) : (
        <TabNav />
      )}
    </NavigationContainer>
  );
};

export default AppChild;
