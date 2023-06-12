import io

# INPUT is JOB ID, dataset path
# output is trained model

from training_few_shot_ml.task_scheduler.directory_struct_maker import make_dataset_directories
from training_few_shot_ml.task_scheduler.task_utils import (train_information_fetch_from_s3, train_data_fetch_from_s3)

async def train_data_session(train_job_id: int):
    
    train_job_id = "".join(["TR_",str(train_job_id).zfill(5)])
    
    print("Training Job ID:", train_job_id)
    
    data_paths = await make_dataset_directories(training_job_id = train_job_id)    
    
    file_names = await train_information_fetch_from_s3(train_job_id=train_job_id, dataset_input_path=data_paths["dataset_image_path"])    

    await train_data_fetch_from_s3(train_images_path=data_paths["train_images"],file_names=file_names)
                
    return "DATA FETCH SUCCESSFUL"