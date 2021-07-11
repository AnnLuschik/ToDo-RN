import React, {useState, useCallback} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';

export const AddTodo = ({onPress}) => {
  const [text, setText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const onSubmitHandler = useCallback(() => {
    if (text.length) {
      onPress(text);
      setText('');
    }
    setIsEditing(false);
  }, [onPress, text]);

  return (
    <View>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={v => setText(v)}
          onSubmitEditing={onSubmitHandler}
        />
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={() => setIsEditing(true)}>
          <Text style={styles.text}>Add todo</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: '#212121',
    borderWidth: 1,
    fontSize: 20,
  },
  button: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#DDDDDD',
  },
  text: {
    fontSize: 24,
  },
});
