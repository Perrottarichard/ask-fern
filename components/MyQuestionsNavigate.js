import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyQuestions from './MyQuestions';
import MyAnswered from './MyAnswered';
import MyPending from './MyPending';
import AvatarPreview from './AvatarPreview';
import DisplayComments from './DisplayComments'
import AddComment from './AddComment'
import AddReply from './AddReply'

const Stack = createStackNavigator();

const MyQuestionsNavigate = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen
      name="MyQuestions" component={MyQuestions}
    />
    <Stack.Screen
      name="MyAnswered" component={MyAnswered}
    />
    <Stack.Screen
      name="MyPending" component={MyPending}
    />
    <Stack.Screen
      name="EditAvatar" component={AvatarPreview}
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

export default MyQuestionsNavigate;