import { useState } from 'react'
// import App.css
import '../App.css';
import axios from 'axios';

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
      const res = axios.post('http://192.168.2.73:3000/upload', formData, {
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
        {progress}
        <div className="custom-file mb-4">
          <input type="file" className="custom-file-input" id="customFile" name='rtzvid' onChange={onChange} />
        </div>
        <input type="submit" value="Upload" name='rtzvid' className="btn btn-primary btn-block mt-4" />
      </form>
    
    </div>
  );
}

export default UploadTest;
