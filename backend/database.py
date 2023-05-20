import boto3
import motor.motor_asyncio

from aws_config import (aws_account_access_key, aws_account_secret_access_key,
                        aws_region_name)
from db_config import db_root_url
from model import PhotoModel

# MongoDB driver for FastAPI

client = motor.motor_asyncio.AsyncIOMotorClient(db_root_url)

database = client.MRI_Images

collection = database.medical_image

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
