import boto3
import motor.motor_asyncio
import uuid

# why do we need this io thingy ? https://stackoverflow.com/questions/57451656/raise-valueerrorfileobj-must-implement-read#comment121152869_64389622
# https://stackoverflow.com/a/52337437/14950576

import io

from aws_config import (aws_account_access_key, aws_account_secret_access_key,
                        aws_region_name, aws_s3_bucket_name)

aws_session = boto3.Session(
    aws_access_key_id=aws_account_access_key,
    aws_secret_access_key=aws_account_secret_access_key,
    region_name=aws_region_name,
)

s3 = aws_session.client('s3')


async def image_upload_to_s3(file_content: bytes, image_file_name: str):

    key_for_file = str(uuid.uuid4().hex[:6])

    image_file_name = ''.join([key_for_file, "_", image_file_name])

    file_content = io.BytesIO(file_content)

    s3.upload_fileobj(Fileobj=file_content,
                      Bucket=aws_s3_bucket_name, Key=image_file_name)

    print("File : ", image_file_name,
          "is uploaded to S3 Bucket : ", aws_s3_bucket_name)

    uploaded_file_url = f"https://{aws_s3_bucket_name}.s3.amazonaws.com/{image_file_name}"

    return {"uploaded_file_url": uploaded_file_url, "image_name_key" : image_file_name} 
