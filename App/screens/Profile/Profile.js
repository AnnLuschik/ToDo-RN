import React, {useState} from 'react';
import {View, Text, TouchableHighlight, TextInput} from 'react-native';
import styled from 'styled-components';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Profile = () => {
  const user = auth().currentUser;

  const [name, setName] = useState(user.displayName);
  const [isNameEditing, setIsNameEditing] = useState(false);

  const logoutHandler = () => {
    auth()
      .signOut()
      .catch(error => alert(error.code));
  };

  const updateName = async () => {
    try {
      await auth().currentUser.updateProfile({
        displayName: name,
      });
    } catch {
      error => alert(error.code);
    } finally {
      setIsNameEditing(false);
    }
  };

  return (
    <Container>
      <Title>Profile</Title>
      <Info>
        {isNameEditing ? (
          <>
            <Editable
              value={name}
              onChangeText={v => setName(v)}
              onEndEditing={updateName}
            />
            <ConfirmButton
              name="done"
              size={35}
              onPress={updateName}
              backgroundColor="#ffffff"
              color="#000000"
            />
          </>
        ) : (
          <>
            <Username>{name}</Username>
            <EditButton
              name="create"
              onPress={() => setIsNameEditing(true)}
              size={30}
              backgroundColor="transparent"
              color="#000000"
            />
          </>
        )}
      </Info>
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

const Info = styled(View)`
  flex-direction: row;
  margin-bottom: 36px;
`;

const Username = styled(Text)`
  font-size: 24px;
`;

const Editable = styled(TextInput)`
  width: 80%;
  padding: 5px;
  font-size: 24px;
  background-color: #ffffff;
`;

const EditButton = styled(Icon.Button)`
  align-self: center;
`;

const ConfirmButton = styled(Icon.Button)``;

const LogoutButton = styled(TouchableHighlight)`
  align-items: center;
  padding: 10px 0;
  background-color: #5f9ea0;
`;

const ButtonText = styled(Text)`
  font-size: 24px;
`;
