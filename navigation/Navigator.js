import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StatusBar } from 'react-native';
import About from '../pages/about';
import Members from '../pages/Members';
import Content from '../pages/Content';
import Home from '../pages/Home';
import Tesbih from '../pages/Tesbih';

const Tab = createMaterialTopTabNavigator();

const TopTabsNavigator = () => {
  return (
    <>
    <StatusBar barStyle="dark-content" />
    <Tab.Navigator style={{ marginTop: 43 }}

    
    screenOptions={{
      tabBarActiveTintColor: 'gold',
      tabBarLabelStyle: { fontSize: 12},
      tabBarItemStyle: { width: "100%"},
      
      tabBarStyle: { backgroundColor: 'rgb(22, 93, 49)' },
      padding: 20 
    }}
    >
      <Tab.Screen name="DUA GÖNDER" component={Home} />
      <Tab.Screen name="DUALAR" component={Content} />
      <Tab.Screen name="TESBIH" component={Tesbih} /> 
      <Tab.Screen name="HAKKINDA" component={About} />
      <Tab.Screen name="REKLAMLARI KAPAT" component={Members} />
    </Tab.Navigator>
    </>
  );
};

export default TopTabsNavigator;