/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { Image } from "react-native";
import Onboarding from "react-native-onboarding-swiper";

const OnboardingScreen = ({ setIsFirstLaunch }) => {
  return (
    <Onboarding
      onSkip={() => setIsFirstLaunch(false)}
      onDone={() => setIsFirstLaunch(false)}
      pages={[
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../assets/lg.png")}
              style={{ height: 210, width: 205 }}
            />
          ),
          title: "Welcome to AskFern",
          subtitle: "",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../assets/undraw_Add_files_re_v09g.png")}
              style={{ height: 220, width: 200 }}
            />
          ),
          title: "คำถามที่คุณอยากรู้",
          subtitle:
            "คุณสามารถเข้าสู่ระบบเพื่อถามสิ่งที่คุณอยากรู้จากแอดมินและผู้ใช้งานคนอื่นๆ",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../assets/undraw_public_discussion_btnw.png")}
              style={{ height: 180, width: 200 }}
            />
          ),
          title: "แสดงความคิดเห็นของคุณ",
          subtitle: "คุณสามารถแสดงความคิดเห็นของคุณในโพสต์ของผู้ใช้งานคนอื่นๆ",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../assets/undraw_reading_0re1.png")}
              style={{ height: 180, width: 200 }}
            />
          ),
          title: "บทความ",
          subtitle: "อ่านบทความสุขภาพจิตและการพัฒนาตนเองที่เขียนโดยแอดมิน",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../assets/undraw_Personal_goals_re_iow7.png")}
              style={{ height: 180, width: 200 }}
            />
          ),
          title: "เข้าใจอารมณ์ของคุณเอง",
          subtitle:
            "คุณสามารถบันทึกอารมณ์ตนเองในแต่ละวันเพื่อทำความเข้าใจอารมณ์ของคุณเอง",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../assets/undraw_superhero_kguv.png")}
              style={{ height: 180, width: 200 }}
            />
          ),
          title: "สนุกกับการสะสมแต้ม",
          subtitle:
            "คุณจะได้รับแต้มทุกครั้งที่คุณมีส่วนร่วมในแอพ โดยแต้มสามารถแลกเป็นของตกแต่ง avatar ของคุณ",
        },
      ]}
    />
  );
};

export default OnboardingScreen;
