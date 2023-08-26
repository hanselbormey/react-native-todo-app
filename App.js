import { View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/Home';
import AddTodo from './screens/AddTodo';

function SafeArea({ children }) {
  const insets = useSafeAreaInsets();
  return <View style={{ flex: 1, paddingTop: insets.top }}>{children}</View>;
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeArea>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                headerTitleAlign: 'center',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Add"
              component={AddTodo}
              options={{
                headerTitleAlign: 'center',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeArea>
    </SafeAreaProvider>
  );
}
