import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import styled from 'styled-components';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import defaultAvatar from '../../../resources/default-avatar.jpeg';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {launchImageLibrary} from 'react-native-image-picker';

const imagePickerOptions = {
  mediaType: 'photo',
};

export const Profile = () => {
  let user = auth().currentUser;

  const [name, setName] = useState(user.displayName);
  const [avatar, setAvatar] = useState(user.photoURL);
  const [isEditing, setIsEditing] = useState(false);

  const updateName = async () => {
    try {
      await auth().currentUser.updateProfile({
        displayName: name,
      });
    } catch {
      error => alert(error.code);
    } finally {
      setIsEditing(false);
    }
  };

  const editProfile = () => {
    if (isEditing) {
      updateName();
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const onPhotoSelect = async photo => {
    if (!photo.didCancel) {
      const reference = storage().ref(photo.assets[0].fileName);
      await reference.putFile(photo.assets[0].uri);
      const downloadURL = await reference.getDownloadURL();
      await auth().currentUser.updateProfile({
        photoURL: downloadURL,
      });
      user = auth().currentUser;
      setAvatar(user.photoURL);
    }
  };

  const changeAvatar = () => {
    launchImageLibrary(imagePickerOptions, onPhotoSelect);
  };

  return (
    <Container>
      <Info>
        <AvatarWrapper>
          <Avatar
            source={avatar ? {uri: avatar} : defaultAvatar}
            isEditing={isEditing}
            resizeMode="cover"
          />
          {isEditing ? (
            <ImagePicker onPress={changeAvatar}>
              <ImagePickerText>Add photo</ImagePickerText>
            </ImagePicker>
          ) : null}
        </AvatarWrapper>
        {isEditing ? (
          <Editable
            value={name}
            onChangeText={v => setName(v)}
            right={
              <TextInput.Icon name={() => <Icon name="create" size={35} />} />
            }
          />
        ) : (
          <Username>{name}</Username>
        )}
      </Info>
      <LogoutButton onPress={editProfile} underlayColor="#88A2BE">
        <ButtonText>{isEditing ? 'Save changes' : 'Edit profile'}</ButtonText>
      </LogoutButton>
    </Container>
  );
};

const Container = styled(View)`
  flex: 1;
  padding: 32px 10px;
`;

const Info = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 36px;
`;

const Username = styled(Text)`
  font-size: 24px;
`;

const Editable = styled(TextInput)`
  justify-content: center;
  width: 65%;
  font-size: 24px;
  background-color: #ffffff;
`;

const LogoutButton = styled(TouchableHighlight)`
  align-items: center;
  padding: 10px 0;
  background-color: #5f9ea0;
`;

const ButtonText = styled(Text)`
  font-size: 24px;
`;

const AvatarWrapper = styled(View)`
  width: 100px;
  height: 100px;
  margin-right: 16px;
`;

const Avatar = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 50;
  opacity: ${props => (props.isEditing ? '0.5' : '1')};
`;

const ImagePicker = styled(TouchableOpacity)`
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 50;
`;

const ImagePickerText = styled(Text)`
  text-align: center;
  font-size: 24px;
  color: #000000;
`;
