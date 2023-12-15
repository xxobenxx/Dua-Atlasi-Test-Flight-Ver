import * as React from 'react';
import { View, TextInput, Text, StyleSheet, SafeAreaView, Button, ScrollView, Keyboard, TouchableOpacity, } from 'react-native';
import { useState } from 'react';
import { SearchBar } from 'react-native-elements';
import axios from 'axios';
import Clipboard from '@react-native-community/clipboard';



const Home = () => {
  const [error, setError] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [surah, setSurah] = useState('');
  const [matchingVerses, setMatchingVerses] = useState([]);
  

  const handleChange = (text) => setSurah(text);

  const handleSubmit = () => {
    setLoading(true);
    handleSearch();
    Keyboard.dismiss();
  };

  const handleSearch = async () => {
    const keyword = surah.trim();
    const surahId = 6; 
    const apiUrl = `https://api.acikkuran.com/surah/${surahId}`;

    try {
      const res = await axios.get(apiUrl);
      const { data } = res.data;

      const foundVerses = findVersesWithKeyword(data, keyword);

      if (foundVerses.length > 0) {
        setMatchingVerses(foundVerses);
      } else {
        setMatchingVerses(['ilgili dua bulunamadı']);
      }

      setIsReady(true);
      setError('');
    } catch (error) {
      setError(error.message);
      setIsReady(true);
    } finally {
      setLoading(false);
    }
  };

  const findVersesWithKeyword = (data, keyword) => {
    const lowerCaseKeyword = keyword.toLowerCase();
    return data.verses.filter((verse) =>
      verse.translation.text.toLowerCase().includes(lowerCaseKeyword)
    );
  };

  const handleVerseSelection = (selectedVerse) => {
    
    console.log('Selected Verse:', selectedVerse);
    const clipboardContent = `Sure: ${selectedVerse.verse}\nAnlamı: ${
      selectedVerse.translation?.text || 'Not available'
    }`;
    
    Clipboard.setString(clipboardContent)
      .then(() => {
        alert('Selected verse copied to clipboard');
      })
      .catch((error) => {
        console.error('Error copying to clipboard:', error);
      });
  };
 
  return (
    <SafeAreaView>
      
      <Text style={styles.header}>SEARCH AND SEND</Text>
     
      <View style={styles.container}>

        <SearchBar
          placeholder="Aradığınız kelime"
          onChangeText={handleChange}
          value={surah}
          lightTheme={true}
          round
          cancelIcon={true}
        />

        <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Dua Bul / Find</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.resultsContainer}>
  {matchingVerses.map((verse, index) => (
    <TouchableOpacity
      key={index}
      onPress={() => handleVerseSelection(verse)}
      style={styles.verseContainer}
    >
      <Text style={styles.verseText}>
        Sure: {verse.verse}
      </Text>
      {verse.translation && verse.translation.text ? (
        <Text style={styles.verseText}>
          Anlamı: {verse.translation.text}
        </Text>
      ) : (
        <Text style={styles.verseText}>Aradığınız kelime bulunamadı</Text>
      )}
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

  container: {},
  results: {
    marginTop: 10,
    fontSize: 18,
    textAlign: 'center',
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
  },
});



  export default Home;

  // const Home = () => {

  //   const [ error, setError ] = useState('');
  //   const [ isReady, setIsReady ] = useState(false);
  //   const [ loading, setLoading ] = useState(false);
  //   const [ surah, setSurah ] = useState('');
  
  //   const handleChange = (e) => setSurah({ ...surah, surah: e.target.value });
  
  
      
  
  //     const handleSubmit = (e) => {
  //       e.preventDefault();
  //     setLoading(true);
  //       handleSearch(surah.surah);
  //     };
  
  //     const keyword = "Abraham"
  //     const surah1 = "all"
  
  //     const handleSearch = async () => {
        
        
  //        let url = `http://api.alquran.cloud/v1/search/${keyword}/${surah1}/en`;
  //       try {
  //         const res = await axios.get(url);
  //         console.log(res);
        
  //       } catch (error) {
  //         setError(error.message);
  //         setIsReady(true);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
    
      
    
  //     return (
      
        
    
  //       <SafeAreaView>
        
       
           
  //         <Text  style={styles.header}>SEARCH AND SEND</Text> 
          
    
  //       <View style={styles.container}>
  //         <SearchBar
  //           placeholder="Type here to search"
  //           onChangeText={(text) => setSurah({ ...surah, keyword: text })}
  //           value={surah.keyword}
  //           lightTheme={true}
  //           round
  //           cancelIcon={true}
  //         />
  
  //         <Button
  //         onPress={handleSubmit}
  //   title="Dua Bul / Find"
  //   color="black"
  // />
  // <Text  style={styles.results}>Sure:{surah.text}</Text> 
  //       </View>
  
  //       </SafeAreaView>
        
  //     );
  //   };
    
  //   const styles = StyleSheet.create({
  //     header:{
  //       color: 'black',
  //       fontSize: 35,
  //       fontWeight: 'bold',
  //       textAlign: 'center', 
  //     },
    
    
  //     container: {},
    
  //   });
    