import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Share,
  TouchableOpacity,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Audio } from 'expo-av';
import {dataWithMeaning} from '../data/data_with_meaning';




const Home = () => {
  const [searchText, setSearchText] = useState('');
  const [matchingVerses, setMatchingVerses] = useState([]);
  const [sound, setSound] = useState();
  const [showPleaseTypeWarning, setShowPleaseTypeWarning] = useState(false);

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
    
    const translationText = verse.translation ? verse.translation.text : 'Translation not available';
    const audioMessage = verse.surah_audio ? `\nDinle: ${verse.surah_audio}` : '';

    const shareMessage = `۞${verse.surah_name}۞\n\n\n•${verse.verse}•\n\nOkunuşu: ${verse.transcription}\n\nMeali       : ${translationText}${audioMessage}`;
  
  
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
    <SafeAreaView style={{backgroundColor: 'transparent'}}>

      <View style={styles.container}>

      

      <Text style={styles.header}>DUA ATLASI</Text>
     
      <SearchBar
          
          margin= {2}
          containerStyle={{ backgroundColor: '#9e544f', borderRadius: 10 }}
          placeholder="Niçin Dua Edeceksiniz?"
          onChangeText={handleChange}
          value={searchText}
          lightTheme={true}
          round={true}
          justifyContent="center"
          inputStyle={{
            fontSize: 27,
            color: 'black',
            paddingVertical: 8
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
      
          
        <ScrollView style={styles.resultsContainer}
          >
            {showPleaseTypeWarning && (
    <View style={styles.warningContainer}>
      <Text style={styles.warningText}>⚠️ Lütfen bir anahtar kelime yazın</Text>
    </View>
  )}
            
          <View style={{height:'auto'}}>

          {matchingVerses.length > 0 && 
          <>
       

          <Text style={{fontWeight: "bold", fontSize:18}}>
           Bulunan Dua Sayısı: {matchingVerses.length}
          </Text>
          </>
           } 

           {matchingVerses.map((verse, index) => (

            
              
            <View style={styles.verseContainer}>
              
              <Text style={styles.verseText} > 
              <Text style={{fontWeight: "bold"}}>{verse.verse}</Text> 
              </Text>
              <Text style={styles.verseText}>
              <Text style={{fontWeight: "bold"}}>Okunuşu:</Text> {verse.transcription}
              </Text>
              <Text style={styles.verseText}>
              <Text style={{fontWeight: "bold"}}>Meali       :</Text> {verse.translation.text}
              </Text>
              <Text style={styles.verseText}>({verse.surah_name} {verse.surah_id}/ {verse.verse_number})</Text>

             <TouchableOpacity
             
            onPress={() => handleVerseSelection(verse)}
            style={styles.shareButtonContainer}
              >
                <View style={styles.shareButton}>
                <Text style={styles.shareButtonText}>GÖNDER</Text>
                </View>
              </TouchableOpacity>

              
              {verse.surah_audio && (
              <TouchableOpacity style={styles.playerButton} onPress={() => playSound(verse.surah_audio)}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'orange', }}>DİNLE</Text>
              </TouchableOpacity>
              )}
              

             {sound && (
             <TouchableOpacity style={styles.playerButton} onPress={() => {
             sound.stopAsync();
             setSound(null);
           }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'red', }}>DURDUR</Text>
             </TouchableOpacity>
           )}

              
</View>
           
          ))}
           </View>
        </ScrollView>
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
    margin: 5,
    backgroundColor: 'transparent'
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

  

  shareButtonContainer: {
    alignItems: 'flex-start',
    margin: 3,
  },

  shareButton: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 5,
    marginTop: 5,
    backgroundColor: '#102844',

  },

  shareButtonText: {
    fontSize: 20,
    color: 'orange',
    fontWeight: 'bold',
    alignSelf: 'flex-start' ,
    },

  verseContainer: {
    borderBottomWidth: 2,
    borderColor: 'gray',
    marginVertical: 2,
  
  },

  verseText: {
    fontSize: 16,
    marginVertical: 3,

  },

  playerButton: {
    borderWidth: 1,
    backgroundColor: '#208796',
    borderRadius: 10,
    padding: 5,
    margin: 5,
    borderColor: 'black',
    alignItems: 'center',
    
  },

 resultsContainer: {
    margin: 5,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    backgroundColor: 'lightgrey',
    
 },

 

  
  
});

export default Home;