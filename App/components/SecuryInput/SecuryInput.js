import React from 'react';
import styled from 'styled-components';
import {TextInput} from 'react-native-paper';
import {CustomIcon} from '../../components';

export const SecuryInput = ({value, onChange, isHidden, setIsHidden}) => (
  <Input
    value={value}
    onChangeText={v => onChange(v)}
    placeholder="Password"
    textContentType="password"
    secureTextEntry={isHidden}
    underlineColor="transparent"
    right={
      <TextInput.Icon
        name={() => (
          <CustomIcon
            name={isHidden ? 'invisibleInput' : 'visibleInput'}
            size={25}
            color="#000000"
          />
        )}
        onPress={setIsHidden}
      />
    }
  />
);

const Input = styled(TextInput)`
  margin-bottom: 18px;
  font-size: 18px;
  background-color: #ffffff;
  border-radius: 30px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`;
