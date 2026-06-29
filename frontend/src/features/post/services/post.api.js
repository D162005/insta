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

export async function likePost(postId){
    const response = await api.post('/post/like/'+ postId)
    getAllPost()
    getPersonalPosts()
    return response.data
}

export async function UnlikePost(postId){
    const response = await api.delete('/post/unlike/'+postId)
    getAllPost()
    getPersonalPosts()
    return response.data
}

export async function getPersonalPosts(){
    const response = await api.get('/post/')
    console.log(response.data)
    return response.data
    
}

export async function followUser(userId){
    const response = await axios.post('http://localhost:3000/api/user/follow/'+userId,{withCredentials:true})
    getAllPost()
    getPersonalPosts()
    return response.data
}

export async function unfollowUser(userId){
    const response = await axios.delete('http://localhost:3000/api/user/follow/'+userId,{withCredentials:true})
    getAllPost()
    getPersonalPosts()
    return response.data
}