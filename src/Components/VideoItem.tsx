import React from 'react'

type Props = {
    uid: string;
}

function VideoItem({uid}: Props) {
  
  
    return (
    <div>
        <video width="600" controls preload='metadata'>

            <source src={`http://192.168.2.73:3000/${uid}`} type="video/mp4" />

        </video>

    </div>
  )
}

export default VideoItem