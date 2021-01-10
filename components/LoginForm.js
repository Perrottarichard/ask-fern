import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  View,
  ToastAndroid,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Platform,
} from "react-native";
import { Input } from "react-native-elements";
import { Button, useTheme, Text } from "react-native-paper";
import { AsyncStorage } from "react-native";
import { setUser, redirecting } from "../reducers/activeUserReducer";
import loginService from "../services/loginService";
import forumService from "../services/forumService";
import AskFernLogo2 from "../assets/askfernlogo2.svg";

const LoginForm = (props) => {
  const { navigation } = props;
  const theme = useTheme();
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePass, setHidePass] = useState(true);
  const dispatch = useDispatch();

  const submitLogin = async () => {
    if (!email || !password) {
      ToastAndroid.show("กรุณาใส่ email และ password", ToastAndroid.SHORT);
    } else {
      try {
        dispatch(redirecting(true));
        const user = await loginService.userlogin({
          email: email.toLowerCase(),
          password,
        });
        if (Platform.OS === "android") {
          await AsyncStorage.setItem("loggedForumUser", JSON.stringify(user));
        } else {
          window.localStorage.setItem("loggedForumUser", JSON.stringify(user));
        }
        dispatch(setUser(user));
        forumService.setToken(user.token);
        dispatch(redirecting(false));
      } catch (error) {
        console.log(error.message);
        if (error.message.includes("401")) {
          dispatch(redirecting(false));
          ToastAndroid.show(
            "กรุณาตรวจสอบความถูกต้องของ email และ password",
            ToastAndroid.SHORT
          );
        } else {
          dispatch(redirecting(false));
          ToastAndroid.show("มีข้อผิดพลาด", ToastAndroid.SHORT);
        }
      }
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        ...styles.loginContainer,
        backgroundColor: theme.colors.background,
      }}
    >
      <View style={styles.askFernLogoContainer}>
        {/* <AskFernLogo2
          width={100} height={100}
        /> */}
        <Text style={styles.askFernText}>AskFern</Text>
      </View>
      <View style={styles.inputContainer}>
        <Input
          keyboardType="email-address"
          autoCompleteType="email"
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
          leftIcon={{
            type: "material-community-icons",
            name: "email",
            color: "lightgray",
          }}
          inputStyle={{ color: theme.colors.onBackground }}
        />
        <Input
          autoCompleteType="password"
          onChangeText={(text) => setPassword(text)}
          inputStyle={{ color: theme.colors.onBackground }}
          placeholder="Password"
          secureTextEntry={hidePass}
          leftIcon={{
            type: "material-community-icons",
            name: "lock-outline",
            color: "lightgray",
          }}
          rightIcon={
            hidePass
              ? {
                  type: "font-awesome-5",
                  name: "eye-slash",
                  color: "lightgray",
                  size: 20,
                  onPress: () => setHidePass(!hidePass),
                }
              : {
                  type: "font-awesome-5",
                  name: "eye",
                  color: "lightgray",
                  size: 20,
                  onPress: () => setHidePass(!hidePass),
                }
          }
        />
      </View>
      <View style={styles.buttonContainer}>
        {isLoading ? (
          <ActivityIndicator
            style={styles.activity}
            size="large"
            color="lightpink"
          />
        ) : (
          <Button
            onPress={submitLogin}
            style={styles.loginButton}
            icon="login"
            mode="contained"
          >
            <Text style={styles.loginButtonText}>ลงชื่อเข้าใช้งาน</Text>
          </Button>
        )}
        <Button
          style={styles.goToRegisterButton}
          mode="contained"
          icon="account-plus"
          onPress={() => navigation.navigate("RegisterForm")}
        >
          <Text style={styles.openRegText}>สมัครฟรี</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
  },
  askFernLogoContainer: {
    flex: 3,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
  },
  askFernText: {
    fontFamily: "Arizonia-Regular",
    marginTop: 20,
    padding: 0,
    color: "gray",
    fontSize: 30,
    marginBottom: 5,
  },
  inputContainer: {
    flex: 2,
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 2,
    justifyContent: "center",
  },
  loginButton: {
    alignSelf: "center",
    borderRadius: 20,
    width: 300,
    backgroundColor: "lightpink",
    marginBottom: 20,
    marginTop: 5,
  },
  activity: {
    alignSelf: "center",
    borderRadius: 20,
    width: 300,
    marginBottom: 20,
    marginTop: 5,
  },
  loginButtonText: {
    color: "black",
    alignSelf: "center",
  },
  openRegText: {
    color: "black",
    alignSelf: "center",
  },
  goToRegisterButton: {
    alignSelf: "center",
    borderRadius: 20,
    width: 300,
    backgroundColor: "lightgray",
    marginBottom: 20,
  },
});

export default LoginForm;
