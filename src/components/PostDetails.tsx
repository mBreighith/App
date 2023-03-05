import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NAVIGATION_ROUTES} from '../../Navigator'
import styled from 'styled-components/native';


const PostContainer = styled.TouchableOpacity`
  padding: 16px;
  background-color: #ffffff;
  border-bottom: #dddddd;
  border-bottom-width: 1px;
`;

const PostTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const PostBody = styled.Text`
  font-size: 16px;
  line-height: 24px;
`;


export const PostDetails = (props: any) => {
const navigation = useNavigation()
    return (
        //@ts-ignore
        <PostContainer onPress={()=> {navigation.navigate(NAVIGATION_ROUTES.POST_FORM, {post: props.item})}}>
            <PostTitle>{props.item.title}</PostTitle>
            <PostBody>{props.item.body}</PostBody>
        </PostContainer>
    );
};

