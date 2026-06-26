import React, { useRef, useState } from 'react'
import { usePost } from '../hooks/usePost'
import { useNavigate } from 'react-router'

const PostCreateForm = () => {

    const [caption, setCaption] = useState()
    const postImageInputFieldRef = useRef(null)

    const {loading, handleCreatePost} = usePost()
    const nevigate = useNavigate()

    const handlePostCreateButt = async(e)=>{
        e.preventDefault()

        const file = postImageInputFieldRef.current.files[0]

        await handleCreatePost(caption,file)
        
        nevigate('/')
    }

    if(loading){
        return(
            <main><h1>Loading...</h1></main>
        )
    }

  return (
    <>
      <nav-bar>
        <h2 onClick={()=>{nevigate('/')}}>Insta</h2>
        <button onClick={()=>{nevigate('/')}}> Back </button>
      </nav-bar>
      <main>
        <h1>Create Post</h1>
        <form onSubmit={handlePostCreateButt}>
            <label htmlFor="postImage">select Image</label>
            <input ref={postImageInputFieldRef}hidden name="postImage"type="file" placeholder='fileLink' id='postImage' />
            <input type="text" name='caption' placeholder='add caption' onInput={(e)=>{setCaption(e.target.value)}}/>
            <button>Post</button>
        </form>
      </main>
    </>
  )
}

export default PostCreateForm
