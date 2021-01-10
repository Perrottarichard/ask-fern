import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ficons from 'react-native-vector-icons/FontAwesome5';
import About from './About';
import Home from './Home';
import ForumPostMain from './ForumPostMain';
import ForumNavigate from './ForumNavigate';
import ArticleNavigate from './ArticleNavigate';

const Tab = createMaterialBottomTabNavigator();

function TabNav() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="lightpink"
      inactiveColor="lightgray"
      labeled
      barStyle={styles.barStyle}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'หน้าหลัก',
          tabBarIcon: ({ color }) => (
            <Icon
              name="home" color={color} size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="View Forum"
        component={ForumNavigate}
        options={{
          tabBarLabel: 'หน้ากระทู้',
          tabBarIcon: ({ color }) => (
            <Icon
              name="forum" color={color} size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Ask Fern"
        component={ForumPostMain}
        options={{
          tabBarLabel: 'ตั้งคำถาม',
          tabBarIcon: ({ color }) => (
            <Icon
              name="post-add" color={color} size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Articles"
        component={ArticleNavigate}
        options={{
          tabBarLabel: 'บทความ',
          tabBarIcon: ({ color }) => (
            <Ficons
              name="book-reader" color={color} size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="About"
        component={About}
        options={{
          tabBarLabel: 'ติดต่อเรา',
          tabBarIcon: ({ color }) => (
            <Icon
              name="info-outline" color={color} size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  barStyle: {
    backgroundColor: '#252626'
  }
})

export default TabNav;
