import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import logo from './logo.png';  // Path to your image

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);       // Image
  const [uploadPercentage, setUploadPercentage] = useState(0);  // Percentage
  const [clinicianName, setClinicianName] = useState("");   // Clinician Name
  const [patientName, setPatientName] = useState("");       // Patient Name
  const [uploadedCount, setUploadedCount] = useState(0);  // New state variable

  const fileSelectedHandler = event => {
    setSelectedFile(event.target.files[0]);
  };

  const clinicianNameHandler = event => {
    setClinicianName(event.target.value);
  };

  const patientNameHandler = event => {
    setPatientName(event.target.value);
  };

  const fileUploadHandler = () => {
    const fd = new FormData();
    fd.append("image_file", selectedFile, selectedFile.name);
    fd.append("clinician_name", clinicianName);
    fd.append("patient_name", patientName);
    
    axios.post("http://localhost:8000/api/upload_image/", fd, {
      onUploadProgress: progressEvent => {
        setUploadPercentage(
          parseInt(
            Math.round((progressEvent.loaded * 100) / progressEvent.total) // Display if the upload is sucessfull
          )
        );
      }
    })
    .then(res => {
      console.log(res);
      setUploadedCount(uploadedCount + 1);  // Increment the counter on successful upload
    })
    .catch(err => {
      console.log(err);
    });
  };

  return (
    <div className="app">
      <div className="app-header">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="app-body">
        <input type="text" placeholder="Clinician Name" onChange={clinicianNameHandler} className="input-field" />
        <input type="text" placeholder="Patient Name" onChange={patientNameHandler} className="input-field" />
        <input type="file" onChange={fileSelectedHandler} className="input-field" />
        <button onClick={fileUploadHandler} className="upload-button">Upload Now</button>
        {uploadPercentage > 0 && (
          <div>
            Upload is {uploadPercentage}% done. Hang tight
          </div>
        )}
        <div>Images uploaded: {uploadedCount} / 15</div> 
      </div>
    </div>
  );
};

export default ImageUpload;
