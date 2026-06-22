import axios from "axios";

const api = axios.create({
    baseURL:'http://localhost:3000/api',
    withCredentials:true
})

export async function getAllPost(){
    const response = await api.get('/post/all-posts')

    return response.data
}

export async function createPost(caption,imgUrl){
      
    const formData = new FormData()

    formData.append('caption',caption)
    formData.append('instaFile',imgUrl)

    const response = await api.post('/post',formData)
    return response.data
} 