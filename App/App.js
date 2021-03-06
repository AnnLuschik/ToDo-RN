/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState, useCallback} from 'react';
import {Pressable, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

import {Auth, Profile, ToDo, Registration} from './screens';
import {routes} from './routes';

import Icon from 'react-native-vector-icons/MaterialIcons';

import styled from 'styled-components';

const Stack = createStackNavigator();

export const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  const logoutHandler = () => {
    auth()
      .signOut()
      .catch(error => alert(error.code));
  };

  const onAuthStateChanged = useCallback(
    u => {
      setUser(u);
      if (initializing) {
        setInitializing(false);
      }
    },
    [initializing],
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [initializing, onAuthStateChanged]);

  if (initializing) {
    return null;
  }

  return (
    <NavigationContainer>
      {!user ? (
        <Stack.Navigator>
          <Stack.Screen name={routes.signIn} component={Auth} />
          <Stack.Screen name={routes.signUp} component={Registration} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name={routes.home}
            component={ToDo}
            options={({navigation}) => ({
              headerRight: () =>
                auth().currentUser.photoURL ? (
                  <AvatarIcon
                    onPress={() => navigation.navigate(routes.profile)}>
                    <Avatar
                      resizeMode="cover"
                      source={{uri: auth().currentUser.photoURL}}
                    />
                  </AvatarIcon>
                ) : (
                  <Icon.Button
                    name="account-circle"
                    onPress={() => navigation.navigate(routes.profile)}
                    size={40}
                    backgroundColor="transparent"
                    color="#000000"
                  />
                ),
            })}
          />
          <Stack.Screen
            name={routes.profile}
            component={Profile}
            options={({navigation}) => ({
              headerRight: () => (
                <Icon.Button
                  name="logout"
                  onPress={logoutHandler}
                  size={40}
                  backgroundColor="transparent"
                  color="#000000"
                />
              ),
            })}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const AvatarIcon = styled(Pressable)`
  padding: 0 15px;
`;

const Avatar = styled(Image)`
  width: 50px;
  height: 50px;
  border-radius: 50;
`;
