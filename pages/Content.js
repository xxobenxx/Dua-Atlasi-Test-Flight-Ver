import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, Image, Share } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { dataWithMeaning } from '../data/data_with_meaning';
import { Audio } from 'expo-av';
import shareIcon from '../assets/shareIcon.png';
import playIcon from '../assets/playIcon.png';
import stopIcon from '../assets/stopIcon.png';



const Content = () => {
  const [selectedSurahName, setSelectedSurahName] = useState(null);
  const [selectedTranslation, setSelectedTranslation] = useState(null);
  const [sound, setSound] = useState();

  const surahNames = [...new Set(dataWithMeaning.map((verse) => verse.surah_name))];
  surahNames.sort((a, b) => {
    const [aPrefix, aNumber] = a.split('-');
    const [bPrefix, bNumber] = b.split('-');

    if (aPrefix === bPrefix) {
      const aNumeric = parseInt(aNumber, 10) || 0;
      const bNumeric = parseInt(bNumber, 10) || 0;
      return aNumeric - bNumeric;
    }
    return a.localeCompare(b);
  });

  const verses = dataWithMeaning.filter((verse) => verse.surah_name === selectedSurahName);

  const handleSurahNameChange = (value) => {
    setSelectedSurahName(value);
    console.log('Selected Surah Name:', value);
  };

 

  React.useEffect(() => {
    if (selectedSurahName !== null|| surahNames.length === 0) {
      const resultText = verses.map((verse) => (
            <View key={verse.id} >
            

              <Text>
             <Text style={{ fontWeight: 'bold', fontSize: 25}}>{verse.surah_name}</Text>{'\n'}

              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{verse.surah_id}</Text>
              
              <Text style={{fontSize: 16 }}>{'\n\n'}{verse.verse}

              <Text style={{ fontWeight: 'bold' }}> {'\n\nOkunuşu: '}</Text>
              {verse.transcription}

              <Text style={{ fontWeight: 'bold' }}>{'\n\nMeali        : '}</Text>
              {verse.translation.text}
              </Text>

            </Text>
            </View>  
          ))
        .reduce((acc, textElement) => acc.concat(textElement, '\n\n'), []);

              

            if (resultText.length > 0) {
              setSelectedTranslation(resultText);
            } 
          } else {
            setSelectedTranslation(null);
          } 
        }, [selectedSurahName]);

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

        const handleVerseSelection = (verse) => {
          onShare(verse);
        }
      

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
                
              } 
            } else if (result.action === Share.dismissedAction) {
              
            }
          } catch (error) {
            Alert.alert(error.message);
          }
        };
        

        return (

          <SafeAreaView style={{ backgroundColor: 'transparent', flex: 1 }}>
            <View style={{ flex: 1 }}>
              <Picker
                selectedValue={selectedSurahName}
                onValueChange={(value) => handleSurahNameChange(value)}
              >
                <Picker.Item label="DUA KILAVUZU" value={null} />
                {surahNames.map((surahName) => (
                  <Picker.Item key={surahName} label={surahName} value={surahName}/>
                ))}
              </Picker>

              <ScrollView style={styles.resultsContainer}>
              
          
            {selectedSurahName === null  ? (
              <View style={styles.resultItem}>
                <Text style={{ fontSize: 20 }}>
                  ۞ Toplam dua sayısı: {surahNames.length}
                </Text>
              </View>
            ) : (
            
            
            verses.map((verse, index) => (
            <View key={verse.id} style={styles.resultItem}>
              
                <Text style={{ margin: 5}}>
                <Text style={{ fontWeight: 'bold', fontSize: 25}}>
                      {verse.surah_name}
                      </Text>{'\n'}

                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                      {verse.surah_id}
              </Text>

              <Text style={{fontSize: 16 }}>
              {'\n\n'}
              {verse.verse}

              <Text style={{ fontWeight: 'bold' }}>{'\n\nOkunuşu: '}</Text>
              {verse.transcription}

              <Text style={{ fontWeight: 'bold' }}>{'\n\nMeali        : '}</Text>
              {verse.translation.text}
              </Text>

        </Text>

        
        <TouchableOpacity
          key={`shareButton_${index}`}
          onPress={() => handleVerseSelection(verse)}
          style={styles.shareButtonContainer}
        >
          <View style={styles.shareButton}>
            <View style={styles.shareButtonContent}>
              <Image
                source={shareIcon}
                style={{ width: 20, height: 20, marginRight: 2 }}
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
            ))
          )}
          </ScrollView>
          </View>
        </SafeAreaView>
      );
    };





const styles = StyleSheet.create({
  
  resultsContainer: {
   margin: 3,
   padding: 3,
   backgroundColor: '#b8a8b4',
   borderWidth: 2,
   borderColor: 'gray',  
   
  },

  resultItem: {
    borderBottomWidth: 1,  
    borderBottomColor: 'black',  
    paddingVertical: 5,  
  },

  shareButtonContainer: {
    alignItems: 'flex-start',
    marginBottom: 3,
    
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

    playerButton: {
      borderWidth: 1,
      backgroundColor: '#208796',
      borderRadius: 10,
      padding: 5,
      marginBottom: 5,
      borderColor: 'black',
      alignItems: 'center',
      
    },

});

export default Content;
