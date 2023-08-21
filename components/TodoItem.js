import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Checkbox from 'expo-checkbox';
import theme from '../theme';

export default function TodoItem(props) {
  return (
    <View style={styles.container}>
      <Checkbox
        color={theme.colors.primary}
        style={styles.checkbox}
        value={props.isCompleted}
        onValueChange={(event) => props.onCheck(props.id, event)}
      />
      <View style={styles.textContainer}>
        <Text
          style={
            props.isCompleted
              ? [styles.primaryText, styles.underlined]
              : styles.primaryText
          }
        >
          {props.text}
        </Text>
        <Text
          style={
            props.isCompleted
              ? [styles.subheading, styles.underlined]
              : styles.subheading
          }
        >
          {props.date}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 8,
  },
  primaryText: {
    color: theme.colors.default,
    fontSize: theme.fontSizes.subheading,
  },
  subheading: {
    color: theme.colors.palette.neutral,
  },
  underlined: {
    textDecorationLine: 'line-through',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
  },
});
