import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import styled from 'styled-components';
import auth from '@react-native-firebase/auth';

export const Profile = () => {
  const logoutHandler = () => {
    auth()
      .signOut()
      .catch(error => alert(error.code));
  };

  return (
    <Container>
      <Title>Profile</Title>
      <LogoutButton onPress={logoutHandler} underlayColor="#88A2BE">
        <ButtonText>Log out</ButtonText>
      </LogoutButton>
    </Container>
  );
};

const Container = styled(View)`
  flex: 1;
  padding: 32px 10px;
`;

const Title = styled(Text)`
  align-self: center;
  margin-bottom: 28px;
  font-weight: bold;
  font-size: 28px;
`;

const LogoutButton = styled(TouchableHighlight)`
  align-items: center;
  padding: 10px 0;
  background-color: #5f9ea0;
`;

const ButtonText = styled(Text)`
  font-size: 24px;
`;
