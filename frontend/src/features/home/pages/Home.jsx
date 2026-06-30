import React from 'react'
import '../style/home.scss'
import Post from '../../common/components/Post'
import { useEffect, useState } from 'react'
import { usePost } from '../../post/hooks/usePost'
import PostCreatedButt from '../components/PostCreatedButt'
import { useAuth } from '../../auth/hooks/useAuth'
import { useNavigate } from 'react-router'

const Home = () => {

    const {posts, loading, handleGetAllPosts, handleLikePost, handleUnlikePost, handleGetAllPersonalPosts, personalPosts, handleFollowUser, handleUnfollowUser} = usePost()
    const {getUser, handleGetMe} = useAuth()
    const [allFedd, setAllFedd] = useState(true)
    const nevigate = useNavigate()
    
    useEffect(()=>{
      handleGetMe()
      handleGetAllPosts()
      handleGetAllPersonalPosts()
    },[])
  
    if(!!getUser == true && loading){
      return(
        <main><h1>Loading...</h1></main>
      )
    }

    

    console.log(!!getUser==true)
    

  return (
    <>
    {(!!getUser == false && loading) ? 
      <home-sec>
        <nav-bar>
          <h2 onClick={()=>{nevigate('/')}}>Insta</h2>
        </nav-bar>
        <main>
          <label>WELCOME TO INSTA</label>
          <log-buttons>
            <button onClick={()=>{nevigate('/login')}}>Login</button>
            <button onClick={()=>{nevigate('/register')}}>Register</button>
          </log-buttons>
        </main>
      </home-sec> :
      <home-sec>
        <nav-bar>
          <h2 onClick={()=>{nevigate('/')}}>Insta</h2>
          <PostCreatedButt></PostCreatedButt>
        </nav-bar>
        <main>
          {allFedd == true ? (
            posts.length == 0 ? <main><h1>No Post Found</h1></main>:
            <div className='feed-section'>
            {posts.map(post=>{
              return <Post className='post-sec' key={post._id} user={post.user} post={post} handleLikePost={handleLikePost} handleUnlikePost={handleUnlikePost} handleFollowUser={handleFollowUser} handleUnfollowUser={handleUnfollowUser}/>
            })}
          
          </div>

          ):(
            personalPosts.length == 0 ? <main><h1>No Post Found</h1></main>:
            <div className='feed-section'>
              {personalPosts.map(post=>{
                return <Post className='post-sec' key={post._id} user={post.user} post={post} handleLikePost={handleLikePost} handleUnlikePost={handleUnlikePost} handleFollowUser={handleFollowUser} handleUnfollowUser={handleUnfollowUser}/>
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
    }
    </>
  )
}

export default Home
