import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Button from "@material-ui/core/Button";
import ImageLabel from "./ImageLabel";

// figure out conditional rendering
// make backend changes so that you get the file url as response while making predictions
// make file and submit components
// make a image and label component

const CreatePrediction = () => {
  const backend_post_url = "http://127.0.0.1:8000/api/create_nft/";

  const [isTxPending, setTxPending] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageURL, setimageURL] = useState(
    "https://images-mhi.s3.amazonaws.com/1a0492_hw2_q1_b.png"
  );
  const [predictedLabel, setPredictedLabel] = useState("Linux");

  const fileChangeHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    setimageURL(URL.createObjectURL(e.target.files[0]));
    console.log(e.target.files[0]);
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    // e.preventDefault();
    console.log("here");

    console.log("REQUEST STARTS HERE");

    // setimageURL(URL.createObjectURL(e.target.files[0]));
    setPredictedLabel("Linux");
    console.log(imageURL, predictedLabel);
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
      </div>

      {!isTxPending && (
        <div className="transaction_reciept">
          <ImageLabel
            imageURL={imageURL}
            predictedLabel={predictedLabel}
          ></ImageLabel>
        </div>
      )}
    </div>
  );
};

export default CreatePrediction;
