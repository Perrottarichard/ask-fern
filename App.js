import React from "react";
import { Provider } from "react-redux";
import {
  Provider as PaperProvider,
  DefaultTheme,
  DarkTheme,
} from "react-native-paper";
import { PersistGate } from "redux-persist/integration/react";
import { ActivityIndicator, StyleSheet, View, Appearance } from "react-native";
import { store, persistor } from "./store";

import AppChild from "./AppChild";
const colorMode = Appearance.getColorScheme();

const levelColor = (level) => {
  if (level === 1) {
    return "#f76077";
  } else if (level === 2) {
    return "#7da3b2";
  } else if (level === 3) {
    return "#77dd77";
  } else if (level === 4) {
    return "#ff6961";
  } else {
    return "#917394";
  }
};

let theme;
if (colorMode === "light") {
  theme = { ...DefaultTheme, level: levelColor };
} else {
  theme = { ...DarkTheme, level: levelColor };
}
const App = () => (
  <Provider store={store}>
    <PersistGate
      loading={
        <View
          style={{
            ...styles.loadingContainer,
            backgroundColor: theme.colors.background,
          }}
        >
          <ActivityIndicator size="large" color="pink" />
        </View>
      }
      persistor={persistor}
    >
      <PaperProvider theme={theme}>
        <AppChild />
      </PaperProvider>
    </PersistGate>
  </Provider>
);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default App;
