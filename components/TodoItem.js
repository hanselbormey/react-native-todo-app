import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Checkbox from 'expo-checkbox';

import theme from '../theme';
import { isToday } from '../utils/helpers';

export default function TodoItem(props) {
  return (
    <View style={styles.container}>
      {isToday(props.date) ? (
        <Checkbox
          color={theme.colors.primary}
          style={styles.checkbox}
          value={props.isCompleted}
          onValueChange={(event) => props.onCheck(props.id, event)}
        />
      ) : (
        <View
          style={{
            width: 12,
            height: 12,
            backgroundColor: theme.colors.primary,
            borderRadius: 10,
          }}
        ></View>
      )}

      <TouchableHighlight
        onLongPress={() => props.onLongPressTodo(props.id)}
        underlayColor={theme.colors.palette.light}
      >
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
            {props.date.toString()}
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
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
