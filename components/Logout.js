import React from "react";
import { useDispatch } from "react-redux";
import { View, ToastAndroid, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { AsyncStorage } from "react-native";
import { Button } from "react-native-paper";
import { clearUser } from "../reducers/activeUserReducer";

const Logout = () => {
  const dispatch = useDispatch();
  const logout = () => {
    AsyncStorage.clear();
    ToastAndroid.show("ออกจากระบบสำเร็จแล้ว", ToastAndroid.SHORT);
    dispatch(clearUser());
  };
  return (
    <View style={styles.view}>
      <Button mode="text" onPress={logout} style={styles.button}>
        <Text>ออกจากระบบ</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    height: 30,
    width: 100,
    marginBottom: 20,
  },
  button: {
    alignSelf: "center",
    borderRadius: 20,
    width: 300,
    marginBottom: 20,
  },
});
export default Logout;
