import React from 'react';
import {Text, View, StyleSheet, SafeAreaView, Image} from 'react-native';
import logo from '../assets/splash2.png';

const About = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>

    
      <View style={styles.about}>

      <View style={styles.logoContainer}>
      <Image 
        source={logo}
        style={styles.logo}
      />
      </View>

      <View style={styles.contact}>
         
      <Text style={{fontWeight: "bold"}}>©  El Bueno Digital  2023. </Text>
      <Text style={{fontWeight: "bold"}}>L : 08019 Barcelona</Text>
      <Text style={{fontWeight: "bold"}}>C:  duaatlasi@gmail </Text>
      

      
      </View>



      </View>
          
          </SafeAreaView>
        );
      };


const styles = StyleSheet.create({

  
  about: {
    flex: 1,
    padding: 10,
    paddingBottom: 10
    },

    contact: {
      alignItems: 'flex-start',
      textAlign: 'left',  
      },

    logoContainer: {
        justifyContent: 'flex-start',
        
      },

      logo: {
        width: 'auto',
        height: '90%',
      },

  }
);

export default About;