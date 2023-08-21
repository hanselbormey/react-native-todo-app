import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import HomeScreen from './screens/Home';

function SafeArea({ children }) {
  const insets = useSafeAreaInsets();
  return <View style={{ flex: 1, paddingTop: insets.top }}>{children}</View>;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeArea>
        <HomeScreen />
        <StatusBar style="auto" />
      </SafeArea>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  safeArea: {
    flex: 1,
  },
});
