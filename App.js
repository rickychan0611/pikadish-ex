import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Router from './src/Router';
import {
  useFonts,
  OpenSans_300Light as light,
  OpenSans_400Regular as medium,
  OpenSans_600SemiBold as semiBold,
  OpenSans_700Bold as bold,
} from '@expo-google-fonts/open-sans';

export default function App() {

  useFonts({
    light, medium, semiBold, bold
  });

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}