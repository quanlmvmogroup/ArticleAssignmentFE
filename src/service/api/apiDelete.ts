import axios, { AxiosResponse } from 'axios';
import {Post} from "./apiGet";

export async function deletePosts(id:string): Promise<Post[]> {
    try {
        const response: AxiosResponse<Post[]> = await axios.delete(`http://localhost:3000/posts/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error delete posts:', error);
        return [];
    }
}