import React from 'react'
import {ActivityIndicator, View, StyleSheet} from 'react-native'

const Loading = () => {
  return(
    <View
      style={styles.loadingContainer}
    >
      <ActivityIndicator
        size="large" color="pink"
      />
    </View>
);
  };

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
})
export default Loading;