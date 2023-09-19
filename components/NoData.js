import { Image, View, StyleSheet, Text } from 'react-native';
import theme from '../theme';

export default function NoData() {
  return (
    <View style={styles.noData}>
      <Image
        style={{ width: 150, height: 150 }}
        source={require('../assets/chilling-man.png')}
      />
      <Text style={styles.title}>Congrats</Text>
      <Text style={styles.text}>You don't have any task, enjoy your day!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  noData: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.default,
  },
  title: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: 'bold',
  },
});
