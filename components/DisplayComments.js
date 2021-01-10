import React, {useState, useEffect, useMemo} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import{FlatList, View, StyleSheet, TouchableOpacity, ToastAndroid, Appearance} from 'react-native'
import {BigHead} from 'react-native-bigheads'
import { List, Surface, Menu, Provider, Text, DefaultTheme, DarkTheme} from 'react-native-paper';
import Micon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/Ionicons'
import {createSelector} from 'reselect'
import { setFlaggedComment } from '../reducers/forumReducer';
import {timeSince} from './ForumDisplayAll'
import SinglePostDisplay from './SinglePostDisplay'
import Loading from './Loading'

const colorMode = Appearance.getColorScheme()

const selectUser = createSelector(
  state => state.activeUser,
  activeUser => activeUser.user
)

const Item = ({ item, onPress, visibleMenu, openMenu, closeMenu, replies, flag}) => (
  <View
    style={colorMode === 'light' ? styles.container : styles.containerDark}
  >
    <Surface
      style={styles.cardStyleComment}
    >
      <List.Item
        title={`${item.user.avatarName}`}
        description={`แสดงความคิดเห็น ${timeSince(item.date)} ที่ผ่านมา`}
        right={() => (
          <View
            style={styles.replyButtonView}
          >
            <Micon.Button 
              name='reply' 
              color='lightgray' 
              size={18}
              underlayColor='transparent'
              activeOpacity={0.5} 
              iconStyle={styles.miconIconStyle}
              style={styles.replyButton} 
              backgroundColor='transparent'
              onPress={onPress}
            >
              <Text
                style={styles.replyButtonText}
              >ตอบ
              </Text>
            </Micon.Button>
            <Menu
              visible={visibleMenu === item._id} 
              onDismiss={closeMenu} 
              anchor={(
                <TouchableOpacity 
                  onPress={() => openMenu(item._id)}
                  style={styles.touchableOpacityEllipsis}
                >
                  <Icon
                    name='md-flag-outline' 
                    size={14}
                    color='gray'  
                    style={styles.ellipsis}
                  />
                </TouchableOpacity>
              )}
            >
              <Menu.Item 
                icon='flag-variant' 
                titleStyle={styles.flagMenuContent} 
                onPress={() => flag(item)} 
                title='รายงานความไม่เหมาะสม'
              />
            </Menu>
          </View>
        )}
        left={() => <BigHead
          {...item.user.avatarProps} size={38} style={styles.commentBigHead}
        />}
        titleStyle={styles.commentHeadTitle}
        descriptionStyle={styles.commentDescriptionStyle}
        titleNumberOfLines={1}
        descriptionNumberOfLines={1}
        titleEllipsizeMode='tail'
        disabled
        style={styles.commentListItem}
        onPress={() => console.log('pressed')}
      />
      <View
        style={styles.contentContainerView}
      >
        <Text
          style={styles.commentContent} selectable
        >
          {item.content}
        </Text>
      </View>
    </Surface>
    {replies.map(r => (
      <View
        key={r._id}
      >
        <List.Item
          title={`${r.user.avatarName}`}
          description={`ตอบ ${timeSince(r.date)} ที่ผ่านมา`}
          left={() => <BigHead
            {...r.user.avatarProps} size={28} containerStyles={styles.bigHeadReplyContainer}
          />}
          titleStyle={styles.replyHeadTitle}
          descriptionStyle={styles.replyDescriptionStyle}
          titleNumberOfLines={1}
          descriptionNumberOfLines={1}
          titleEllipsizeMode='tail'
          disabled
          style={styles.replyListItem}
          onPress={() => console.log('pressed')}
        />

        <View
          style={styles.replyWithoutMention}
        >
          <Text
            style={styles.replyWithoutMention}
          >
            {r.reply}
          </Text>
        </View>
      </View>
    ))}
  </View>
);


const DisplayComments = ({navigation}) => {

  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const refresh = useSelector(state => state.forum.refresh)
  const post = useSelector(state => state.forum.activePost);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleMenu, setVisibleMenu] = useState('');

  const memoizedComments = useMemo(() => {
    return post?.comments?.sort((a, b) => new Date(a.date) - new Date(b.date))
  }, [post])

  const DATA = memoizedComments;

  useEffect(() => {
    if(post && isLoading === true){
      setIsLoading(false)
    }
  }, [post, isLoading ])

  const openMenu = (id) => setVisibleMenu(id)
  const closeMenu = () => setVisibleMenu('')

  const flag = (comment) => {
    if (comment.isFlagged) {
      setVisibleMenu('')
      return ToastAndroid.show('ความคิดเห็นนี้มีผู้รายงานให้แอดมินทราบปัญหาเรียบร้อยแล้ว', ToastAndroid.SHORT);
    }
    setVisibleMenu('')
    dispatch(setFlaggedComment(comment));
  };
  
  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        replies={item.replies}
        visibleMenu={visibleMenu}
        openMenu={openMenu}
        closeMenu={closeMenu}
        isLoading={isLoading}
        flag={flag}
        onPress={() => {
          if(!user){
            ToastAndroid.show('คุณต้องเข้าสู่ระบบเพื่อส่งหัวใจ', ToastAndroid.SHORT);
            navigation.navigate('LoginForm')
          }else{
            navigation.navigate('AddReply', {
              postId: post._id,
              commentId: item._id,
              comment: item
            });
          }
        }}
      />
    );
  };
  if(isLoading){
    return(
      <Loading />
    )
  }

  return(
    <Provider>
      <View
        style={colorMode === 'light' ? styles.container : styles.containerDark}
      >
        <FlatList
          ListHeaderComponent={(
            <SinglePostDisplay 
              user={user} 
              navigation={navigation} 
              post={post} 
              isLoading={isLoading}
            />
          )}
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          style={styles.scroll}
          extraData={refresh}
        />
      </View>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingBottom: 20,
    backgroundColor: DefaultTheme.colors.background
  },
  containerDark: {
    flex: 1,
    padding: 5,
    paddingBottom: 20,
    backgroundColor: DarkTheme.colors.background,
  },
  scroll: {
    flex: 1,
  },
  cardStyleComment: {
    flex: 1,
    marginTop: 0,
    paddingTop: 0,
    paddingBottom: 4,
    paddingRight: 0,
    marginBottom: 5,
    borderTopColor: 'gray',
    borderTopWidth: 0.5
  },
  commentBigHead: {
    marginLeft: 10
  },
  commentHeadTitle: {
    alignSelf: 'flex-start',
    fontWeight: 'normal',
    fontSize: 14,
    marginLeft: 2
  },
  commentDescriptionStyle: {
    fontSize: 10,
    alignSelf: 'flex-start',
    marginLeft: 2
  },
  commentListItem: {
    paddingLeft: 13,
  },
  commentContent: {
    fontSize: 14,
    paddingRight: 10,
    marginLeft: 30,
    marginRight: 10,
    paddingBottom: 10,
    alignSelf: 'stretch',
  },
  flagMenuContent: {
    fontSize: 12,
    color: '#cf4f46',
  },
  contentContainerView: {
    padding: 0,
    flex: 1,
  },
  replyButtonView: {
    flexDirection: 'row'
  },
  miconIconStyle: {
    marginRight: 3
  },
  replyButton: {
    backgroundColor: 'transparent',
    borderRadius: 0,
    borderColor: 'transparent',
  },
  replyButtonText: {
    color: 'gray',
    padding: 0,
    margin: 0,
    fontSize: 10
  },
  ellipsis: {
    marginTop: 9,
    marginLeft: 15
  },
  touchableOpacityEllipsis: {
    width: 40
  },
  replyListItem: {
    marginBottom: 9,
    marginTop: 0,
    padding: 0,
  },
  bigHeadReplyContainer: {
    marginTop: 3,
    marginLeft: 35
  },
  replyHeadTitle: {
    position: 'absolute',
    left: 0,
    top: 0,
    fontSize: 10,
  },
  replyDescriptionStyle: {
    position: 'absolute',
    left: 0,
    top: 15,
    fontSize: 8,
    color: 'gray',
    padding: 0,
    margin: 0
  },
  replyWithoutMention: {
    marginLeft: 20,
    marginBottom: 10,
    marginRight: 10,
    paddingTop: 0,
    fontSize: 13,
    color: 'gray'
  },
});

export default DisplayComments;