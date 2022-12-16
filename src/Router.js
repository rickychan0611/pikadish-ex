import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

//screens
import AccountSetting from './screens/AccountSetting';
import UserProfile from './screens/UserProfile';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="AccountSetting" component={AccountSetting} />
      </Stack.Navigator>
    </SafeAreaView>
  );
}

export default Router;