import React from 'react';
import { useWindowDimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import KnowledgeScreen from '../screens/KnowledgeScreen';
import BreedsScreen from '../screens/BreedsScreen';
import TeamScreen from '../screens/TeamScreen';
import Data2Screen from '../screens/Data2Screen';

import { COLORS } from '../styles/ProjectStyles';

const Tab = createBottomTabNavigator();

const icons = {
  Home: 'home-outline',
  Knowledge: 'book-outline',
  Breeds: 'paw-outline',
  Team: 'people-outline',
  RNKnowledge: 'code-slash-outline',
};

export default function MainTabs() {
  const { width } = useWindowDimensions();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: COLORS.primary || '#6554C0',
        tabBarInactiveTintColor: '#82798E',

        tabBarLabelPosition: 'below-icon',
        tabBarHideOnKeyboard: true,

        tabBarLabelStyle: {
          fontSize: width < 400 ? 10 : 12,
          fontWeight: 'bold',
        },

        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E7DFF0',
        },

        tabBarIcon: ({ color, size }) => (
          <Ionicons
            name={icons[route.name] || 'help-circle-outline'}
            color={color}
            size={size}
          />
        ),
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'หน้าหลัก' }}
      />

      <Tab.Screen
        name="Knowledge"
        component={KnowledgeScreen}
        options={{ title: 'มุมทาสแมว' }}
      />

      <Tab.Screen
        name="Breeds"
        component={BreedsScreen}
        options={{ title: 'สายพันธุ์' }}
      />

      <Tab.Screen
        name="Team"
        component={TeamScreen}
        options={{ title: 'ผู้จัดทำ' }}
      />

      <Tab.Screen
        name="RNKnowledge"
        component={Data2Screen}
        options={{ title: 'ความรู้ RN' }}
      />
    </Tab.Navigator>
  );
}