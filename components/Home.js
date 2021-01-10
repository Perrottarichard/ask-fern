import React from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, ActivityIndicator} from 'react-native';
import {useTheme} from 'react-native-paper'
import LoginNavigate from './LoginNavigate';
import MyQuestionsOrMoodNavigate from './MyQuestionsOrMoodNavigate';


const Home = () => {
  const user = useSelector((state) => state.activeUser?.user);
  const redirecting = useSelector(state => state.activeUser?.redirecting)
  const theme = useTheme()

  if ((user && user?.token) && !redirecting) {
    return (
      <View
        style={{...styles.ifLoggedInContainer, backgroundColor: theme.colors.background}}
      >
        <View
          style={{...styles.myQuestionsContainer, backgroundColor: theme.colors.background}}
        >
          <MyQuestionsOrMoodNavigate />
        </View>
      </View>
    );
  }
  if (redirecting) {
    return (
      <View
        style={{...styles.loadingContainer, backgroundColor: theme.colors.background}}
      >
        <ActivityIndicator
          size="large" color="pink"
        />
      </View>
    );
  }
  return (
    <LoginNavigate/>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ifLoggedInContainer: {
    flex: 1,
    alignItems: 'stretch'
  },
  myQuestionsContainer: {
    flex: 1
  }
});
export default Home;
