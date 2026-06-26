import React from 'react'
import '../style/home.scss'
import Post from '../../common/components/Post'
import { useEffect, useState } from 'react'
import { usePost } from '../../post/hooks/usePost'
import PostCreatedButt from '../components/PostCreatedButt'
import { useAuth } from '../../auth/hooks/useAuth'

const Home = () => {

    const {posts, loading, handleGetAllPosts, handleLikePost, handleUnlikePost, handleGetAllPersonalPosts, personalPosts} = usePost()
    const {getUser, handleGetMe} = useAuth()
    const [allFedd, setAllFedd] = useState(true)
    

    useEffect(()=>{
      handleGetMe()
      handleGetAllPosts()
      handleGetAllPersonalPosts()
    },[])
  
    if(loading){
      return(
        <main><h1>Loading...</h1></main>
      )
    }



    console.log(getUser)
    

  return (
    <>
    <home-sec>
      <nav-bar>
        <h2>Insta</h2>
        <PostCreatedButt></PostCreatedButt>
      </nav-bar>
      <main>
        {allFedd == true ? (
          posts.length == 0 ? <main><h1>No Post Found</h1></main>:
          <div className='feed-section'>
          {posts.map(post=>{
            return <Post className='post-sec' key={post._id}user={post.user} post={post} handleLikePost={handleLikePost} handleUnlikePost={handleUnlikePost} />
          })}
          
        </div>

        ):(
          personalPosts.length == 0 ? <main><h1>No Post Found</h1></main>:
          <div className='feed-section'>
            {personalPosts.map(post=>{
              return <Post className='post-sec' key={post._id}user={post.user} post={post} handleLikePost={handleLikePost} handleUnlikePost={handleUnlikePost} />
            })}
          
          </div>
        )} 

      </main>
      <footer>
        <footer-sec>
          <i className="ri-home-4-line" onClick={()=>{setAllFedd(true)}}></i>
          <i className="ri-file-user-line" onClick={()=>{setAllFedd(false)}}></i>
        </footer-sec>
      </footer>
    </home-sec>
    </>
  )
}

export default Home
