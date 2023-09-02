import React from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';
import theme from '../theme';
import { TouchableOpacity } from 'react-native';

export default function AddTodoForm({ onSubmit }) {
  const [text, setText] = React.useState();

  const handleSubmit = () => {
    onSubmit({
      text,
      date: new Date(),
      created_at: new Date(),
      is_completed: false,
    });
  };

  return (
    <View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Text</Text>
        <TextInput
          style={styles.input}
          onChangeText={(newText) => setText(newText)}
          defaultValue={text}
        />
      </View>

      <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
        <Text style={styles.btnText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '80%',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.palette.neutral,
    paddingHorizontal: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    justifyContent: 'space-around',
  },
  label: {
    color: theme.colors.default,
  },
  btn: {
    borderColor: theme.colors.default,
    backgroundColor: theme.colors.palette.dark,
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 24,
  },
  btnText: {
    color: theme.colors.palette.light,
  },
});
