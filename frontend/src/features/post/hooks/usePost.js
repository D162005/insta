import { useContext } from "react";
import { PostContext} from "../Post.context";
import { getAllPost, createPost, likePost, UnlikePost, getPersonalPosts, followUser, unfollowUser } from "../services/post.api";

export function usePost(){

    const context = useContext(PostContext)

    const { posts, loading, setPosts, setLoading, personalPosts, setPersonalPosts} = context

    const handleGetAllPosts = async()=>{
        setLoading(true)

        const data = await getAllPost()
        setPosts(data.posts.reverse() ?? data ?? [])
        setLoading(false)
    }

    const handleCreatePost = async(caption,imgUrl)=>{
        setLoading(true)

        const data = await createPost(caption,imgUrl)
        setPosts([data.post,...posts])
        setLoading(false)
    }

    const handleLikePost = async(postId)=>{
        const data = await likePost(postId)
        await handleGetAllPosts()
        return data

    }

    const handleUnlikePost = async(postId)=>{
        const data = await UnlikePost(postId)
        await handleGetAllPosts()
        return data
    }

    const handleGetAllPersonalPosts = async()=>{
        setLoading(true)
        const data = await getPersonalPosts()
        setPersonalPosts(data.posts.reverse() ?? data ?? [])
        setLoading(false)
    }

    const handleFollowUser = async(userId)=>{
        const data = await followUser(userId)
        await handleGetAllPosts()
        return data
    }

    const handleUnfollowUser = async(userId)=>{
        const data = await unfollowUser(userId)
        await handleGetAllPosts()
        return data

    }

    return {loading, posts, handleGetAllPosts, handleCreatePost, handleLikePost, handleUnlikePost, handleGetAllPersonalPosts, personalPosts, handleFollowUser, handleUnfollowUser}

}