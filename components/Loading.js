import { Image, StyleSheet, View } from 'react-native';

export default function Loading() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/loading.gif')} style={styles.loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    width: 50,
    height: 50,
    borderRadius: 21,
    marginBottom: 10,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
});
