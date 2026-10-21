import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import MainTabs from './MainTabs';
import FavoritesScreen from '../screens/FavoritesScreen';
import HowToScreen from '../screens/HowToScreen';
import { COLORS } from '../styles/ProjectStyles';

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: COLORS.dark,
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: 'bold',
        },
        drawerActiveTintColor: COLORS.green,
        drawerActiveBackgroundColor: '#E8F3E9',
      }}
    >
      <Drawer.Screen
        name="MainTabs"
        component={MainTabs}
        options={{
          title: 'CAT WORLD · โลกของแมว',
          drawerLabel: 'หน้าหลัก',
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="home-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: 'รายการถูกใจ',
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="heart-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="HowTo"
        component={HowToScreen}
        options={{
          title: 'วิธีใช้งาน',
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="help-circle-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}