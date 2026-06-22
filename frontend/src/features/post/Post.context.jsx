import { createContext, useState } from "react";


export const PostContext = createContext()

export const PostProvider = ({children})=>{

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)

    
    

    return(
        <PostContext.Provider value={{posts, loading, setPosts, setLoading}}>
            {children}
        </PostContext.Provider>
    )
}

