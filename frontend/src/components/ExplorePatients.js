import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Button from "@material-ui/core/Button";
import PatientCard from "./PatientCard";

const ExplorePatients = () => {
  const [patientID, setPatientID] = useState("");
  const [isTxPending, setTxPending] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [patientData, setPatientData] = useState(null);

  const handleSubmit = async (event) => {
    setIsLoading(true);

    try {
      const response = await axios({
        method: "GET",
        url: "http://127.0.0.1:8000/api/fetch_patient_info_by_id/",
        params: { patient_id: patientID },
        headers: {
          accept: "application/json",
        },
      }).then((response) => {
        console.log("REQUEST SUCCESSFUL", response.data);
        setPatientData(response.data);
      });
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
    setTxPending(false);
  };

  return (
    <div className="explore">
      <h1>Patient Information Retrieval Panel</h1>

      <div className="search_bar" style={{ width: 550 }}>
        <input
          type="number"
          required
          placeholder="PATIENT ID"
          value={patientID}
          onChange={(e) => setPatientID(e.target.value)}
        />
        <button
          variant="contained"
          color="primary"
          onClick={() => {
            handleSubmit();
          }}
        >
          SEARCH
        </button>
      </div>

      {isLoading && <h1> Loading Prediction </h1>}

      {!isTxPending && (
        <div className="patient_card">
          <PatientCard patientData={patientData}></PatientCard>
        </div>
      )}

      {/* {error && <div> {error}</div>} */}
      {/* {isPending && <div> LOADING CONTENT </div>} */}
      {/* {blogs && <BlogList blogs={blogs} title="All Blogs are listed here." />} */}
    </div>
  );
};

export default ExplorePatients;

// IMAGE S3 Bucket Policy Updates to Public: https://awstip.com/setting-up-simple-aws-s3-bucket-in-react-bf7e2c3d7e3e
