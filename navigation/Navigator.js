            import React, { useState, useEffect }  from 'react';
            import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
            import { StatusBar, Dimensions } from 'react-native';
            import About from '../pages/about';
           
            import Content from '../pages/Content';
            import Home from '../pages/Home';
            import Tesbih from '../pages/Tesbih';

            const Tab = createMaterialTopTabNavigator();

            const TopTabsNavigator = () => {
              const [fontSize, setFontSize] = useState(12);

              useEffect(() => {
                const screenWidth = Dimensions.get('window').width;
                const fontSizeThreshold = 600; 
            
                if (screenWidth >= fontSizeThreshold) {
                  setFontSize(20); 
                } else {
                  setFontSize(12);
                }
              }, []);

              return (
                <>
                <StatusBar barStyle="dark-content" />
                <Tab.Navigator 

                
              screenOptions={{
                tabBarActiveTintColor: 'gold',
                tabBarLabelStyle: {
                fontSize: fontSize,
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
                  
                  
                </Tab.Navigator>
                </>
              ); 
            };

            export default TopTabsNavigator;