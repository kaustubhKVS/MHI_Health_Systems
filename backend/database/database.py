import boto3
import motor.motor_asyncio
import uuid

from config_aws import (aws_account_access_key, aws_account_secret_access_key,
                        aws_region_name)

from config_db import db_root_url
from model import PhotoModel

from random import randint

# MongoDB driver for FastAPI

client = motor.motor_asyncio.AsyncIOMotorClient(db_root_url)

database = client.MHI_Images

collection = database.medical_images


async def create_image_entry(clinician_id, patient_id, record_id, image_file_upload_response):

    # MAJOR BREAKING ISSUE, make this purely random since mongo can handle only 8 byte int
    # random_record_id : int = randint(1000, 9999)
    # random_record_id : str = str(uuid.uuid4().hex[:6])
    # print("############################################",random_record_id)
    
    document = PhotoModel(patient_id=patient_id,
                          clinician_id=clinician_id,
                          image_file_url=image_file_upload_response["uploaded_file_url"],
                          image_name_key=image_file_upload_response["image_name_key"],
                          record_id= record_id,
                          is_deleted=False)
    
    print(document)

    result = await collection.insert_one(document.dict())

    return document

# async def create_image_entry(medical_image_):
#     document = todo
#     result = await collection.insert_one(document)
#     return document


# async def fetch_one_todo(title):
#     document = await collection.find_one({"title": title})
#     return document


# async def create_todo(todo):
#     document = todo
#     result = await collection.insert_one(document)
#     return document


# async def update_todo(title, desc):
#     await collection.update_one(
#         {"title": title},
#         {"$set": {
#             "description": desc
#         }})
#     document = await collection.find_one({"title": title})
#     return document


# async def remove_todo(title):
#     await collection.delete_one({"title": title})
#     return True
