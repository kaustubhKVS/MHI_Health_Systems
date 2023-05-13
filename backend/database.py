import motor.motor_asyncio
import boto3


from db_config import (
    db_root_url
)

from aws_config import (aws_account_access_key,
                        aws_account_secret_access_key, aws_region_name)

# MongoDB driver for FastAPI

client = motor.motor_asyncio.AsyncIOMotorClient(db_root_url)

database = client.MRI_Images

collection = database.medical_image

# S3 Bucket Configuration

aws_session = boto3.Session(
    aws_access_key_id=aws_account_access_key,
    aws_secret_access_key=aws_account_secret_access_key,
    region_name=aws_region_name,
)

s3 = aws_session.client('s3')
