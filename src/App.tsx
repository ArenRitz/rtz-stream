import { useState } from 'react'
import './App.css'
import axios from 'axios';
import VideoItemList from './Components/VideoItemList';
import UploadTest from './Components/UploadTest';

function App() {




  return (
    <div >

      <UploadTest />
      <VideoItemList />

    </div>
  );
}

export default App;
