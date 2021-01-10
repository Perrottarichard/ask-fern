import { createStore, combineReducers, applyMiddleware } from "redux";
import { Platform } from "react-native";
import { persistStore, persistReducer } from "redux-persist";
import webStorage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { AsyncStorage } from "react-native";
import forumReducer from "./reducers/forumReducer";
import activeUserReducer from "./reducers/activeUserReducer";
import contactReducer from "./reducers/contactReducer";
import userInfoForAdminReducer from "./reducers/userInfoForAdminReducer";

let storage;
if (Platform.OS === "web") {
  storage = webStorage;
} else {
  storage = AsyncStorage;
}

const appReducer = combineReducers({
  forum: forumReducer,
  activeUser: activeUserReducer,
  contact: contactReducer,
  userInfoForAdmin: userInfoForAdminReducer,
});
const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

const persistConfig = {
  key: "root",
  storage: storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));

export const persistor = persistStore(store);
