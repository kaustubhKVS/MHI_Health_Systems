import pandas as pd

from training_few_shot_ml.aws_image_manager.aws_image_disease_s3_manager import (fetch_object_names_from_s3_bucket, image_download_from_s3_into_io_buffer)

import os

disease_to_abbrevation = {"Emphysema": "EMP", "Fibrosis": "FIB",
                              "Consolidation": "CON", "Pleural_Thickening": "PLT", "Cardiomegaly": "CAM"}
    
abberevation_to_disease = {"EMP": "Emphysema", "FIB": "Fibrosis",
                               "CON": "Consolidation", "PLT": "Pleural_Thickening", "CAM": "Cardiomegaly"}


async def train_information_fetch_from_s3(train_job_id: str, dataset_input_path: str):

    file_names = await fetch_object_names_from_s3_bucket(train_job_id=train_job_id)
        
    disease_labels = []

    for names in enumerate(file_names):
        disease_abbrevation = names[1][16:19]
        disease = abberevation_to_disease[disease_abbrevation]
        disease_labels.append(disease)
        
    # dictionary of lists
    dict = {'filename': file_names, 'label': disease_labels}
    
    df = pd.DataFrame(dict)
    
    df.set_index("filename", inplace=True)
    
    filename_label_csv_file_path = os.path.join(dataset_input_path,"".join([train_job_id,"FSM_TEST.csv"]))
    
    df.to_csv(filename_label_csv_file_path)

    return file_names

async def train_data_fetch_from_s3(train_images_path: str,file_names):
    
    for name in enumerate(file_names):

        name = name[1]
        
        print("Fetching image", name )
        image_buffer = await image_download_from_s3_into_io_buffer(name)
        
        print(type(train_images_path),type(name))
        image_path = os.path.join(train_images_path,name)
        
        with open(image_path, "wb") as f:
            f.write(image_buffer.getbuffer())

        f.close()
    
    print("fetching actual image data successful")
    