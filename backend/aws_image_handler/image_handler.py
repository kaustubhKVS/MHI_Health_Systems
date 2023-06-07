import io
import uuid
import boto3
from boto3.s3.transfer import TransferConfig

from config_aws import (aws_account_access_key, aws_account_secret_access_key,
                        aws_region_name, aws_s3_bucket_name)

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

async def image_upload_to_s3(file_content: bytes, image_file_name: str):

    key_for_file = str(uuid.uuid4().hex[:6])

    image_file_name = ''.join([key_for_file, "_", image_file_name])

    file_content = io.BytesIO(file_content)

    s3.upload_fileobj(Fileobj=file_content,
                      Bucket=aws_s3_bucket_name, Key=image_file_name)

    uploaded_file_url = f"https://{aws_s3_bucket_name}.s3.amazonaws.com/{image_file_name}"

    print("File : ", image_file_name, "is uploaded to S3 Bucket : ", aws_s3_bucket_name)
    
    return {"uploaded_file_url": uploaded_file_url, "image_name_key" : image_file_name}


async def image_download_from_s3_into_io_buffer(image_name_key: str):

    image_byte_buffer = io.BytesIO()
    
    # This method writes the data into the buffer
    s3.download_fileobj( 
    Bucket=aws_s3_bucket_name, 
    Key=image_name_key, 
    Fileobj=image_byte_buffer,
    Config=config)

    print("File : ", image_name_key,
          "is situated at buffer : ", image_byte_buffer)

    return image_byte_buffer

# why do we need this io thingy ?
# https://stackoverflow.com/questions/57451656/raise-valueerrorfileobj-must-implement-read#comment121152869_64389622
# BOTO3 client vs session
# https://stackoverflow.com/a/52337437/14950576
# Enabling high speed multipart downloads
# https://stackoverflow.com/a/74561926/14950576