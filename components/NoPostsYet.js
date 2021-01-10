import React from 'react';
import {
  StyleSheet, View, Text
} from 'react-native';
import EmptyStreet from '../assets/undraw_empty_street_sfxm.svg'

const NoPostsYet = () => {

  return (
    <View
      style={styles.container}
    >
      <View>
        <Text
          style={styles.text}
        >
          ยังไม่มีโพสต์
        </Text>
      </View>
      <EmptyStreet
        width={200} height={200}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100
  },
  text: {
    color: 'gray'
  }
})
export default NoPostsYet;
