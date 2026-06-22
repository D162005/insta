import { useContext } from "react";
import { PostContext} from "../Post.context";
import { getAllPost, createPost, likePost, UnlikePost } from "../services/post.api";

export function usePost(){

    const context = useContext(PostContext)

    const { posts, loading, setPosts, setLoading} = context

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
        return data

    }

    const handleUnlikePost = async(postId)=>{
        const data = await UnlikePost(postId)
        return data
    }

    return {loading, posts, handleGetAllPosts, handleCreatePost, handleLikePost, handleUnlikePost}

}