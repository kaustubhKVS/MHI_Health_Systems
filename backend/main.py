from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Path, HTTPException, UploadFile

from model import PhotoModel

from image_uploader import image_upload_to_s3

import uuid

# App FastAPI object
app = FastAPI()

origins = ['http://localhost:3000',]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"Data": "CORS Enable"}


@app.get("/about")
def about():
    return "Few Shot Learning Image Classification Platform Under Construction"


@app.post("/api/upload_image/")
async def post_image(image_file: UploadFile):
    print("Upload Endpoint Hit")
    print(image_file.filename)
    print(image_file.content_type)
    print(image_file.file)

    image_file_content = await image_file.read()

    await image_upload_to_s3(image_file_content, image_file.filename)


#     1b.png
# image/png
# <tempfile.SpooledTemporaryFile object at 0x7f16bc076080 >
    # if response:
    #     return response
    # raise HTTPException(400, "Something went wrong/ Bad Request")
