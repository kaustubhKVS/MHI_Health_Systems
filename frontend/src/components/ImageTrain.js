import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";

import axios from "axios";

const ImageTrain = () => {
  const backend_post_url =
    "http://127.0.0.1:8000/api/upload_image_s3_training/";

  var label = null;

  const [isTxPending, setTxPending] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [imageURL, setimageURL] = useState("");
  const [diseaseName, setDiseaseName] = useState("");
  const [trainJob, setTrainJob] = useState("");
  const [predictedLabel, setPredictedLabel] = useState("");

  useEffect(() => {
    console.log("EFFECT LABEL", predictedLabel);
  }, [predictedLabel]);

  const fileChangeHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    setimageURL(URL.createObjectURL(e.target.files[0]));
    console.log(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("image_file", selectedFile, selectedFile.name);

    try {
      const response = axios({
        method: "POST",
        url: backend_post_url,
        data: formData,
        headers: {
          accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        params: {
          disease_name: diseaseName,
          train_job: trainJob,
        },
      }).then((response) => {
        label = response.data;
        setPredictedLabel(label);
        console.log("REQUEST SUCCESSFUL LABEL IS", predictedLabel);
        console.log(
          "URL SUCCESSFUL LABEL IS",
          predictedLabel.uploaded_file_url
        );
      });
    } catch (error) {
      console.log(error);
    }

    console.log("#############", imageURL, predictedLabel);
    setIsLoading(false);
    setTxPending(false);
  };

  return (
    <div className="create_prediction_local">
      <div className="upload_file" style={{ width: "500px" }}>
        <Button variant="contained" component="label">
          <input
            type="file"
            onChange={fileChangeHandler}
            name="image"
            type="file"
          />
        </Button>

        <input
          type="text"
          required
          placeholder="DISEASE NAME"
          value={diseaseName}
          onChange={(e) => setDiseaseName(e.target.value)}
        />

        <input
          type="number"
          required
          placeholder="TRAIN JOB NUMBER"
          value={trainJob}
          onChange={(e) => setTrainJob(e.target.value)}
        />

        {!isLoading && (
          <Button
            variant="contained"
            color="secondary"
            style={{ backgroundColor: "#368BC2 ", color: "#ffffff" }}
            onClick={() => {
              handleSubmit();
            }}
          >
            Upload Image to S3
          </Button>
        )}
      </div>

      {isLoading && <h1> Loading Prediction </h1>}

      {!isTxPending && (
        <div className="transaction_reciept">
          <h2 style={{ color: "green" }}> IMAGE SUCESSFULLY UPLOADED </h2>
          <h2> IMAGE IS IN TRAINING JOB : {trainJob} </h2>
          <h5 style={{ color: "red" }}>
            {" "}
            IMAGE LOCATION IN CLOUD : {predictedLabel.uploaded_file_url}{" "}
          </h5>
          <img
            src={predictedLabel.uploaded_file_url}
            style={{ width: 500, height: 600 }}
          ></img>
        </div>
      )}
    </div>
  );
};

export default ImageTrain;

// Code AXIOS Snippet from: https://surajsharma.net/blog/react-upload-file-using-axios
