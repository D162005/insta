import React from 'react'
import '../../home/style/home.scss'

const Post = ({user,post,handleLikePost,handleUnlikePost, handleFollowUser, handleUnfollowUser }) => {

  

  console.log(post._id)

  return (
    <>
      <post className='feed'>
        <upper-sec>
          <upper-left>
            <img src={user.profileImage} alt="" />
            <h3>{user.userName}</h3>
          </upper-left>
          <upper-right>
            {post.isFollow ? <button onClick={()=>{handleUnfollowUser(post.user._id)}}>Following</button> : <button onClick={()=>{handleFollowUser(post.user._id)}}>Follow</button> }
          </upper-right>
        </upper-sec>
        <post-sec>
          <img src={post.imgUrl} alt="" />
        </post-sec>
        <lower-sec>
          <icon-sec>
            <icon-sec-left>
              {post.isLiked ? <i className="ri-poker-hearts-fill liked-fill" onClick={()=>{handleUnlikePost(post._id)}} ></i> : <i className="ri-poker-hearts-line" onClick={()=>{handleLikePost(post._id)}}></i>}
              {/* <i class="ri-poker-hearts-line"></i> */}
              {/* <i class="ri-poker-hearts-fill"></i> */}
              <i className="ri-chat-1-line"></i>
              <i className="ri-share-line"></i>
            </icon-sec-left>
            <icon-sec-right>
              <i className="ri-bookmark-line"></i>
            </icon-sec-right>
          </icon-sec>
          <caption-sec>
            <p>caption: {post.caption}</p>
          </caption-sec>
        </lower-sec>
      </post>
    </>
  )
}

export default Post
