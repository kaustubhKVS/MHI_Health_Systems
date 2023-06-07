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
    <div className="image_label" style={{ padding: 50 }}>
      <img src={props.imageURL} style={{ width: 500, height: 600 }} />
      <h1>Label is : {props.predictedLabel}</h1>
    </div>
  );
};

export default ImageLabel;
