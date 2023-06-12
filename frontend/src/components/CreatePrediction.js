import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Button from "@material-ui/core/Button";
import ImageLabel from "./ImageLabel";

const CreatePrediction = () => {
  const backend_post_url =
    "http://127.0.0.1:8000/api/get_prediction_from_file/";

  var label = null;

  const [isTxPending, setTxPending] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageURL, setimageURL] = useState("");

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
      }).then((response) => {
        label = response.data;
        setPredictedLabel(label);
        console.log("REQUEST SUCCESSFUL LABEL IS", predictedLabel);
      });
    } catch (error) {
      console.log(error);
    }

    console.log(imageURL, predictedLabel);
    setIsLoading(false);
    setTxPending(false);
  };

  return (
    <div className="create_prediction_local">
      <div className="upload_file">
        <Button variant="contained" component="label">
          <input
            type="file"
            onChange={fileChangeHandler}
            name="image"
            type="file"
          />
        </Button>
        <input type="number" required placeholder="PATIENT ID" />

        {!isLoading && (
          <Button
            variant="contained"
            color="secondary"
            style={{ backgroundColor: "#368BC2 ", color: "#ffffff" }}
            onClick={() => {
              handleSubmit();
            }}
          >
            Make Prediction
          </Button>
        )}
      </div>

      {isLoading && <h1> Loading Prediction </h1>}

      {!isTxPending && (
        <div className="transaction_reciept">
          <ImageLabel
            imageURL={imageURL}
            predictedLabel={predictedLabel}
          ></ImageLabel>
          {!(predictedLabel == "Normal") && (
            <h2 style={{ color: "white", backgroundColor: "red" }}>
              SEVERITY DETECTED BY AI ENGINE
            </h2>
          )}
        </div>
      )}
    </div>
  );
};

export default CreatePrediction;
