import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const ImageTest = () => {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadSuccessful, setUploadSuccessful] = useState(false);

  const fileChangeHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    const formData = new FormData();
    formData.append("file", selectedFile, selectedFile.name);

    const requestOptions = {
      method: "POST",
      body: formData,
    };

    fetch("http://127.0.0.1:8000/api/upload_image_test/", requestOptions)
      .then((response) => response.json())
      .then((response) => console.log(response.json()));
  };

  //   const handleSubmit = async (event) => {
  //     event.preventDefault();
  //     const formData = new FormData();
  //     formData.append("selectedFile", selectedFile);
  //     console.log(formData);
  //     try {
  //       const response = await axios({
  //         method: "post",
  //         url: "http://127.0.0.1:8000/api/upload_image_test/",
  //         data: formData,
  //         headers: { "Content-Type": "multipart/form-data" },
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

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
