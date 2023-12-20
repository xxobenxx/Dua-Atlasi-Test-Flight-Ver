import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Button
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import Clipboard from '@react-native-community/clipboard';
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

  const handleVerseSelection = (selectedVerse) => {
    const clipboardContent = `Sure: ${selectedVerse.verse}\nAnlamı: ${
      selectedVerse.translation.text || 'Not available'
    }`;

    Clipboard.setString(clipboardContent)
      .then(() => {
        alert('Selected verse copied to clipboard');
      })
      .catch((error) => {
        console.error('Error copying to clipboard:', error);
      });
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

  return (
    <SafeAreaView>
      <Text style={styles.header}>SEARCH AND SEND</Text>

      <View style={styles.container}>
        <SearchBar
          placeholder="Search for verse or meaning"
          onChangeText={handleChange}
          value={searchText}
          lightTheme={true}
          round
          cancelIcon={true}
          
        />

        <TouchableOpacity
          onPress={handleSearch}
          style={styles.buttonContainer}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Dua Bul / Find</Text>
          </View>
        </TouchableOpacity>

        <ScrollView style={styles.resultsContainer}>
          {matchingVerses.map((verse, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleVerseSelection(verse)}
              style={styles.verseContainer}
            >
              <Text style={styles.verseText}>Verse: {verse.verse}</Text>
              <Text style={styles.verseText}>Translation: {verse.translation.text}</Text>
              { sound ?     <TouchableOpacity onPress={()=>{
    sound.stopAsync()
              setSound(null)
            }}>
              <Text style={styles.verseText}>DURDUR</Text>
              </TouchableOpacity> : <TouchableOpacity onPress={()=>playSound(verse.surah_audio)}>
              <Text style={styles.verseText}>DİNLE</Text>
              </TouchableOpacity>}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    color: 'black',
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  container: {
    margin: 10,
  },

  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
  },

  button: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 8,
    marginTop: 10,
    backgroundColor: '#208796',
  },

  buttonText: {
    fontSize: 18,
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
});

export default Home;