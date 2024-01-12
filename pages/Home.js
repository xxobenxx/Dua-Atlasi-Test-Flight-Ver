import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Share,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Audio } from 'expo-av';
import {dataWithMeaning} from '../data/data_with_meaning';




const Home = () => {
  const [searchText, setSearchText] = useState('');
  const [matchingVerses, setMatchingVerses] = useState([]);
  const [sound, setSound] = useState();

  const handleChange = (text) => setSearchText(text);

  const handleSearch = () => {
    const keyword = searchText.trim().toLowerCase();
  
    const foundVerses = dataWithMeaning.filter(
      (verse) =>
        verse.meaning.toLowerCase().includes(keyword) 
    );


  console.log('Search keyword:', keyword);
  console.log('Found Verses:', foundVerses);
  

    setMatchingVerses(foundVerses);
    
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
  
    const shareMessage = `      ${verse.verse}\nMeali: ${translationText}\nDinle: ${verse.surah_audio}`;
  
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
          placeholder="Aradığız Kelime"
          onChangeText={handleChange}
          value={searchText}
          lightTheme={true}
          round={true}
          cancelIcon={true}
        justifyContent="center"
        />
      
          

        <TouchableOpacity
          onPress={handleSearch}
          style={styles.buttonContainer}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>DUA BUL</Text>
          </View>
        </TouchableOpacity>

        <ScrollView style={styles.resultsContainer}>
        {matchingVerses.length > 0 && 
    <>
      <Text style={{fontWeight: 'bold', color: 'orange' }}>
        PAYLAŞMAK İÇİN METNİN ÜZERİNE DOKUNUN
      </Text>  

      <Text style={{fontWeight: "bold"}}>
        Bulunan Dua Sayısı: {matchingVerses.length}
      </Text>
    </>
  } 
       
          {matchingVerses.map((verse, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleVerseSelection(verse)}
              style={styles.verseContainer}
              
            >
              
             
              <Text style={styles.verseText}> 
              <Text style={{fontWeight: "bold"}}>Dua         :</Text> {verse.verse}
              </Text>
              <Text style={styles.verseText}>
              <Text style={{fontWeight: "bold"}}>Okunuşu:</Text> {verse.transcription}
              </Text>
              <Text style={styles.verseText}>
              <Text style={{fontWeight: "bold"}}>Meali       :</Text> {verse.translation.text}
              </Text>
              <Text style={styles.verseText}>({verse.surah_name} {verse.surah_id}{verse.verse_number})</Text>
              
              {verse.surah_audio && (
              <TouchableOpacity style={styles.playerButton} onPress={() => playSound(verse.surah_audio)}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'orange', }}>DİNLE</Text>
              </TouchableOpacity>
              )}

             {sound && (
             <TouchableOpacity style={styles.playerButton} onPress={() => {
             sound.stopAsync();
             setSound(null);
           }}>
    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'brown', }}>DURDUR</Text>
  </TouchableOpacity>
)}

              

            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover', 
    width: '100%', 
    height: '100%',
    alignItems: 'center'
  }, 

  header: {
    fontFamily: 'Helvetica',
    color: 'black',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },

  container: {
    margin: 10,
    backgroundColor: 'transparent'
  },

  buttonContainer: {
    alignItems: 'center',
    margin: 10,
  },

  button: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 25,
    padding: 15,
    marginTop: 10,
    backgroundColor: '#208796',
  },

  buttonText: {
    fontSize: 25,
    textAlign: 'center',
    color: 'gold',
  },

  verseContainer: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginVertical: 5,
    
  },

  verseText: {
    fontSize: 16,
    marginVertical: 5,
  },

  playerButton: {
    borderWidth: 1,
    backgroundColor: '#208796',
    borderRadius: 25,
    padding: 5,
    margin: 10,
    borderColor: 'black',
    alignItems: 'center',
    
  }
  
  
});

export default Home;