import { Image, StyleSheet, Text, View } from 'react-native';
import TodoList from '../components/TodoList';
import theme from '../theme';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/man_avatar.jpg')}
        style={styles.avatar}
      />
      <Text style={styles.title}>Today</Text>
      <Text style={styles.title}>Upcoming</Text>
      <TodoList />
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  container: {
    padding: 10,
  },
  title: {
    fontSize: theme.fontSizes.heading,
    fontWeight: 'bold',
  },
});
