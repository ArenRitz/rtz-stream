import { useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {


//  const uploadButton = document.querySelector('#upload-btn');
//  uploadButton.addEventListener('click', (e) => {
//   const form = document.querySelector('#my-form');
//   const formData = new FormData(form);
//   fetch('http://localhost:3000/upload-video', {
//      method: 'POST',
//      body: formData,
//   });
//  });
//  Convert to react typescript

  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('Choose File');
  const [uploadedFile, setUploadedFile] = useState<{ [key: string]: any }>({});
  
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files![0]);
    setFileName(e.target.files![0].name);
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('rtzvid', file!);
    try {
      const res = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });
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
          <label className="custom-file-label" htmlFor="customFile">
            {fileName}
          </label>
        </div>
        <input type="submit" value="Upload" name='rtzvid' className="btn btn-primary btn-block mt-4" />
      </form>
      {uploadedFile ? <div className="row mt-5">
        <div className="col-md-6 m-auto">
          <h3 className="text-center">{uploadedFile.fileName}</h3>
          <video style={{ width: '100%' }} controls>
            <source src={uploadedFile.filePath} type="video/mp4" />
          </video>
        </div>
      </div> : null}
    </div>
  );
}

export default App;
