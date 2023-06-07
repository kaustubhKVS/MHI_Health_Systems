import { useState, useEffect } from "react";

const PatientInfo = (props) => {
  console.log("PATIENT INFO HERE IS", props);

  console.log("DECONSTRUCTED DATA :", props.patientInformation);

  const [data, setData] = useState(props.patientInformation);

  console.log("DAtA IS :", data.ADDRESS);

  return (
    <div className="patient_info">
      <h1>patient is Here</h1>
    </div>
  );
};

export default PatientInfo;
