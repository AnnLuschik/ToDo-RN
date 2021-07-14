import React, {useState} from 'react';
import styled from 'styled-components';
import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import {TextInput} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import {SecuryInput} from '../../components';

import {routes} from '../../routes';

export const Auth = ({navigation}) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isHiddenPassword, setIsHiddenPassword] = useState(true);

  const signIn = () => {
    if (login.length && password.length) {
      auth()
        .signInWithEmailAndPassword(login, password)
        .catch(error => alert(error.message));
    }
  };

  return (
    <Container>
      <Title>Welcome!</Title>
      <SecondaryTitle>Sign in to continue</SecondaryTitle>
      <View>
        <Input
          value={login}
          onChangeText={v => setLogin(v)}
          placeholder="Email"
          textContentType="emailAddress"
          underlineColor="transparent"
        />
        <SecuryInput
          value={password}
          onChange={setPassword}
          isHidden={isHiddenPassword}
          setIsHidden={() => setIsHiddenPassword(prev => !prev)}
        />
        <Button activeOpacity={0.7} onPress={signIn}>
          <ButtonText>Sign in</ButtonText>
        </Button>
      </View>
      <Footer onPress={() => navigation.navigate(routes.signUp)}>
        <SmallText>Don't have an account?</SmallText>
        <SmallLink>Sign up</SmallLink>
      </Footer>
    </Container>
  );
};

const Container = styled(View)`
  flex: 1;
  justify-content: space-around;
  padding: 60px 15px 0;
  background: #041955;
`;

const Title = styled(Text)`
  align-self: center;
  font-size: 42px;
  color: #ffffff;
`;

const SecondaryTitle = styled(Text)`
  align-self: center;
  font-size: 28px;
  color: #ffffff;
`;

const Input = styled(TextInput)`
  margin-bottom: 18px;
  font-size: 18px;
  background-color: #ffffff;
  border-radius: 30px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
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
