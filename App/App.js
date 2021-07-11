/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, FlatList} from 'react-native';
import {TodoItem, AddTodo} from './components';

export const App = () => {
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

// const Section = ({children, title}) => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

// const App = () => {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.js</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// import {
// Colors,
// DebugInstructions,
// Header,
// LearnMoreLinks,
// ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
