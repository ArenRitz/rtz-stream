import React from 'react'

type Props = {
    uid: string;
}

function VideoItem({uid}: Props) {
  
  
    return (
    <div>
        <video width="200" preload='metadata'>

            <source src={`http://174.88.174.40:3000/${uid}`} type="video/mp4" />

        </video>

    </div>
  )
}

export default VideoItem