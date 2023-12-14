import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StatusBar } from 'react-native';
import About from '../pages/about';
import Members from '../pages/Members';
import Content from '../pages/Content';
import Home from '../pages/Home';

const Tab = createMaterialTopTabNavigator();

const TopTabsNavigator = () => {
  return (
    <>
    <StatusBar barStyle="dark-content" />
    <Tab.Navigator style={{ marginTop: 32 }}
    tabBarOptions={{
      activeTintColor: 'gold',
      style: { backgroundColor: 'rgb(22, 93, 49)',padding: 20 },
      labelStyle: { color: 'gold' },
      
    }}
    screenOptions={{
      tabBarLabelStyle: { fontSize: 12 },
      tabBarItemStyle: { width: "auto"},
      
      tabBarStyle: { backgroundColor: 'rgb(22, 93, 49)' },
    }}
    >
      <Tab.Screen name="DUA GÖNDER" component={Home} />
      <Tab.Screen name="DUALAR" component={Content} />
      <Tab.Screen name="HAKKINDA" component={About} />
      <Tab.Screen name="REKLAMLARI KAPAT" component={Members} />
    </Tab.Navigator>
    </>
  );
};

export default TopTabsNavigator;