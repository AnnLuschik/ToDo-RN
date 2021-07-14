import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, FlatList} from 'react-native';
import {TodoItem, AddTodo} from '../../components';

export const ToDo = () => {
  const [data, setData] = useState([]);

  const deleteItem = key => {
    setData(prev => prev.filter(todo => todo.key !== key));
  };

  const setDone = key => {
    const targetId = data.findIndex(item => item.key === key);
    const targetItem = data[targetId];
    targetItem.done = !targetItem.done;
    const result = [...data];
    result.splice(targetId, 1, targetItem);
    setData(result);
  };

  const renderItem = ({item}) => (
    <TodoItem
      key={item.key}
      item={item}
      deleteItem={() => deleteItem(item.key)}
      changeStatus={() => setDone(item.key)}
    />
  );

  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={styles.sectionTitle}>THINGS TO DO</Text>
      <FlatList
        style={styles.main}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.key}
      />
      <AddTodo
        onPress={v =>
          setData([
            ...data,
            {title: v, done: false, key: Math.random().toString()},
          ])
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: 32,
    paddingHorizontal: 10,
  },
  main: {
    paddingVertical: 24,
  },
  sectionTitle: {
    alignSelf: 'center',
    fontSize: 28,
    fontWeight: 'bold',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
