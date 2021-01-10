import React from 'react';
import {
   ScrollView, StyleSheet, Image, View, Dimensions
} from 'react-native';
import {useTheme, Paragraph, Headline, Caption} from 'react-native-paper';
import {DateTime} from 'luxon'
// import Loading from './Loading'

const prettyDate = (dateString) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  let dateToChange = DateTime.fromISO(dateString).setLocale('th-TH').toLocaleString(options)
  return dateToChange;
}

const screenWidth = (Dimensions.get('screen').width);

const screenHeight = Math.floor(screenWidth * 2/3);

const SingleArticleDisplay = ({route}) => {

  const article = route.params.article
  const theme = useTheme()

  return (
    <ScrollView
      style={{...styles.container, backgroundColor: theme.colors.background}}
    >
      {article && (
        <View>
          <View
            style={{width: screenWidth, height: screenHeight}}>
            <Image
              style={styles.stretch}
              source={{uri: article.image}}/>
          </View>
          <Headline>{article.title}</Headline>
          <Caption>{prettyDate(article.date)}</Caption>
          <Paragraph>
            {article.content}
          </Paragraph>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    marginBottom: 20,
  },
  stretch: {
    width: screenWidth,
    height: screenHeight,
    resizeMode: 'cover',
  },
})

export default SingleArticleDisplay;