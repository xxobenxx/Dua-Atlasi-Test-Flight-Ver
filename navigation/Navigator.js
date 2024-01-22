            import React from 'react';
            import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
            import { StatusBar } from 'react-native';
            import About from '../pages/about';
            // import Members from '../pages/Members';
            import Content from '../pages/Content';
            import Home from '../pages/Home';
            import Tesbih from '../pages/Tesbih';

            const Tab = createMaterialTopTabNavigator();

            const TopTabsNavigator = () => {
              return (
                <>
                <StatusBar barStyle="dark-content" />
                <Tab.Navigator 

                
              screenOptions={{

              tabBarActiveTintColor: 'gold',
              tabBarLabelStyle: {
                fontSize: 12.5,
               justifyContent: 'space-evenly',
                marginTop: 43, 
                fontWeight: 'bold',
                },
              tabBarStyle: { 
                backgroundColor: 'rgb(22, 93, 49)',
              },
          
              }}
              >

                  <Tab.Screen name="ATLAS" component={Home} /> 
                  <Tab.Screen name="KILAVUZ" component={Content} />
                  <Tab.Screen name="TESBİH" component={Tesbih} /> 
                  <Tab.Screen name="HAKKINDA" component={About} />
                  {/* <Tab.Screen name="REKLAMLARI KAPAT" component={Members} /> */}
                </Tab.Navigator>
                </>
              ); 
            };

            export default TopTabsNavigator;