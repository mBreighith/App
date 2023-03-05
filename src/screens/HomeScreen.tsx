import React from "react";
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import {NAVIGATION_ROUTES} from '../../Navigator'
import { Text, StyleSheet } from "react-native";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #fff;
`;

const Image = styled.Image`
  width: 100%;
  height: 100px;
  margin-top: 20px;
`;

const Title = styled.Text`
  font-size: 30px;
  margin-bottom: 20px;
  text-align: center;
`;

const Button = styled.Button``;

const HomeScreen = () => {
    const {navigate} = useNavigation();

    return (
        <Container>
            <Image source={require('../../src/assets/kabi.png')} />
            <Button
                title={'Go to List Screen'}
                onPress={()=> {
                    navigate(NAVIGATION_ROUTES.LIST)
                }}
            />

        </Container>
    )
};

// using StyleSheet to create some styles, I didn't use this approach, I prefer using styled components library
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         backgroundColor: '#fff',
//     },
// });

export default HomeScreen;