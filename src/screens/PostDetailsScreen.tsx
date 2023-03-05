import React from 'react';
// @ts-ignore
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Body = styled.Text`
  font-size: 16px;
`;

const PostDetails = ({ route }: any) => {
    const { post } = route.params;

    return (
        <Container>
            <Title>{post.title}</Title>
            <Body>{post.body}</Body>
        </Container>
    );
};

export default PostDetails;
