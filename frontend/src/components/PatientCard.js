import { useState, useEffect } from "react";
import PatientInfo from "./patientCard_components/PatientInfo";

const PatientCard = (props) => {
  const {
    patientData: {
      patient_allergies,
      patient_careplans,
      patient_conditions,
      patient_encounters,
      patient_immunizations,
      patient_information,
      patient_medications,
      patient_observations,
      patient_organizations,
      patient_payer_transitions,
      patient_procedures,
      patient_providers,
      patient_devices,
    },
  } = props;
  console.log("AT CARD GOT", props);

  const [isTxPending, setTxPending] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [patientAllergies, setPatientAllergies] = useState(patient_allergies);
  const [patientCareplans, setPatientCareplans] = useState(patient_careplans);
  const [patientConditions, setPatientConditions] =
    useState(patient_conditions);
  const [patientEncounters, setPatientEncounters] =
    useState(patient_encounters);
  const [patientImmunizations, setPatientImmunizations] = useState(
    patient_immunizations
  );
  const [patientInformation, setPatientInformation] =
    useState(patient_information);
  const [patientMedications, setPatientMedications] =
    useState(patient_medications);
  const [patientObservations, setPatientObservations] =
    useState(patient_observations);
  const [patientOrganizations, setPatientOrganizations] = useState(
    patient_organizations
  );
  const [patientPayerTransitions, setPatientPayerTransitions] = useState(
    patient_payer_transitions
  );
  const [patientProcedures, setPatientProcedures] =
    useState(patient_procedures);
  const [patientProviders, setPatientProviders] = useState(patient_providers);
  const [patientDevices, setPatientDevices] = useState(patient_devices);

  function isDataEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
  console.log(
    "allergy",
    isDataEmpty(patientDevices.PATIENT),
    patientDevices.PATIENT
  );
  console.log(
    "info",
    isDataEmpty(patientInformation.PATIENT),
    patientInformation.PATIENT
  );

  return (
    <div className="patient_card">
      {console.log("Before passing to prop", patientInformation)}

      {!isDataEmpty(patientInformation.PATIENT) && (
        <div className="patient_info">
          <h2 style={{ textAlign: "left" }}>PERSONAL DETAILS :</h2>

          <div
            className="patient_info_card"
            class="card"
            style={{ width: 600, textAlign: "left" }}
          >
            <div class="card-header">Recent Data</div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                NAME :
                {
                  patientInformation.FIRST[
                    Object.keys(patientInformation.FIRST)[0]
                  ]
                }{" "}
                {"  "}
                {
                  patientInformation.LAST[
                    Object.keys(patientInformation.LAST)[0]
                  ]
                }
              </li>
              <li class="list-group-item">
                DATE OF BIRTH : {"  "}
                {
                  patientInformation.BIRTHDATE[
                    Object.keys(patientInformation.BIRTHDATE)[0]
                  ]
                }
              </li>
              <li class="list-group-item">
                GENDER:
                {"  "}
                {
                  patientInformation.GENDER[
                    Object.keys(patientInformation.GENDER)[0]
                  ]
                }
              </li>
              <li class="list-group-item">
                ETHNICITY: {"  "}
                {
                  patientInformation.ETHNICITY[
                    Object.keys(patientInformation.ETHNICITY)[0]
                  ]
                }
              </li>
              <li class="list-group-item">
                HEALTHCARE_EXPENSES: {"  "}
                {
                  patientInformation.HEALTHCARE_EXPENSES[
                    Object.keys(patientInformation.HEALTHCARE_EXPENSES)[0]
                  ]
                }{" "}
                {"  "} USD
              </li>
              <li class="list-group-item">
                ADDRESS: {"  "}
                {
                  patientInformation.ADDRESS[
                    Object.keys(patientInformation.ADDRESS)[0]
                  ]
                }
              </li>
              <li class="list-group-item">
                STATE: {"  "}
                {
                  patientInformation.STATE[
                    Object.keys(patientInformation.STATE)[0]
                  ]
                }
              </li>
            </ul>
          </div>
        </div>
      )}

      {!isDataEmpty(patientDevices.PATIENT) && (
        <div className="patient_immunization">
          <h2 style={{ textAlign: "left", color: "red", fill: "Highlight" }}>
            ALERT LIVE DEVICE PRESENT
          </h2>
          <h2 style={{ color: "white", backgroundColor: "red" }}>
            SEVERITY DETECTED
          </h2>

          <div
            className="patient_info_card"
            class="card"
            style={{
              width: 600,
              textAlign: "left",
              fill: "Highlight",
              color: "red",
            }}
          >
            <div class="card-header">ACTIVE DEVICE</div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                DEVICE NAME : {"  "}
                {
                  patientDevices.DESCRIPTION[
                    Object.keys(patientDevices.DESCRIPTION)[0]
                  ]
                }{" "}
                {"  "}
              </li>
              <li class="list-group-item">
                DATE INSTALLED : {"  "}
                {patientDevices.START[Object.keys(patientDevices.START)[0]]}
              </li>
              <li class="list-group-item">
                ALERT CODE :{"  "}
                {patientDevices.CODE[Object.keys(patientDevices.CODE)[0]]}
              </li>
            </ul>
          </div>
        </div>
      )}

      {!isDataEmpty(patientMedications.PATIENT) && (
        <div className="patient_medication">
          <h2 style={{ textAlign: "left" }}>MEDICATION</h2>

          <div
            className="patient_info_card"
            class="card"
            style={{ width: 600, textAlign: "left" }}
          >
            <div class="card-header">Recent Data</div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                NAME :
                {
                  patientMedications.DESCRIPTION[
                    Object.keys(patientMedications.DESCRIPTION)[0]
                  ]
                }{" "}
                {"  "}
                {
                  patientMedications.CODE[
                    Object.keys(patientMedications.CODE)[0]
                  ]
                }
              </li>
              <li class="list-group-item">
                DISPENSES : {"  "}
                {
                  patientMedications.DISPENSES[
                    Object.keys(patientMedications.DISPENSES)[0]
                  ]
                }
              </li>
              <li class="list-group-item">
                REASON DESCRIPTION:
                {"  "}
                {
                  patientMedications.REASONDESCRIPTION[
                    Object.keys(patientMedications.REASONDESCRIPTION)[0]
                  ]
                }
              </li>
              <li class="list-group-item">
                START DAY: {"  "}
                {
                  patientMedications.START[
                    Object.keys(patientMedications.START)[0]
                  ]
                }
              </li>
              <li class="list-group-item">
                STOP DAY: {"  "}
                {
                  patientMedications.STOP[
                    Object.keys(patientMedications.STOP)[0]
                  ]
                }{" "}
                {"  "}
              </li>
            </ul>
          </div>
        </div>
      )}

      {!isDataEmpty(patientConditions.PATIENT) && (
        <div className="patient_history">
          <h2 style={{ textAlign: "left" }}>PATIENT HISTORY</h2>

          <div
            className="patient_info_card"
            class="card"
            style={{ width: 600, textAlign: "left" }}
          >
            <div class="card-header">Latest History</div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                NAME :
                {
                  patientEncounters.DESCRIPTION[
                    Object.keys(patientEncounters.DESCRIPTION)[0]
                  ]
                }{" "}
                {"  "}
              </li>
              <li class="list-group-item">
                START : {"  "}
                {
                  patientEncounters.START[
                    Object.keys(patientEncounters.START)[0]
                  ]
                }
              </li>
              <li class="list-group-item">
                STOP :{"  "}
                {patientEncounters.STOP[Object.keys(patientEncounters.STOP)[0]]}
              </li>
            </ul>
          </div>
        </div>
      )}

      {!isDataEmpty(patientImmunizations.PATIENT) && (
        <div className="patient_immunization">
          <h2 style={{ textAlign: "left" }}>IMMUNIZATIONS & VACCINE</h2>

          <div
            className="patient_info_card"
            class="card"
            style={{ width: 600, textAlign: "left" }}
          >
            <div class="card-header">Last Vaccination</div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                NAME : {"  "}
                {
                  patientImmunizations.DESCRIPTION[
                    Object.keys(patientImmunizations.DESCRIPTION)[0]
                  ]
                }{" "}
                {"  "}
              </li>
              <li class="list-group-item">
                DATE TAKEN : {"  "}
                {
                  patientImmunizations.DATE[
                    Object.keys(patientImmunizations.DATE)[0]
                  ]
                }
              </li>
              <li class="list-group-item">
                BASE COST :{"  "}
                {
                  patientImmunizations.BASE_COST[
                    Object.keys(patientImmunizations.BASE_COST)[0]
                  ]
                }
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientCard;
