/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {createSelector} from 'reselect'
import {
   View, StyleSheet, ToastAndroid, Appearance
} from 'react-native';
import { List, Chip, Surface, Avatar, Text, DefaultTheme, DarkTheme} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Micon from 'react-native-vector-icons/MaterialCommunityIcons'
import {BigHead} from 'react-native-bigheads'
import { heart } from '../reducers/forumReducer';
import {timeSince} from './ForumDisplayAll'
import Loading from './Loading'
import LottieView from 'lottie-react-native'

const colorMode = Appearance.getColorScheme()

const tagOptions = [
  { tag: 'ปัญหาเรื่องเพศ', backgroundColor: '#ff5c4d', icon: 'gender-male-female' },
  { tag: 'relationships', backgroundColor: '#63ba90', icon: 'account-heart-outline' },
  { tag: 'ความรัก', backgroundColor: '#ffa64d', icon: 'heart-broken' },
  { tag: 'lgbt', backgroundColor: '#ff4da6', icon: 'gender-transgender' },
  { tag: 'เพื่อน', backgroundColor: '#5050ff', icon: 'account-group' },
  { tag: 'โรคซึมเศร้า', backgroundColor: '#343a40', icon: 'emoticon-sad-outline' },
  { tag: 'ความวิตกกังวล', backgroundColor: '#5e320f', icon: 'lightning-bolt' },
  { tag: 'ไบโพลาร์', backgroundColor: '#f347ff', icon: 'arrow-up-down' },
  { tag: 'การทำงาน', backgroundColor: '#8e2bff', icon: 'cash' },
  { tag: 'สุขภาพจิต', backgroundColor: '#1e45a8', icon: 'brain' },
  { tag: 'การรังแก', backgroundColor: '#5e320f', icon: 'emoticon-angry-outline' },
  { tag: 'ครอบครัว', backgroundColor: '#ffa64d', icon: 'home-heart' },
  { tag: 'อื่นๆ', backgroundColor: '#707571', icon: 'head-question' },
  { tag: 'การเสพติด', backgroundColor: '#eb4034', icon: 'pill' },
];
const chooseTagColor = (passed) => {
  const color = tagOptions.find((t) => t.tag === passed);
  if (color) {
    return color.backgroundColor;
  }
  return 'magenta';
};

const chooseIcon = (passed) => {
  const icon = tagOptions.find(t => t.tag === passed);
  if(icon) {
    return icon.icon;
  }
  return 'star'
}
const selectHeartedByUser = createSelector(
  state => state.forum,
  forum => forum.heartedByUser
)

const SinglePostDisplay = ({user, navigation, isLoading}) => {

  const heartedByUser = useSelector(selectHeartedByUser)
  const post = useSelector(state => state.forum.activePost)
  const [showHeartAnimation, setShowHeartAnimation] = useState(false)
  const dispatch = useDispatch()

  const submitHeart = async () => {
    if (user === null) {
      ToastAndroid.show('คุณต้องเข้าสู่ระบบเพื่อส่งหัวใจ', ToastAndroid.SHORT);
      navigation.navigate('LoginForm');
    } else {
      try {
        dispatch(heart(post._id));
        setShowHeartAnimation(true)
        setTimeout(() => {
          setShowHeartAnimation(false)
        }, 2500);
      } catch (error) {
        console.log(error);
        ToastAndroid.show('กรุณาลองใหม่', ToastAndroid.SHORT);
      }
    }
  };

  if (isLoading) {
    return (
      <Loading />
    )}


  return (
    <View
      style={colorMode === 'light' ? styles.container : styles.containerDark}
    >
      {showHeartAnimation ?
        <LottieView
          source={require('../assets/heartUpAnimation.json')}
          autoPlay
          loop={false}
          style={{zIndex: 99}}/>
      : null}
      {post && (
        <Surface
          style={{...styles.cardStylePost, opacity: showHeartAnimation ? 0.2 : 1}} key={post._id}
        >
          <List.Item
            title={post.title}
            description={post.answer !== null ? `โพสต์ของ ${post.user.avatarName} ${timeSince(post.date)} ที่ผ่านมา` : '...pending'}
            left={() => <BigHead
              {...post.user.avatarProps} size={55}
            />}
            titleStyle={styles.headTitle}
            descriptionStyle={styles.descriptionStyle}
            titleNumberOfLines={10}
            descriptionNumberOfLines={2}
            titleEllipsizeMode='tail'
            style={styles.questionListItem}
          />
          <View
            style={styles.questionContainer}
          >
            <Text
              style={styles.questionText} selectable
            >
              {post.question}
            </Text>
          </View>
          <List.Item
            left={post.answer?.answer ? () => (
              <Avatar.Image
                size={45}
                source={{uri: 'https://storage.googleapis.com/askfern.appspot.com/lg.png'}}
                style={styles.fernAvatar}
              />
            ) : null}
            title={post.answer?.answer}
            titleStyle={styles.answerHeadTitle}
            titleNumberOfLines={100}
            titleEllipsizeMode='tail'
          />
          <View
            style={styles.bottomTags}
          >
            <Chip
              key={post._id} mode='outlined' icon={chooseIcon(post.tags[0])} style={styles.chip} textStyle={{ color: chooseTagColor(post.tags[0]), ...styles.chipText}}
            >{post.tags[0]}
            </Chip>
            <Micon.Button
              name='comment-plus'
              size={28}
              style={styles.commentMiconButton}
              color='lightgray'
              disabled={post.answer === null}
              underlayColor='transparent'
              backgroundColor='transparent'
              activeOpacity={0.5} 
              onPress={() => {
                if(!user){
                  ToastAndroid.show('คุณต้องเข้าสู่ระบบเพื่อส่งหัวใจ', ToastAndroid.SHORT);
                  navigation.navigate('LoginForm')
                }else{
                  navigation.navigate('AddComment', {
                    postId: post._id,
                    postTitle: post.title,
                  });
                }
              }}
            >
              <Text
                style={styles.miconText}
              >ความคิดเห็น
              </Text>
            </Micon.Button>
            {!user?.heartedPosts?.includes(post._id) && !heartedByUser.includes(post._id) ? (
              <Micon.Button
                name="heart-plus-outline"
                color="pink"
                size={28}
                disabled={post.answer === null}
                style={styles.heartIconStyle}
                backgroundColor='transparent'
                underlayColor='transparent'
                activeOpacity={0.5}
                onPress={submitHeart}
              >
                <Text
                  style={styles.likeTextStyle}
                >
                  {post.likes}
                </Text>
              </Micon.Button>
            )
        : (
          <Micon.Button
            name="heart"
            color="pink"
            size={28}
            style={styles.heartIconStyle}
            backgroundColor='transparent'
            underlayColor='transparent'
            activeOpacity={0.5}
            disabled
          >
            <Text
              style={styles.likeTextStyle}
            >
              {post.likes}
            </Text>
          </Micon.Button>
              )}  
          </View>
        </Surface>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    marginBottom: 20,
    backgroundColor: DefaultTheme.colors.background,
  },
  containerDark: {
    flex: 1,
    padding: 5,
    marginBottom: 20,
    backgroundColor: DarkTheme.colors.background,
  },
  cardStylePost: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 4,
    paddingRight: 0,
    marginBottom: 5,
  },
  questionListItem: {
    paddingBottom: 0
  },
  fernAvatar: {
    marginLeft: 6,
    marginTop: 8
  },
  questionContainer: {
    padding: 10,
  },
  questionText: {
    fontSize: 16,
    marginLeft: 62,
    marginRight: 5,
  },
  answerHeadTitle: {
    fontSize: 16,
    fontWeight: 'normal',
    marginLeft: 5,
    marginRight: 10
  },
  bottomTags: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: 'center',
    height: 50,
  },
  heartIconStyle: {
    alignSelf: 'flex-end',
    height: 40,
  },
  likeTextStyle: {
    alignSelf: 'flex-end',
    color: 'gray',
  },
  headTitle: {
    fontWeight: 'bold',
    padding: 0,
  },
  descriptionStyle: {
    fontSize: 10
  },
  chip: {
    marginTop: 14,
    height: 20,
    alignItems: 'center',
    alignSelf: 'flex-start'
  },
  chipText: {
    fontSize: 10,
    marginLeft: 0,
    marginRight: 2,
    opacity: 0.7
  },
  commentMiconButton: {
    backgroundColor: 'transparent',
    borderRadius: 0,
    borderColor: 'transparent',
    alignSelf: 'center',
    marginTop: 3,
    height: 40
  },
  miconText: {
    color: 'gray',
    padding: 0,
    margin: 0,
    fontSize: 11
  },
})

export default SinglePostDisplay;
