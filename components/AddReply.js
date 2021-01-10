import React, { useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {View, TextInput, StyleSheet, Keyboard, ToastAndroid, ScrollView, ActivityIndicator} from 'react-native'
import { Button, Surface, Text, useTheme} from 'react-native-paper'
import {BigHead} from 'react-native-bigheads'
import Ficon from 'react-native-vector-icons/FontAwesome5'
import { addReply} from '../reducers/forumReducer';

const AddReply = ({navigation, route}) => {
  const { commentId, postId} = route.params;
  const theme = useTheme()
  const post = useSelector(state => state.forum.activePost)
  const comment = post.comments.find(c => c._id === commentId)
  const user = useSelector(state => state.activeUser.user)
  const loading = useSelector(state => state.forum.loading)
  const dispatch = useDispatch()
  const [reply, setReply] = useState('')

  const submitReply = async () => {
    if (user === null) {
      ToastAndroid.show('คุณต้องลงชื่อเพื่อแสดงความคิดเห็น', ToastAndroid.SHORT);
      navigation.navigate('LoginForm');
    } else if (reply === '') {
      ToastAndroid.show('คุณลืมที่จะเขียนความคิดเห็น', ToastAndroid.SHORT);
    } else {
      try {
        dispatch(addReply(reply, comment, postId));
        setTimeout(() => {
          navigation.navigate('SinglePostDisplay', {
            postId,
          });
        }, 2000);
      } catch (error) {
        console.log(error);
        ToastAndroid.show('กรุณาลองใหม่', ToastAndroid.SHORT);
      }
    }
  };

  return(
    <ScrollView
      style={styles.container}
    >
      <View
        style={styles.graphicView}
      >
        <BigHead
          {...user.avatarProps} size={180}
        />
      </View>
      <View>
        <Text
          style={styles.leadIn}
        >
          {`${user.avatarName} says...`}
        </Text>
      </View>
      
      <Surface
        style={styles.surface}
      >
        <Ficon
          name='quote-left' size={25} color='gray'
        />
        <TextInput
          style={{...styles.textAreaComment, color: theme.colors.onSurface}}
          autoFocus
          multiline
          textAlignVertical="center"
          textAlign='center'
          numberOfLines={2}
          onChangeText={(r) => setReply(r)}
          keyboardType="default"
          returnKeyType="done"
          onSubmitEditing={() => { Keyboard.dismiss(); }}
          blurOnSubmit
          value={reply}
        />
        <Ficon
          name='quote-right' size={25} style={styles.rightQuote} color='gray'
        />
      </Surface>
      {!loading ? (
        <Button
          style={styles.commentButton} icon='comment-plus' mode='contained' onPress={submitReply}
        >
          <Text
            style={styles.commentButtonText}
          >
            Submit
          </Text>
        </Button>
      )
        : <ActivityIndicator
            style={styles.spinner} color='pink'
        />}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  graphicView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  leadIn: {
    alignSelf: 'center',
    margin: 10,
  },
  surface: {
    borderRadius: 10,
    padding: 10
  },
  textAreaComment: {
    color: 'gray',
  },
  commentButton: {
    alignSelf: 'center',
    borderRadius: 20,
    width: 300,
    backgroundColor: 'lightgray',
    marginBottom: 40,
    marginTop: 20
  },
  commentButtonText: {
    color: 'black'
  },
  rightQuote: {
    alignSelf: 'flex-end'
  },
  spinner: {
    marginTop: 25,
  }
})
export default AddReply