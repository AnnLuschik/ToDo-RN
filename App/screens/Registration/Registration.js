import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, Pressable} from 'react-native';
import styled from 'styled-components';
import auth from '@react-native-firebase/auth';
import {routes} from '../../routes';
import {SecuryInput} from '../../components';

export const Registration = ({navigation}) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isHiddenPassword, setIsHiddenPassword] = useState(true);

  const signUp = () => {
    if (login.length && password.length) {
      auth()
        .createUserWithEmailAndPassword(login, password)
        .then(() => alert('User was created'))
        .catch(error => alert(error.message));
    }
  };

  return (
    <Container>
      <View>
        <Input
          value={login}
          onChangeText={v => setLogin(v)}
          placeholder="Email"
          textContentType="emailAddress"
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
  padding: 10px;
  font-size: 18px;
  background-color: #ffffff;
  border: 1px solid #ffffff;
  border-radius: 15px;
`;

const Button = styled(TouchableOpacity)`
  align-items: center;
  margin-bottom: 32px;
  padding: 10px 25px;
  background-color: #b2b2b2;
  border-radius: 15px;
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
