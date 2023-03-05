import axios from 'axios';
import type {Post} from '../screens/PostsListScreen'

const PostsApi = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
})

export const getPosts = async () => {
    const {data} = await PostsApi.get(`/posts`)
    return data
}

export const getPost = async ({id}:{id: any}) => {
    const {data} = await PostsApi.get(`/posts/${id}`)
    return data
}

export const addPost = async (post: Post) => {
    return await PostsApi.post('/posts', post)
}

export const updatePost = async (post: Post) => {
    return await PostsApi.patch(`/posts/${post.id}`, post)
}

export const deletePost = async ({ id }: {id: any}) => {
    return await PostsApi.delete(`/posts/${id}`, id)
}

export default PostsApi;