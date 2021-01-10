import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Articles from './Articles';
import SingleArticleDisplay from './SingleArticleDisplay'

const Stack = createStackNavigator();

const ArticleNavigate = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen
      name="Articles" component={Articles}
    />
    <Stack.Screen
      name="SingleArticleDisplay" component={SingleArticleDisplay}
    />
  </Stack.Navigator>
);
export default ArticleNavigate;
