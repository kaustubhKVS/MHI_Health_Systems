import io
import uuid
import boto3
from boto3.s3.transfer import TransferConfig

from config_aws import (aws_account_access_key, aws_account_secret_access_key,
                        aws_region_name)

from training_few_shot_ml.aws_image_manager.config_train_aws import aws_s3_train_data_bucket_name

aws_session = boto3.Session(
    aws_access_key_id=aws_account_access_key,
    aws_secret_access_key=aws_account_secret_access_key,
    region_name=aws_region_name,
)

# Enabling high speed multi-threaded download
config = TransferConfig(
    multipart_threshold=1024 * 25,   # Concurrent read only if object size > 25MB
    max_concurrency=10,              # Up to 10 concurrent readers
    multipart_chunksize=1024 * 25,   # 25MB chunks per reader
    use_threads=True                 # Must be True to enable multiple readers
)

s3 = aws_session.client('s3')

disease_to_abbrevation = {"Emphysema": "EMP", "Fibrosis": "FIB",
                              "Consolidation": "CON", "Pleural_Thickening": "PLT", "Cardiomegaly": "CAM"}
    
abberevation_to_disease = {"EMP": "Emphysema", "FIB": "Fibrosis",
                               "CON": "Consolidation", "PLT": "Pleural_Thickening", "CAM": "Cardiomegaly"}


async def fetch_object_names_from_s3_bucket(train_job_id: str):
    
    response = s3.list_objects_v2(Bucket=aws_s3_train_data_bucket_name)
    
    file_names = []

    print("S3 Fetch Job ID :", train_job_id)
    
    # print(response["Contents"])

    for idx in range(len(response["Contents"])):
        
        # print(idx)
        # print(name)
        # print("Sliced :" , name[7:15])
        # print(extract_training_id_from_image_key)
        
        name = response["Contents"][idx]["Key"]
        
        extract_training_id_from_image_key = name[7:15]
        
        if extract_training_id_from_image_key == train_job_id:
            # print("Name after slicing :", extract_training_id_from_image_key )
            # print(extract_training_id_from_image_key == train_job_id)
            file_names.append(response["Contents"][idx]["Key"])
            
    print("TRAINING JOB FILES ARE :", file_names)
    print("NUMBER OF TRAINING FILES FOR JOB ID :", train_job_id , "ARE ", len(file_names))
        
    return file_names

async def train_image_upload_to_s3(file_content: bytes, image_file_name: str, disease_name: str, train_job: int):

    key_for_file = str(uuid.uuid4().hex[:6])
    
    abbrevation = disease_to_abbrevation[disease_name]
    
    # Valid for 99999 training jobs
    train_job = ''.join(["TR","_",str(train_job).zfill(5)])
    
    print("Disease Abbreavation is :  ", abbrevation)
    print("Data for Train Job :  ", train_job)

    image_file_name = ''.join([key_for_file,"_",train_job,"_",abbrevation,"_", image_file_name])

    file_content = io.BytesIO(file_content)

    s3.upload_fileobj(Fileobj=file_content,
                      Bucket=aws_s3_train_data_bucket_name, Key=image_file_name)

    uploaded_file_url = f"https://{aws_s3_train_data_bucket_name}.s3.amazonaws.com/{image_file_name}"

    print("Disease ",disease_name,"Abbrevation" ,abbrevation,"File : ", image_file_name,
          "is uploaded to S3 Bucket : ", aws_s3_train_data_bucket_name)

    return {"uploaded_file_url": uploaded_file_url, "image_name_key": image_file_name}


async def image_download_from_s3_into_io_buffer(image_name_key: str):

    image_byte_buffer = io.BytesIO()
    
    # This method writes the data into the buffer
    s3.download_fileobj( 
    Bucket=aws_s3_train_data_bucket_name, 
    Key=image_name_key, 
    Fileobj=image_byte_buffer,
    Config=config)

    print("File : ", image_name_key,
          "is situated at buffer : ", image_byte_buffer)

    return image_byte_buffer