import os
import pandas as pd

from config_EHR import EHR_DATA_DIR_PATH

print("CSV FILES PATH : ", EHR_DATA_DIR_PATH)


patients_info_file_path: str = os.path.join(EHR_DATA_DIR_PATH, "patients.csv")
patient_id_int_to_str_hash_table_file_path: str = os.path.join(
    EHR_DATA_DIR_PATH, "patient_id_int_to_str_hash_table.csv")
allergies_file_path: str = os.path.join(EHR_DATA_DIR_PATH, "allergies.csv")
encounters_file_path: str = os.path.join(EHR_DATA_DIR_PATH, "encounters.csv")
payer_transitions_file_path: str = os.path.join(
    EHR_DATA_DIR_PATH, "payer_transitions.csv")
careplans_file_path: str = os.path.join(EHR_DATA_DIR_PATH, "careplans.csv")
imaging_studies_file_path: str = os.path.join(
    EHR_DATA_DIR_PATH, "imaging_studies.csv")
observations_file_path: str = os.path.join(
    EHR_DATA_DIR_PATH, "observations.csv")
procedures_file_path: str = os.path.join(EHR_DATA_DIR_PATH, "procedures.csv")
conditions_file_path: str = os.path.join(EHR_DATA_DIR_PATH, "conditions.csv")
immunizations_file_path: str = os.path.join(
    EHR_DATA_DIR_PATH, "immunizations.csv")
organizations_file_path: str = os.path.join(
    EHR_DATA_DIR_PATH, "organizations.csv")
providers_file_path: str = os.path.join(EHR_DATA_DIR_PATH, "providers.csv")
devices_file_path: str = os.path.join(EHR_DATA_DIR_PATH, "devices.csv")
medications_file_path: str = os.path.join(EHR_DATA_DIR_PATH, "medications.csv")

patient_id_int_to_str_hash_table_df = pd.read_csv(patient_id_int_to_str_hash_table_file_path)
patients_info_df = pd.read_csv(patients_info_file_path)
allergies_df = pd.read_csv(allergies_file_path)
encounters_df = pd.read_csv(encounters_file_path)
payer_transitions_df = pd.read_csv(payer_transitions_file_path)
careplans_df = pd.read_csv(careplans_file_path)
imaging_studies_df = pd.read_csv(imaging_studies_file_path)
observations_df = pd.read_csv(observations_file_path)
procedures_df = pd.read_csv(procedures_file_path)
conditions_df = pd.read_csv(conditions_file_path)
immunizations_df = pd.read_csv(immunizations_file_path)
organizations_df = pd.read_csv(organizations_file_path)
providers_df = pd.read_csv(providers_file_path)
devices_df = pd.read_csv(devices_file_path)
medications_df = pd.read_csv(medications_file_path)

def prune_df_to_limited_row(df):
    prune_to_rows : int = 5
    
    if len(df) > prune_to_rows :
        df = df[0:5]
        df.reset_index(inplace=True)
        df.drop(['index'], axis=1, inplace=True)
    
    return df

def paitent_id_int_to_string(INT_PATIENT_ID: int):
    STR_PATIENT_ID : str = patient_id_int_to_str_hash_table_df.iloc[INT_PATIENT_ID]["STRING_PATIENT_ID"]
    return STR_PATIENT_ID


def get_patient_data(INT_PATIENT_ID : int):
    
    STR_PATIENT_ID : str = paitent_id_int_to_string(
        INT_PATIENT_ID=INT_PATIENT_ID)
    
    print("PATIENT ID IS :", STR_PATIENT_ID)
    print("DATA READ COMPLETE")
    
    patient_information_df = patients_info_df[patients_info_df["PATIENT"]
                                            == STR_PATIENT_ID]
    patient_allergies_df = allergies_df[allergies_df["PATIENT"]
                                            == STR_PATIENT_ID]
    patient_encounters_df = encounters_df[encounters_df["PATIENT"]
                                            == STR_PATIENT_ID]
    patient_payer_transitions_df = payer_transitions_df[payer_transitions_df["PATIENT"]
                                            == STR_PATIENT_ID]
    patient_careplans_df = careplans_df[careplans_df["PATIENT"]
                                            == STR_PATIENT_ID]
    patient_imaging_studies_df = imaging_studies_df[imaging_studies_df["PATIENT"]
                                            == STR_PATIENT_ID]
    patient_observations_df = observations_df[observations_df["PATIENT"]
                                            == STR_PATIENT_ID]
    patient_procedures_df = procedures_df[procedures_df["PATIENT"]
                                            == STR_PATIENT_ID]
    patient_conditions_df = conditions_df[conditions_df["PATIENT"]
                                            == STR_PATIENT_ID]
    patient_organizations_df = organizations_df[organizations_df["PATIENT"]
                                            == STR_PATIENT_ID]
    patient_immunizations_df = immunizations_df[immunizations_df["PATIENT"]
                                        == STR_PATIENT_ID]
    patient_providers_df = providers_df[providers_df["PATIENT"]
                                        == STR_PATIENT_ID]
    patient_devices_df = devices_df[devices_df["PATIENT"]
                                        == STR_PATIENT_ID]
    patient_medications_df = medications_df[medications_df["PATIENT"]
                                  == STR_PATIENT_ID]
    # print("########## before pruning",patient_medications_df)
    
    
    
    patient_information_df =  prune_df_to_limited_row(patient_information_df)
    patient_allergies_df =  prune_df_to_limited_row(patient_allergies_df)
    patient_encounters_df =  prune_df_to_limited_row(patient_encounters_df)
    patient_payer_transitions_df =  prune_df_to_limited_row(
        patient_payer_transitions_df)
    patient_careplans_df =  prune_df_to_limited_row(patient_careplans_df)
    patient_imaging_studies_df =  prune_df_to_limited_row(
        patient_imaging_studies_df)
    patient_observations_df =  prune_df_to_limited_row(patient_observations_df)
    patient_procedures_df =  prune_df_to_limited_row(patient_procedures_df)
    patient_conditions_df =  prune_df_to_limited_row(patient_conditions_df)
    patient_organizations_df =  prune_df_to_limited_row(
        patient_organizations_df)
    patient_immunizations_df =  prune_df_to_limited_row(patient_immunizations_df)
    patient_providers_df =  prune_df_to_limited_row(patient_providers_df)
    patient_devices_df =  prune_df_to_limited_row(patient_devices_df)
    patient_medications_df =  prune_df_to_limited_row(patient_medications_df)
    # print("############### After Pruning",patient_medications_df)
    
    # fill null valuve or else ASGI will trow error as JSON cannot be made from null value
    patient_information_df =  patient_information_df.fillna("")
    patient_allergies_df =  patient_allergies_df.fillna("")
    patient_encounters_df =  patient_encounters_df.fillna("")
    patient_payer_transitions_df =  patient_payer_transitions_df.fillna("")
    patient_careplans_df =  patient_careplans_df.fillna("")
    patient_imaging_studies_df =  patient_imaging_studies_df.fillna("")
    patient_observations_df =  patient_observations_df.fillna("")
    patient_procedures_df =  patient_procedures_df.fillna("")
    patient_conditions_df =  patient_conditions_df.fillna("")
    patient_organizations_df =  patient_organizations_df.fillna("")
    patient_immunizations_df =  patient_immunizations_df.fillna("")
    patient_providers_df =  patient_providers_df.fillna("")
    patient_devices_df =  patient_devices_df.fillna("")
    patient_medications_df =  patient_medications_df.fillna("")
    
    patient_total_info: dict = {"patient_information": patient_information_df.to_dict(), "patient_allergies": patient_allergies_df.to_dict(), "patient_encounters": patient_encounters_df.to_dict(), "patient_payer_transitions": patient_payer_transitions_df.to_dict(), "patient_careplans": patient_careplans_df.to_dict(), "patient_imaging_studies": patient_imaging_studies_df.to_dict(), "patient_observations": patient_observations_df.to_dict(),
                                "patient_procedures": patient_procedures_df.to_dict(), "patient_conditions": patient_conditions_df.to_dict(), "patient_organizations": patient_organizations_df.to_dict(), "patient_immunizations": patient_immunizations_df.to_dict(), "patient_providers": patient_providers_df.to_dict(), "patient_devices": patient_devices_df.to_dict(), "patient_medications": patient_medications_df.to_dict()}
    
    print("PATIENT INFORMATION FETCHED ")
    
    return patient_total_info
    