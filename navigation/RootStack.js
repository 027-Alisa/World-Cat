import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppDrawer from './AppDrawer';
import CatDetailScreen from '../screens/CatDetailScreen';
import ArticleDetailScreen from '../screens/ArticleDetailScreen';
import { COLORS } from '../styles/ProjectStyles';

const Stack = createNativeStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: COLORS.dark,
        contentStyle: {
          backgroundColor: COLORS.background,
        },
      }}
    >
      <Stack.Screen
        name="AppDrawer"
        component={AppDrawer}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="CatDetail"
        component={CatDetailScreen}
        options={{
          title: 'รายละเอียดสายพันธุ์',
          headerBackTitle: 'กลับ',
        }}
      />

      <Stack.Screen
        name="ArticleDetail"
        component={ArticleDetailScreen}
        options={{
          title: 'รายละเอียดความรู้',
          headerBackTitle: 'กลับ',
        }}
      />
    </Stack.Navigator>
  );
}