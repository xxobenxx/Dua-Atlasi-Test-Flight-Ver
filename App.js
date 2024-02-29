import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import TopTabsNavigator from './navigation/Navigator';
import mobileAds from 'react-native-google-mobile-ads';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { useState, useEffect } from 'react';
import {  View,StyleSheet,SafeAreaView,} from 'react-native';

const App = () => {
  const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-6223089259266030/4240143625';
  const [adsLoaded, setAdsLoaded] = useState(false);
  const [isAdClosed, setIsAdClosed] = useState(false);

  useEffect(() => {
    // Initialize the Google Mobile Ads SDK
    mobileAds()
      .initialize()
      .then(() => {
        setAdsLoaded(true);
        console.log('Google Mobile Ads SDK initialized');
      });
  }, []);

  useEffect(() => {
    const requestAppTrackingPermission = async () => {
      const result = await check(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
      if (result === RESULTS.DENIED) {
        // The permission has not been requested, so request it.
        await request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
      }
    };
    requestAppTrackingPermission();
  }, []);

  const handleAdClosed = () => {
    console.log('Banner Ad closed');
    setIsAdClosed(true);
  };

  return (
<SafeAreaView style={{ backgroundColor: 'transparent', flex: 1}}>
    <View style={styles.container}>
      
    <NavigationContainer style={{ backgroundColor: 'transparent' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#165d31" />
      <TopTabsNavigator />
      </NavigationContainer>
    
      {adsLoaded && (
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
          onAdFailedToLoad={(error) => console.error('Ad failed to load', error)}
          onAdClosed={handleAdClosed}
        />
       )}

    </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({


  container: {
    
    backgroundColor: 'transparent',
    flex:1,
    marginTop: -10,
  },
})

export default App;
