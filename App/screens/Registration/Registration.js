import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import {TextInput} from 'react-native-paper';
import styled from 'styled-components';
import auth from '@react-native-firebase/auth';
import {routes} from '../../routes';
import {SecuryInput} from '../../components';

export const Registration = ({navigation}) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isHiddenPassword, setIsHiddenPassword] = useState(true);

  const signUp = async () => {
    if (login.length && password.length && username.length) {
      await auth()
        .createUserWithEmailAndPassword(login, password)
        .then(() => alert('User was created'))
        .catch(error => alert(error.message));

      await auth()
        .currentUser.updateProfile({displayName: username})
        .catch(error => console.log(error.message));
    }
  };

  return (
    <Container>
      <View>
        <Input
          value={username}
          onChangeText={v => setUsername(v)}
          placeholder="Username"
          textContentType="username"
          underlineColor="#ffffff"
        />
        <Input
          value={login}
          onChangeText={v => setLogin(v)}
          placeholder="Email"
          textContentType="emailAddress"
          underlineColor="#ffffff"
          // theme={{colors: {primary: '#ffffff'}}}
        />
        <SecuryInput
          value={password}
          onChange={setPassword}
          isHidden={isHiddenPassword}
          setIsHidden={() => setIsHiddenPassword(prev => !prev)}
        />
        <Button activeOpacity={0.7} onPress={signUp}>
          <ButtonText>Sign up</ButtonText>
        </Button>
      </View>
      <Footer onPress={() => navigation.navigate(routes.signIn)}>
        <SmallText>Already have an account?</SmallText>
        <SmallLink>Sign in</SmallLink>
      </Footer>
    </Container>
  );
};

const Container = styled(View)`
  flex: 1;
  justify-content: space-between;
  padding: 120px 15px 60px;
  background: #041955;
`;

const Input = styled(TextInput)`
  margin-bottom: 18px;
  font-size: 18px;
  background-color: #ffffff;
  border-radius: 30px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  overflow: hidden;
`;

const Button = styled(TouchableOpacity)`
  align-items: center;
  margin-bottom: 32px;
  padding: 10px 25px;
  background-color: #b2b2b2;
  border-radius: 30px;
`;

const ButtonText = styled(Text)`
  font-size: 22px;
  color: #ffffff;
  text-transform: uppercase;
`;

const Footer = styled(Pressable)`
  flex-direction: row;
  justify-content: space-between;
  padding: 0 15px;
`;

const SmallText = styled(Text)`
  align-self: center;
  font-size: 18px;
  color: #ffffff;
  text-transform: uppercase;
`;

const SmallLink = styled(SmallText)`
  color: red;
`;
