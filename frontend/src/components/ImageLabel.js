import { useState, useEffect } from "react";

const ImageLabel = (props) => {
  //   console.log("HERERERER");
  //   console.log(props);
  console.log("URL");
  console.log(props.imageURL);
  console.log("LABEL");
  console.log(props.predictedLabel);

  const [predictedLabel, setPredictedLabel] = useState(props.predictedLabel);

  var label = props.ImageLabel;
  return (
    <div className="image_label">
      <img src={props.imageURL} />
      <h1>Label is : {predictedLabel}</h1>
    </div>
  );
};

export default ImageLabel;
