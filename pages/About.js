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
         
      <Text style={{fontWeight: "bold"}}>©  El Bueno Services 2023. </Text>
      <Text style={{fontWeight: "bold"}}>@: kerken[at]gmail </Text>
      <Text style={{fontWeight: "bold"}}>L : 08019 Barcelona{'\n'}</Text>

      <Text style={{fontSize: 11}}>Kaynak: DUALAR - Diyanet İşleri Başkanlığı Yayınları: 671. 8. Baskı, 2019 Ankara </Text> 
      </View>



      </View>
          
          </SafeAreaView>
        );
      };


const styles = StyleSheet.create({

  
  about: {
    flex: 1,
    padding: 10,
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
        height: '80%',
      },

  }
);

export default About;