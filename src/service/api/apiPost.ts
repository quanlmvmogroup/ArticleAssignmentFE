import axios, { AxiosResponse } from 'axios';
import {Post} from "./apiGet";

export async function createPosts(payload: Post): Promise<Post[]> {
    try {
        const response: AxiosResponse<Post[]> = await axios.post('http://localhost:3000/posts', payload);
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}