import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Linking } from "react-native";
import { Switch } from "react-native-switch";
import { Avatar, Card, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/Fontisto";
import CatFernGraphic from "../assets/undraw_friends_r511.svg";

const About = () => {
  const [isEng, setIsEng] = useState(false);

  const toggleLanguage = () => setIsEng((prev) => !prev);

  //   เกี่ยวกับ Fern

  // ชื่อจริง นิลุบล สุขวณิช ชื่อเล่น เฟิร์น ปัจจุบันทำงานเป็นนักจิตวิทยาการปรึกษาของมหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา ประสบการณ์ทำงานในฐานะนักจิตวิทยาการปรึกษาเริ่มต้น พ.ศ. 2555
  // การศึกษา จบจากมหาวิทยาลัยเชียงใหม่ สาขาจิตวิทยาการปรึกษา ระดับปริญญาโท พ.ศ. 2559 และ สาขาจิตวิทยา(คลินิก) ระดับปริญญาตรี พ.ศ. 2548

  // เกี่ยวกับ App

  // Fern-counseling เป็นแอปพลิเคชัน ที่ให้บริการปรึกษาผ่านการตั้งกระทู้ถามตอบ โดยผู้ใช้งานสามารถเข้ามาอ่านกระทู้ทั้งหมดได้ แต่ในการจะตั้งกระทู้ถามผู้ใช้งานจะต้องทำการ log in ก่อนตั้งกระทู้ เพื่อป้องกันผู้ก่อกวนหรือสร้างความไม่สงบให้แก่ผู้ใช้งานคนอื่นๆ โดยที่ username ในการ log in จะไม่ถูกเปิดเผยต่อสาธารณะ ซึ่งเป็นวัตถุประสงค์ของการสร้างแอปพลิเคชันนี้ขึ้นมาก็คือการทำให้ผู้ใช้งานรู้สึกสบายใจที่จะถาม เพราะไม่มีการเปิดเผยตัวตนให้ผู้ใช้งานคนอื่นๆ ทราบ

  // ติดต่อ Fern

  // Facebook: "คุยกับพี่นิลุ นักจิตวิทยา : Nilu A Counselor"
  // Line: listenbyheart
  // หรือทาง:

  return (
    <ScrollView>
      <View style={styles.switchContainer}>
        <Switch
          onValueChange={toggleLanguage}
          value={isEng}
          activeText="En"
          inActiveText="Th"
          barHeight={20}
          circleSize={20}
          switchLeftPx={5}
          switchRightPx={5}
          switchWidthMultiplier={2.5}
          circleActiveColor="lightgray"
          circleInActiveColor="lightpink"
          backgroundActive="lightpink"
          backgroundInactive="lightgray"
        />
      </View>
      <View style={styles.imageContainer}>
        <CatFernGraphic width={140} height={140} />
      </View>
      {!isEng ? (
        <View style={styles.cardView}>
          <Card containerStyle={styles.cardCard}>
            <Text style={styles.titleText}>เกี่ยวกับ Fern</Text>
            <Text style={styles.bodyText}>
              ชื่อจริง นิลุบล สุขวณิช ชื่อเล่น เฟิร์น
              ปัจจุบันทำงานเป็นนักจิตวิทยาการปรึกษาของมหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา
              ประสบการณ์ทำงานในฐานะนักจิตวิทยาการปรึกษาเริ่มต้น พ.ศ. 2555
              การศึกษา จบจากมหาวิทยาลัยเชียงใหม่ สาขาจิตวิทยาการปรึกษา
              ระดับปริญญาโท พ.ศ. 2559 และ สาขาจิตวิทยา(คลินิก) ระดับปริญญาตรี
              พ.ศ. 2548
            </Text>
          </Card>
          <Card containerStyle={styles.cardCard}>
            <Text style={styles.titleText}>เกี่ยวกับ App</Text>
            <Text style={styles.bodyText}>
              แอปพลิเคชันที่ให้ผู้รับบริการสอบถามสิ่งที่ต้องการทราบเกี่ยวกับสุขภาพจิต
              โดยผู้ใช้งานทุกคนสามารถเข้ามาอ่านกระทู้ได้โดยไม่ต้องเข้าสู่ระบบ
              แต่ในการจะตั้งกระทู้ถามผู้ใช้งานจะต้องทำการเข้าสู่ระบบก่อนตั้งกระทู้
              เพื่อป้องกันผู้ก่อกวนหรือสร้างความไม่สงบให้แก่ผู้ใช้งานคนอื่นๆ
              โดยที่ email ในการเข้าสู่ระบบจะไม่ถูกเปิดเผยต่อสาธารณะ
              ซึ่งเป็นวัตถุประสงค์ของการสร้างแอปพลิเคชันนี้ขึ้นมาก็คือการทำให้ผู้ใช้งานรู้สึกสบายใจที่จะถาม
              เพราะไม่มีการเปิดเผยตัวตนให้ผู้ใช้งานคนอื่นๆ ทราบ
            </Text>
          </Card>
        </View>
      ) : (
        <View style={styles.cardView}>
          <Card containerStyle={styles.cardCard}>
            <Text style={styles.titleText}>About Fern</Text>
            <Text style={styles.bodyText}>
              I'm Nilubon Sukawanich, but you can call me Fern. I work as a
              counselor at Rajamangala University of Technology Lanna. I
              graduated from Chiang Mai University with a Bachelor's degree in
              Clinical Psychology in 2005, then I completed my Master's degree
              in Counseling Psychology from the same institution in 2016. I have
              been working as a counselor since 2012.
            </Text>
          </Card>
          <Card containerStyle={styles.cardCard}>
            <Text style={styles.titleText}>About the App</Text>
            <Text style={styles.bodyText}>
              AskFern provides a platform where people can ask questions and
              receive answers from an experienced counselor. All users can
              access and read the forum, but in order to prevent spam and
              harassment, users must register before posting their own
              questions, as well as commenting on the posts of others. The forum
              is anonymous; no user details will be displayed, and users should
              avoid including identifying information in their posts and
              comments. My intention is to create a safe space for people to
              talk freely about their issues.
            </Text>
          </Card>
        </View>
      )}
      <View style={styles.contactContainer}>
        <View style={styles.bodySpacer} />
        <Avatar.Image
          source={{
            uri:
              "https://storage.googleapis.com/askfern.appspot.com/1608721517709fernhippie.jpg",
          }}
          size={100}
        />

        {isEng ? (
          <Text style={styles.contactText}>Contact Fern</Text>
        ) : (
          <Text style={styles.contactText}>ติดต่อ Fern</Text>
        )}

        <Icon.Button
          onPress={() => Linking.openURL("https://line.me/R/ti/p/@791pxbkv")}
          name="line"
          size={16}
          style={styles.lineButton}
        >
          <Text style={styles.lineButtonText}>Add Official Line</Text>
        </Icon.Button>
        <View style={styles.iconButtonSpacer} />
        <Icon.Button
          onPress={() =>
            Linking.openURL("https://www.facebook.com/NiluAcounselor/")
          }
          name="facebook"
          size={16}
          style={styles.fbButton}
        >
          <Text style={styles.fbButtonText}>Add Facebook</Text>
        </Icon.Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    alignItems: "flex-end",
    marginRight: 20,
    marginTop: 10,
  },
  cardView: {
    textAlign: "left",
    paddingLeft: 10,
    paddingRight: 10,
  },
  cardCard: {
    borderRadius: 20,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  titleText: {
    fontSize: 22,
    fontWeight: "bold",
    margin: 10,
  },
  bodyText: {
    fontSize: 16,
    margin: 10,
    marginLeft: 20,
  },
  contactText: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
  },
  bodySpacer: {
    height: 20,
  },
  iconButtonSpacer: {
    height: 5,
  },
  contactContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  lineButton: {
    backgroundColor: "#00B900",
    alignSelf: "center",
    width: 150,
  },
  lineButtonText: {
    color: "white",
    fontSize: 12,
  },
  fbButton: {
    backgroundColor: "#3b5998",
    alignSelf: "center",
    width: 150,
  },
  fbButtonText: {
    color: "white",
    fontSize: 12,
    paddingLeft: 8,
  },
});

export default About;
