
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import VideoItem from './VideoItem';


type Props = {}

function VideoItemList({}: Props) {

    const [videoList, setVideoList] = useState<string[]>([]);


    useEffect(() => {
        const getVideos = async () => {
            const res = await axios.get('http://192.168.2.73:3000/videos');
           let vids = res.data.map((vid: any) => vid.uid);
            setVideoList(vids);

            

        }
        getVideos();
    }, []);

    let videos = videoList.map((uid: string) => <VideoItem key={uid} uid={uid} />);





  return (
    <div> {videos} </div>
  )
}

export default VideoItemList