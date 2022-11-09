import { useState } from 'react'
import axios from 'axios';
import CircularProgressWithLabel from './MUI/CircularProgressWithLabel';
function UploadTest() {

  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('Choose File');
  const [uploadedFile, setUploadedFile] = useState('');
  const [progress, setProgress] = useState(0);


  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files![0]);
    setFileName(e.target.files![0].name);
  }

  const onSubmit =  (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('rtzvid', file!);
    try {
      const res = axios.post('http://174.88.174.40:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent: any) => {
            setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
        }
    }).then(res => {
            console.log(res.data.uid);
            }
        );

    } catch (err: any) {
      if (err.response.status === 500) {
        console.log('There was a problem with the server');
      } else {
        console.log(err.response.data.msg);
      }
    }
  }


  return (
    <div className="App">
      <form id="my-form" onSubmit={onSubmit}>
       
       
        <div className="custom-file mb-4">
          <input type="file" className="custom-file-input" id="customFile" name='rtzvid' onChange={onChange} />
        </div>
        <input type="submit" value="Upload" name='rtzvid' className=" " />
      </form>
      <CircularProgressWithLabel value={progress} />
    </div>
  );
}

export default UploadTest;
