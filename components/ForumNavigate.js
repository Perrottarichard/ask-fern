import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ForumDisplayAll from './ForumDisplayAll';
import AddComment from './AddComment';
import AddReply from './AddReply';
import DisplayComments from './DisplayComments';

const Stack = createStackNavigator();

const ForumNavigate = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen
      name="ForumDisplayAll" component={ForumDisplayAll}
    />
    <Stack.Screen
      name="SinglePostDisplay" component={DisplayComments}
    />
    <Stack.Screen
      name="AddComment" component={AddComment}
    />
    <Stack.Screen
      name="AddReply" component={AddReply}
    />
  </Stack.Navigator>
);
export default ForumNavigate;
