import React, {useState, useMemo, useEffect} from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import { useQuery} from 'react-query';
import {getPosts} from '../queries';
import {PostDetails as PostDetailsComponent, SearchBar} from '../components';
import { useStore } from '../customHooks';
import {NAVIGATION_ROUTES} from "../../Navigator";

export interface Post {
    userId?: number;
    id?: number;
    title: string;
    body: string;
}

const Container = styled.View`
  flex: 1;
  padding: 10px;
  background-color: #fff;
`;

const LoadingContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding: 10px 0;
`

const Button = styled.Button`
  align-items: center;
  justify-content: center;
  padding: 10px 0;
`

const LoadingIndicator = styled.ActivityIndicator``;

const FlatList = styled.FlatList``;

const PostsListScreen = () => {
    const {navigate} = useNavigation();
    const [visibleData, setVisibleData] = useState<Post[]>([]);
    const [isLoadingPosts, setIsLoadingPosts] = useState(false);
    const [searchText, setSearchText] = useState<string>('')
    const [allPosts, setAllPosts] = useStore<Post[]>('ALL_POSTS')
    const {
        isLoading,
        isError,
        error,
        data: posts
    } = useQuery<Post[]>('ALL_POSTS', getPosts)


    useEffect(()=> {
        // !allPosts.length to make sure to save the posts for once
        if(posts?.length && !allPosts?.length){
        setAllPosts(posts)
        }
    }, [posts]);

    useEffect(()=> {
        if(allPosts?.length){
        setVisibleData(allPosts.slice(0, 10))
        }
    }, [allPosts])

    // to filter search results but based on the visible data array
    const filteredData = useMemo(()=> {
        if(!visibleData?.length){ return [] }
        return searchText.length ? visibleData?.filter((element)=> element.title.indexOf(searchText)> -1): visibleData;
    }, [searchText.length, isLoading, visibleData])


    const loadMorePosts = () => {
        if (isLoading || visibleData?.length === allPosts?.length) {
            return; // Do not fetch more data if already fetching or no more data to fetch
        }

        setIsLoadingPosts(true);
        const newData = allPosts?.slice(0, visibleData?.length! + 10) as Post[];

        //loading delay for demo purposes
        setTimeout(() => {
            setVisibleData(newData);
            setIsLoadingPosts(false);
        }, 1500);
    };

    const renderItem = ({ item }: { item: Post }) => <PostDetailsComponent item={item}/>;

    const renderFooter = () => {
        if (!isLoadingPosts) {
            return null;
        }

        return (
            <LoadingContainer>
                <LoadingIndicator size="small" color="#999" />
            </LoadingContainer>
        );
    };

    return (
        <Container>
            <SearchBar
            searchText={searchText}
            onTextChange={(text: string)=> {
            setSearchText(text)
            }}
            />
            <Button
                title={'Add new Post'}
                onPress={()=> {
                    navigate(NAVIGATION_ROUTES.POST_FORM)
                }}
            />
            {!isLoading ?
            <FlatList
                data={filteredData}
                //@ts-ignore
                renderItem={renderItem}
                keyExtractor={(item: any) => item.id.toString()}
                initialNumToRender={10}
                onEndReached={loadMorePosts}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
            />
                : <LoadingContainer>
                    <LoadingIndicator size="large" color="#999" />
                </LoadingContainer>
            }
        </Container>

    );
};

export default PostsListScreen;




