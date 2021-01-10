import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,  ScrollView, RefreshControl, StyleSheet,
} from 'react-native';
import {Button, Text, useTheme, Chip} from 'react-native-paper'
import {BigHead} from 'react-native-bigheads'
import { initializeForumPending, initializeForumAnswered, getAllArticles } from '../reducers/forumReducer';
import Logout from './Logout'
import Micon from 'react-native-vector-icons/MaterialCommunityIcons'
import {getLevelTitle} from '../helperFunctions'

const wait = (timeout) => new Promise((resolve) => {
  setTimeout(resolve, timeout);
});

const MyQuestions = ({navigation}) => {
  const dispatch = useDispatch();
  const theme = useTheme()
  const [refreshing, setRefreshing] = useState(false);
  const user = useSelector((state) => state.activeUser.user);
  const userPoints = useSelector((state) => state.activeUser?.userPoints)
  const userLevel = useSelector((state) => state.activeUser?.userLevel)
  const {avatarProps} = user
  const {avatarName} = user
  const id = user._id;
  const answered = useSelector((state) => state.forum.answered);
  const pending = useSelector((state) => state.forum.pending);
  const myAnsweredPosts = answered.filter((p) => p.user?.id === id).sort((a, b) => new Date(b.date) - new Date(a.date));
  const myPendingPosts = pending.filter((p) => p.user?.id === id).sort((a, b) => new Date(b.date) - new Date(a.date));

  useEffect(() => {
    if(answered.length === 0){
      console.log('UF Answered MQ')
      dispatch(initializeForumAnswered());
    }
  }, [answered.length, dispatch]);

  useEffect(() => {
    if(pending.length === 0){
      console.log('UF Pending MQ')
      dispatch(initializeForumPending());
    }
  }, [dispatch, pending.length]);

  const onRefresh = useCallback(() => {
    console.log('callback MQ init - pending, answered, articles')
    setRefreshing(true);
    dispatch(initializeForumAnswered());
    dispatch(initializeForumPending());
    dispatch(getAllArticles())
    wait(2000).then(() => setRefreshing(false));
  }, [dispatch]);

  return(
    <ScrollView
      contentContainerStyle={styles.container} refreshControl={<RefreshControl
        refreshing={refreshing} onRefresh={onRefresh}
      />}
    >
      <View
        style={styles.editAvatarContainer}
      >
        <BigHead
          {...avatarProps} size={160}
        />
        <View>
          <Text
            style={styles.avatarIntro}
          >
            สวัสดี, ฉันคือ 
            {' '}
            {avatarName}
            {' '}
            เราเป็นเพื่อนกันแล้วนะ
          </Text>
          <Button
            mode='text' icon='square-edit-outline' style={styles.showEditAvatarButton} onPress={() => navigation.navigate("EditAvatar")}
          >
            <Text >
              แก้ไข
            </Text>
          </Button>
        </View>
      </View>
      <View
        style={styles.statsContainer}>
        <Text
          style={styles.pointsText}>แต้มของฉัน {userPoints}</Text>
        <Chip
          mode='flat'
          style={{backgroundColor: theme.level(userLevel)}}>
          <Micon
            name='trophy-award'
            size={20}
            color={'white'}/>
          <Text
            style={styles.levelText}>{getLevelTitle(userLevel)}</Text></Chip>
      </View>
      <View
        style={styles.answerPendingContainer}
      >
        <Button
          icon='checkbox-marked-circle-outline' mode='contained' style={styles.showAnsweredButton} onPress={() => navigation.navigate("MyAnswered", {id: id})}
          disabled={myAnsweredPosts.length === 0}
        >
          <Text
            style={styles.showAnsweredText}
          >
            มีการตอบแล้ว (
            {myAnsweredPosts.length}
            )
          </Text>
        </Button>
        <Button
          icon='timer-sand' mode='contained' style={styles.showPendingButton} onPress={() => navigation.navigate("MyPending", {myPendingPosts})}
          disabled={myPendingPosts.length === 0}
        >
          <Text
            style={styles.showPendingText}
          >
            กำลังรอคำตอบ (
            {myPendingPosts.length}
            )
          </Text>
        </Button>
      </View>
      <Logout />
    
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  statsContainer: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'center'
  },
  pointsText: {
    fontSize: 16
  },
  levelText: {
    fontSize: 16
  },
  answerPendingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  showAnsweredButton: {
    alignSelf: 'center',
    borderRadius: 20,
    width: 300,
    backgroundColor: 'lightpink',
    marginBottom: 20
  },
  showPendingButton: {
    alignSelf: 'center',
    borderRadius: 20,
    width: 300,
    backgroundColor: 'lightgray'
  },
  avatarIntro: {
    alignSelf: 'center'
  },
  showEditAvatarButton: {
    alignSelf: 'center',
    borderRadius: 20,
    padding: 5,
    width: 300,
  },
  editAvatarContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  showAnsweredText: {
    color: 'black',
  },
  showPendingText: {
    color: 'black',
  },
});

export default MyQuestions;
