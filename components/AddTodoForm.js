import React from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import theme from '../theme';

export default function AddTodoForm({ onSubmit }) {
  const [text, setText] = React.useState();
  const [date, setDate] = React.useState(new Date());
  const [mode, setMode] = React.useState('date');
  const [show, setShow] = React.useState(false);

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const handleSubmit = () => {
    onSubmit({
      text,
      date,
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

      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.label}>selected: </Text>
            <Text>{date.toLocaleString()}</Text>
          </View>

          <View>
            <Pressable onPress={showDatepicker} style={styles.btnPicker}>
              <Text>Set Date</Text>
            </Pressable>
            <Pressable onPress={showTimepicker} style={styles.btnPicker}>
              <Text>Set Time</Text>
            </Pressable>
          </View>
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={false}
            onChange={onChange}
          />
        )}
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
  btnPicker: {
    marginBottom: 8,
    backgroundColor: theme.colors.palette.light,
    padding: 10,
    borderRadius: 8,
  },
});
