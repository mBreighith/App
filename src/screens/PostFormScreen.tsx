import React, {useState} from 'react';
import styled from 'styled-components/native';
import {useMutation, useQuery, useQueryClient} from "react-query"
import {useNavigation, useRoute} from '@react-navigation/native';
import {useStore} from '../customHooks';
import {getPost, updatePost, addPost, deletePost} from '../queries';
import {Post} from "./PostsListScreen";
import {NAVIGATION_ROUTES} from '../../Navigator'

const PostFormContainer = styled.View`
  flex: 1;
  padding: 16px;
  background-color: #fff;
`;

const InputsContainer = styled.View`
  margin-top: 25px;
`;

const Label = styled.Text`
  font-size: 14px;
  color: #1b2222;
  height: 21px;
  margin-bottom: 10px;
`;


const TitleInputText = styled.TextInput<any>`
  font-size: 14px;
  padding-left: 16px;
  padding-top: 14px;
  padding-bottom: 15px;
  margin-bottom: 10px;
  background-color: #f2f2f2;
  border-radius: 4px;
  border-color: ${props => (props.isFocused ? '#000000' : 'transparent')};
  border-width: ${props => (props.isFocused ? '1px' : '0px')};
`;

const Footer = styled.View`
  flex-direction: column;
  height: 80px;
  justify-content: space-between;
`;

const SubmitBtn = styled.Button`
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  
`;

const DeleteButton = styled.Button`
  margin-top: 10px;
  margin-bottom: 10px;
  padding-top: 20px;
`;

const PostFormScreen = () => {
    const queryClient = useQueryClient();
    const [allPosts, setAllPosts] = useStore<Post[]>('ALL_POSTS')
    const {navigate, goBack} = useNavigation();
    const {params}: any = useRoute();

    const {data: postData} = useQuery(['POST', params?.post?.id], () => getPost({id: params?.post?.id}), {
        enabled: !!params?.post?.id,
    });

    const updatePostData = useMutation(updatePost, {
        // if the update api was working directly this is what will happen, and it will work correctly
        // but since I am dealing with mock data, I used the on success function to change the existing posts using the useStore custom Hook (Context)
        onSuccess: () => {
            // queryClient.invalidateQueries('POSTS');
            setAllPosts(prevPosts => {
                return prevPosts.map(post => {
                    if (post.id === params.post.id) {
                        return {title: title, body: body, userId: params.post.userId, id: params.post.id};
                    } else {
                        return post;
                    }
                });
            });
            goBack();
        },
        onError: (err) => {
            console.error(err)
        }

    });

    const removePost = useMutation(deletePost, {
        onSuccess: () => {
            // queryClient.invalidateQueries('POSTS');
            setAllPosts(prevPosts => prevPosts.filter(post => post.id !== params?.post?.id));
            goBack();
        }
    });

    const AddNewPost = useMutation(addPost, {
        // the same as in updatePostData

        onSuccess: () => {
            const newPost = {
                userId: Math.floor((Math.random() * 20) + 1),
                id: allPosts.length,
                title: title,
                body: body
            };

            setAllPosts(prevPosts => [newPost, ...prevPosts]);
            // queryClient.invalidateQueries('POSTS');
            // setAllPosts(prevPosts => [{id: allPosts.length, body: body, title: title, }, ...prevPosts]);
            navigate(NAVIGATION_ROUTES.LIST)
        },
        onError: (err) => {
            console.error(err)
        }

    })
    const [isTitleFocused, setIsTitleFocused] = useState(false);
    const [isBodyFocused, setIsBodyFocused] = useState(false);
    const [title, setTitle] = useState<string>(params?.post?.title || '');
    const [body, setBody] = useState<string>(params?.post?.body || '');

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // the response I will get using updatePostData.mutate if the success one I will change the mock data
        params?.post?.id ?
        updatePostData.mutate({ title, body })
            : AddNewPost.mutate({ title, body, id: allPosts?.length, userId: Math.floor((Math.random() * 20) + 1)})
    };

    const handleDeletion = (e: any) => {
        e.preventDefault();
        // the response I will get using updatePostData.mutate if the success one I will change the mock data
        removePost.mutate(params?.post?.id)
    };

    return (
        <PostFormContainer>
            <InputsContainer>
                <Label>Post Title:</Label>
                <TitleInputText
                    onChangeText={setTitle}
                    numberOfLines={4}
                    multiline
                    value={title}
                    placeholder="Post Title"
                    isFocused={isTitleFocused}
                    onFocus={() => setIsTitleFocused(!isTitleFocused)}
                    onBlur={() => setIsTitleFocused(false)}
                />

                <Label>Post Body:</Label>
                <TitleInputText
                    onChangeText={setBody}
                    numberOfLines={4}
                    multiline
                    value={body}
                    placeholder="Post Title"
                    isFocused={isBodyFocused}
                    onFocus={() => setIsBodyFocused(!isBodyFocused)}
                    onBlur={() => setIsBodyFocused(false)}
                />

            </InputsContainer>
            <Footer>
                <SubmitBtn
                    title={params?.post?.id ? 'Save' : 'Submit'}
                    onPress={handleSubmit}
                />
                {params?.post?.id ?
                    <DeleteButton
                        title={'Delete Post'}
                        onPress={handleDeletion}
                    />
                    : null}
            </Footer>


        </PostFormContainer>
    );
};

export default PostFormScreen;
