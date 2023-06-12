import os
import shutil

from training_few_shot_ml.config_train_session import TRAIN_DATASET_PATH

async def make_dataset_directories(training_job_id: str):
    
    BASE_DIR = TRAIN_DATASET_PATH

    # Directory to store the raw downloaded dataset
    data_input_path = os.path.join(BASE_DIR, str(training_job_id))
    data_path_train = os.path.join(data_input_path, "train")
    data_path_valid = os.path.join(data_input_path, "valid")

    # Directory to store HugeCTR's train configurations and weights
    weights_path = os.path.join(data_input_path, "weights")

    # Creating and cleaning our worker/output directories
    try:
        # Ensure BASE_DIR exists
        if not os.path.isdir(BASE_DIR):
            os.mkdir(BASE_DIR)

        # Make sure we have a clean path for downloading dataset and preprocessing
        if os.path.isdir(data_input_path):
            shutil.rmtree(data_input_path)
        os.mkdir(data_input_path)
        os.mkdir(data_path_train)
        os.mkdir(data_path_valid)

        if os.path.isdir(weights_path):
            shutil.rmtree(weights_path)
        os.mkdir(weights_path)

    except OSError:
        print("Creation of the directories failed")
    else:
        print("Successfully created the directories")
        
    return {"dataset_image_path":data_input_path,"train_images":data_path_train,"val_images":data_path_valid}