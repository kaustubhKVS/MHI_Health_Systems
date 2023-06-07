import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Button from "@material-ui/core/Button";

const ExplorePatients = () => {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadSuccessful, setUploadSuccessful] = useState(false);

  const handleSubmit = async (event) => {
    console.log("REQUEST STARTS HERE");

    try {
      const response = await axios({
        method: "GET",
        url: "http://127.0.0.1:8000/api/fetch_patient_info_by_id/",
        params: { patient_id: "123" },
        headers: {
          accept: "application/json",
        },
      }).then((response) => {
        console.log("REQUEST SUCCESSFUL", response);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="explore">
      <h1>explore</h1>

      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          handleSubmit();
        }}
      >
        PRESS ME
      </Button>
      {/* {error && <div> {error}</div>} */}
      {/* {isPending && <div> LOADING CONTENT </div>} */}
      {/* {blogs && <BlogList blogs={blogs} title="All Blogs are listed here." />} */}
    </div>
  );
};

export default ExplorePatients;

// IMAGE S3 Bucket Policy Updates to Public: https://awstip.com/setting-up-simple-aws-s3-bucket-in-react-bf7e2c3d7e3e
