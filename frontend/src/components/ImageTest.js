import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const ImageTest = () => {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadSuccessful, setUploadSuccessful] = useState(false);
  const [imageURL, setimageURL] = useState("");
  const [predictedLabel, setPredictedLabel] = useState("");

  const fileChangeHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("REQUEST STARTS HERE");

    const formData = new FormData();
    formData.append("image_file", selectedFile, selectedFile.name);

    console.log(formData);

    try {
      const response = await axios({
        method: "POST",
        url: "http://127.0.0.1:8000/api/upload_image/",
        params: { clinician_id: "55", record_id: "525", patient_id: "598" },
        data: formData,
        headers: {
          accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      }).then((response) => {
        console.log("REQUEST SUCCESSFUL", response);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="ImageTest">
      {/* {error && <div> {error}</div>} */}
      {/* {isPending && <div> LOADING CONTENT </div>} */}
      {/* {blogs && <BlogList blogs={blogs} title="All Blogs are listed here." />} */}
      <h1>ImagesTest</h1>

      <div className="Image Upload">
        <form>
          <fieldset>
            <input onChange={fileChangeHandler} name="image" type="file" />
          </fieldset>
          <button onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ImageTest;

// Code AXIOS Snippet from: https://surajsharma.net/blog/react-upload-file-using-axios
