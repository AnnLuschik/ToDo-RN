import React from 'react';
import {View, Text, Pressable} from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const TodoItem = ({item, deleteItem, changeStatus}) => {
  const {title, done} = item;
  return (
    <Pressable>
      <Container>
        <Icon.Button
          name={done ? 'check-circle' : 'done'}
          size={30}
          color="#ffffff"
          backgroundColor="transparent"
          onPress={changeStatus}
        />
        <Title isDone={done}>{title}</Title>
        <Icon.Button
          name="delete"
          size={30}
          backgroundColor="transparent"
          color="#ffffff"
          onPress={deleteItem}
        />
      </Container>
    </Pressable>
  );
};

const Container = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  margin-bottom: 10px;
  background-color: #52ca77;
`;

const Title = styled(Text)`
  flex: 1;
  font-size: 24px;
  font-weight: 600;
  color: #ffffff;
  ${props => (props.isDone ? 'text-decoration: line-through' : null)};
`;
