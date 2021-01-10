/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import {View} from 'react-native'
import {Modal, Text} from 'react-native-paper'
import LottieView from 'lottie-react-native'


const LevelUpAnimationModal = () => {

  return(  
    <Modal
      visible={true}
      contentContainerStyle={{flex: 1, justifyContent: 'center'}}>
      <View
        style={{flex: 1, paddingTop: 90}}>
        <Text
          style={{alignSelf: 'center', fontSize: 30}}>ยินดีด้วยคุณได้เลื่อนขั้น!
        </Text>
      </View>
      <LottieView
        source={require('../assets/levelUpAnimation.json')}
        autoPlay
        loop={false}
        style={{zIndex: 99}}/>
    </Modal>
  )
}

export default LevelUpAnimationModal;