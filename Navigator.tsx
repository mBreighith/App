import { createStackNavigator } from '@react-navigation/stack';
import {HomeScreen, PostDetailsScreen, PostsListScreen, PostFormScreen} from './src/screens'

const Stack = createStackNavigator();

const Navigator: any = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={NAVIGATION_ROUTES.HOME} component={HomeScreen} />
            <Stack.Screen name={NAVIGATION_ROUTES.LIST} component={PostsListScreen} />
            <Stack.Screen name={NAVIGATION_ROUTES.POST_DETAILS} component={PostDetailsScreen} />
            <Stack.Screen name={NAVIGATION_ROUTES.POST_FORM} component={PostFormScreen} />
        </Stack.Navigator>
    );
};

export const NAVIGATION_ROUTES = {
    HOME: 'Home' as never,
    LIST: 'List' as never,
    TODO: 'Todo' as never,
    POST_DETAILS: 'PostDetails' as never,
    ADD_TODO: 'AddTodo' as never,
    POST_FORM: 'PostForm' as never,
};

export default Navigator;