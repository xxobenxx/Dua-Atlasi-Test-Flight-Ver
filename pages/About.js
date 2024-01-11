import React from 'react';
import {Text, View, StyleSheet, SafeAreaView,ImageBackground,} from 'react-native';


const About = () => {
  return (
    <SafeAreaView>

    
      <View style={styles.aboutText}>
<Text>Kaynak: DUALAR - Diyanet İşleri Başkanlığı Yayınları: 671. 8. Baskı, 2019 Ankara  </Text>      

<View style={styles.contact}></View>
<Text>© El Turco Services 2023. </Text>
<Text>T : +34 600 793 638 </Text>
<Text>@: kerken[at]gmail </Text>
<Text>L : 08019 Barcelona</Text>


</View>
    
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({

  
  aboutText: {
    alignItems: 'left',
    padding: 10,
    flexDirection: 'column',
    textAlign: 'left',
    
    },

    contact: {
      alignItems: 'flex-end',
      padding: 10,
      // flexDirection: 'column',
      textAlign: 'left',
      
      },



  }
);

export default About;