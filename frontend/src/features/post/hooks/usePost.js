import { useContext } from "react";
import { PostContext} from "../Post.context";
import { getAllPost, createPost } from "../services/post.api";

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

    return {loading, posts, handleGetAllPosts, handleCreatePost}

}