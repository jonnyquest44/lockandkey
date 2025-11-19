// App.js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import PatternCardScreen from './screens/PatternCardScreen';
import PatternListScreen from './screens/PatternListScreen';
import RegionScreen from './screens/RegionScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#0F172A' },
          headerTintColor: '#E5E7EB',
          headerTitleStyle: { fontWeight: '600' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Region" component={RegionScreen} />
        <Stack.Screen
          name="PatternList"
          component={PatternListScreen}
          options={({ route }) => ({ title: route.params.region })}
        />
        <Stack.Screen
          name="PatternCard"
          component={PatternCardScreen}
          options={({ route }) => ({ title: route.params.pattern.title })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
