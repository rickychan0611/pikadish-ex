import { useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';

SplashScreen.preventAutoHideAsync();

import Router from './src/Router';
import {
  useFonts,
  OpenSans_300Light as light,
  OpenSans_400Regular as medium,
  OpenSans_600SemiBold as semiBold,
  OpenSans_700Bold as bold,
} from '@expo-google-fonts/open-sans';

export default function App() {

  let [fontsLoaded] = useFonts({
    light, medium, semiBold, bold
  });

  const onLayoutRootView = useCallback(
    async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <Router />
      </View>
    </NavigationContainer>
  );
}