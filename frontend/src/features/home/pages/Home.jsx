import React from 'react'
import '../style/home.scss'
import Post from '../../common/components/Post'
import { useEffect } from 'react'
import { usePost } from '../../post/hooks/usePost'
import PostCreatedButt from '../components/PostCreatedButt'
import { useNavigate } from 'react-router'

const Home = () => {

    const {posts, loading, handleGetAllPosts, handleLikePost, handleUnlikePost} = usePost()
  
    useEffect(()=>{
      handleGetAllPosts()
    },[])
  
    if(loading){
      return(
        <main><h1>Loading...</h1></main>
      )
    }
  
    console.log(posts)

    

  return (
    <>
      <nav-bar>
        <h2>Insta</h2>
        <PostCreatedButt></PostCreatedButt>
      </nav-bar>
      <main>
        <div className='feed-section'>
          {posts.map(post=>{
            return <Post key={post._id}user={post.user} post={post} handleLikePost={handleLikePost} handleUnlikePost={handleUnlikePost} />
          })}
        </div>
      </main>
    </>
  )
}

export default Home
