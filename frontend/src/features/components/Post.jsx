import React from 'react'

const Post = () => {
  return (
    <>
      <post className='feed'>
        <upper-sec>
          <img src="https://plus.unsplash.com/premium_photo-1688572454849-4348982edf7d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzNHx8fGVufDB8fHx8fA%3D%3D" alt="" />
          <h3>userName</h3>
        </upper-sec>
        <post-sec>
          <img src="https://images.unsplash.com/photo-1777863073932-a4b8b68732fd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMzN8fHxlbnwwfHx8fHw%3D" alt="" />
        </post-sec>
        <lower-sec>
          <icon-sec>
            <icon-sec-left>
              <i class="ri-poker-hearts-line"></i>
              {/* <i class="ri-poker-hearts-fill"></i> */}
              <i class="ri-chat-1-line"></i>
              <i class="ri-share-line"></i>
            </icon-sec-left>
            <icon-sec-right>
              <i class="ri-bookmark-line"></i>
            </icon-sec-right>
          </icon-sec>
          <caption-sec>
            <p>caption</p>
          </caption-sec>
        </lower-sec>
      </post>
    </>
  )
}

export default Post
