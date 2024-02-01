import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Share,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Audio } from 'expo-av';
import {dataWithMeaning} from '../data/data_with_meaning';
import shareIcon from '../assets/shareIcon.png';
import logoHorizontal3 from '../assets/logoHorizontal3.png';
import playIcon from '../assets/playIcon.png';
import stopIcon from '../assets/stopIcon.png';





const Home = () => {
  const [searchText, setSearchText] = useState('');
  const [matchingVerses, setMatchingVerses] = useState([]);
  const [sound, setSound] = useState();
  const [showPleaseTypeWarning, setShowPleaseTypeWarning] = useState(false);
  const [noResultFoundWarning, setNoResultFoundWarning] = useState(false);
  const screenWidth = Dimensions.get('window').width;
  const [fontSize, setFontSize] = useState(16);
 
  useEffect(() => {
    const screenWidth = Dimensions.get('window').width;
    const fontSizeThreshold = 600; 

    if (screenWidth >= fontSizeThreshold) {
      setFontSize(20); 
    } else {
      setFontSize(16);
    }
  }, []);
  

  const convertToLatin = (text) => {
    const turkishToLatinMap = {
      'ı': 'i',
      'ğ': 'g',
      'ü': 'u',
      'ş': 's',
      'ö': 'o',
      'ç': 'c',
    };
  
    return text.replace(/[ığüşöç]/g, (match) => turkishToLatinMap[match]);
  };

  const handleChange = (text) => {
    setSearchText(text);
    
    if (text.trim() !== '') {
      setShowPleaseTypeWarning(false);
    }
  
    if (text.trim() === '') {
      setMatchingVerses([]);
      setNoResultFoundWarning(false);
    }
  };

  const handleSearch = () => {
    const keyword = convertToLatin(searchText.trim().toLowerCase());
  
    if (keyword === '') {
      setShowPleaseTypeWarning(true);
      setMatchingVerses([]);
    } else {
      setShowPleaseTypeWarning(false);
  
      const foundVerses = dataWithMeaning.filter(
        (verse) =>
          convertToLatin(verse.meaning.toLowerCase()).includes(keyword) ||
          convertToLatin(verse.meaning).includes(keyword)
      );
  
      console.log('Search keyword:', keyword);
      console.log('Found Verses:', foundVerses);
  
      setMatchingVerses(foundVerses);

    if (foundVerses.length === 0) {
      setNoResultFoundWarning(true);
    } else {
      setNoResultFoundWarning(false);
    }
  }
};


  
  async function playSound(audio) {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync( {uri:audio})
    setSound(sound);


    console.log('Playing Sound');
    sound.setIsLoopingAsync(false)
    await sound.playAsync();


  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound])

  

  const onShare = async (verse) => {
    
    const translationText = verse.translation ? verse.translation.text : 'Sonuç Bulunamadı';
    const audioMessage = verse.surah_audio ? `\nDinle: ${verse.surah_audio}` : '';

    const shareMessage = `۞${verse.surah_name}۞\n\n\n•${verse.verse}•\n\nOkunuşu: ${verse.transcription}\n\nMeali       : ${translationText}${audioMessage}\n\n\n\n DUA ATLASI APP. `;
  
  
    try {
      const result = await Share.share({
        message: shareMessage
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          
        } else {
         
        }
      } else if (result.action === Share.dismissedAction) {
        
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const handleVerseSelection = (selectedVerse) => {

    onShare(selectedVerse);
  
  }
  

  return (
    
    <SafeAreaView style={{ backgroundColor: 'transparent', flex: 1 }}>


      <View style={styles.container}>

      
      <View style={styles.logoContainer}>

      <Image 
        source={logoHorizontal3}
        style={[styles.logo, { height: screenWidth > 600 ? 100 : 44 }]}
      />
      
      </View>
     
      <SearchBar
          
          margin= {2}
          containerStyle={{ backgroundColor: '#9e544f', borderRadius: 20, padding: 5 }}
          placeholder="Niçin Dua Edeceksiniz?"
          onChangeText={handleChange}
          value={searchText}
          lightTheme={true}
          round={true}
          justifyContent="center"
          inputStyle={{
            fontSize: 26,
            color: 'black',
            }}


          searchIcon={
            <TouchableOpacity
              onPress={handleSearch}
              style={styles.searchButton}
            >
              <Text style={styles.searchButtonText}>ARA</Text>
            </TouchableOpacity>
          }
          />
      
    
      
        
           {showPleaseTypeWarning && (
            <View style={styles.warningContainer}>
              <Text style={styles.warningText}>⚠️ Lütfen aradığınız kelimeyi yazın</Text>
            </View>
            
          )}
          {noResultFoundWarning && (
            <View style={styles.warningContainer}>
              <Text style={styles.warningText}>۞ Aradığınız Kelime Bulunamadı </Text>
            </View>
            
          )}
 
          
          
          {matchingVerses.length > 0 && (
            <ScrollView style={styles.resultsContainer}>
            
          <Text style={{fontWeight: "bold", fontSize:fontSize}}>
           Bulunan Dua Sayısı: {matchingVerses.length}{'\n'}
          </Text>
          
            

           {matchingVerses.map((verse, index) => (

            
              
            <View key={verse.id} style={styles.verseContainer}>
              
              <Text style={{ marginVertical: 3, fontSize: fontSize }} > 
              <Text style={{fontWeight: "bold"}}>{verse.verse}</Text>{'\n'} 
              </Text>
              <Text style={{ marginVertical: 3, fontSize: fontSize }} >
              <Text style={{fontWeight: "bold"}}>Okunuşu:</Text> {verse.transcription}{'\n'}
              </Text>
              <Text style={{ marginVertical: 3, fontSize: fontSize }} >
              <Text style={{fontWeight: "bold"}}>Meali        :</Text> {verse.translation.text}
              </Text>
              <Text style={{fontWeight: "bold",fontSize: fontSize, marginTop: 3,}}>({verse.surah_name} {verse.surah_id}/ {verse.verse_number})</Text>

             <TouchableOpacity
             
            onPress={() => handleVerseSelection(verse)}
            style={styles.shareButtonContainer}
              >
                <View style={styles.shareButton}>
                <View style={styles.shareButtonContent}>

                <Image 
                  source={shareIcon}
                  style={{width: 20, height: 20, marginRight:2}} 
                  
                /> 
                <Text style={styles.shareButtonText}>PAYLAŞ</Text>
                </View>
                </View>
              </TouchableOpacity>

              
              {verse.surah_audio && (
              <TouchableOpacity style={styles.playerButton} onPress={() => playSound(verse.surah_audio)}>
              <View >
            <View style={styles.shareButtonContent}>
              <Image
                source={playIcon}
                style={{ width: 20, height: 20, marginRight: 2 }}
              />
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'orange', }}>DİNLE</Text>
              </View>
          </View>
              </TouchableOpacity>
              )}
              

             {sound && (
             <TouchableOpacity style={styles.playerButton} onPress={() => {
             sound.stopAsync();
             setSound(null);
           }}>
              <View >
            <View style={styles.shareButtonContent}>
              <Image
                source={stopIcon}
                style={{ width: 20, height: 20, marginRight: 2 }}
              />
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#102844', }}>DURDUR</Text>
              </View>
          </View>
             </TouchableOpacity>
           )}

              
</View>
           
          ))}
           </ScrollView>
      )}
    </View>
  </SafeAreaView>
  );
};







const styles = StyleSheet.create({

  

  header: {
    fontFamily: 'Helvetica',
    color: 'black',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
  },

  container: {
    margin: 3,
    backgroundColor: 'transparent',
    flex:1,
  },

  logoContainer: {
    justifyContent: 'center',
    margin: 10,
  },

  logo: {
    width: 'auto',
    height: 44,
   resizeMode: 'stretch'
  
 
  },

  searchButton: {
    marginLeft: -5,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#459488',
    justifyContent: 'center',
    padding: 4,
    alignItems: 'center',
  },

  
  searchButtonText: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    justifyContent: 'flex-start',
    color: '#f7b915',
  },

  warningContainer: {
    justifyContent: 'center',
    padding: 3,
    
  },

  warningText: {
    fontSize: 15,
    
  },

  
  shareButtonContainer: {
    alignItems: 'flex-start',
   marginBottom: 5,
  },

  shareButton: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 4,
    marginTop: 5,
    backgroundColor: '#102844',

  },

  shareButtonText: {
    fontSize: 20,
    color: 'orange',
    fontWeight: 'bold',
    alignSelf: 'flex-start' ,
    },
    shareButtonContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },

  verseContainer: {
    borderBottomWidth: 2,
    borderColor: 'gray',
    marginVertical: 2,
    padding: 5
  
  },

  playerButton: {
    borderWidth: 1,
    backgroundColor: '#208796',
    borderRadius: 10,
    padding: 5,
    marginBottom: 5,
    borderColor: 'black',
    alignItems: 'center',
    
  },

 resultsContainer: {
    margin: 5,
    padding: 5,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    backgroundColor: 'lightgrey',
    height: '100%',
    flex: 1,
    


 },

 

  
  
});

export default Home;