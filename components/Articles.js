/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { View, FlatList, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {Card, Text} from 'react-native-paper';
import Micon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DateTime} from 'luxon';
import { upView } from '../reducers/forumReducer';

const prettyDate = (dateString) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  let dateToChange = DateTime.fromISO(dateString).toLocaleString(options)
  return dateToChange;
}

//pre-define 3:4 aspect ratio for images  
const screenWidth = (Dimensions.get('screen').width);

const screenHeight = Math.floor(screenWidth * 2/3);


const Item = ({item, onPress}) => (
  <Card
    style={styles.card}
  >
    <TouchableOpacity
      onPress={onPress}
      underlayColor='transparent'
      activeOpacity={0.7}
      >
      <Card.Cover
        style={styles.coverImage}
        source={{uri: item.image}}
    />
    </TouchableOpacity>
    <Card.Actions>
      <Card.Title
        style={styles.cardTitleStyle}
        title={item.title}
        titleNumberOfLines={3}
        titleStyle={styles.cardTitleTextStyle}
        subtitle={prettyDate(item.date)}
        subtitleStyle={{fontSize: 10, paddingLeft: 3}}
        right={() => 
          <Micon.Button
            name='eye'
            backgroundColor='transparent'
            color='gray'
            size={18}
        ><Text
          style={{color: 'gray', fontSize: 12}}
        >{item.views}</Text></Micon.Button>}
    />
    </Card.Actions>
  </Card>
) 

const Articles = ({navigation}) => {
  //get articles
  const DATA = useSelector(state => state.forum.articles)
  const dispatch = useDispatch()

  const renderItem = ({item}) => (
    <Item 
      item={item}
      onPress={() => {
        dispatch(upView(item._id))
        navigation.navigate('SingleArticleDisplay', {
          article: item,
        });
      }}
    />
  );

  return(
    <View
      style={styles.container}
    >
      <FlatList
        data={DATA}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        style={styles.scroll}
      />
    </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  card: {
    flex: 1,
    marginBottom: 8, 
    marginTop: 8
  },
  scroll: {
    flex: 1,
  },
  coverImage: {
    width: screenWidth,
    resizeMode: 'cover',
    height: screenHeight,
    marginBottom: 0
  },
  // cardContentStyle: {
  //   paddingLeft: 0
  // },
  cardTitleStyle: {
    paddingLeft: 0,
    marginTop: 0,
    paddingTop: 0,
  },
  cardTitleTextStyle: {
    fontSize: 16,
    paddingLeft: 3,
    paddingTop: 0,
    marginTop: 0,
    marginBottom: 0,
    paddingBottom: 0
  }
})
  

export default Articles;
