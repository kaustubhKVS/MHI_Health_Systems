import uuid
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Path, HTTPException, UploadFile
from fastapi import File

from model import PhotoModel
import io



from image_uploader import image_upload_to_s3
from database import create_image_entry
from inference_few_shot_ml.inference import get_fsm_prediction

from PIL import Image


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


@app.post("/api/upload_image/", response_model=PhotoModel)
async def post_image(image_file: UploadFile, clinician_id: int , record_id: int, patient_id: int):

    print("########### New ENTRY Uploading ##################", image_file.filename, "\n")
    
    image_file_content = await image_file.read()

    image_file_upload_response = await image_upload_to_s3(image_file_content, image_file.filename)

    image_information: PhotoModel = await create_image_entry(clinician_id, patient_id, record_id, image_file_upload_response)

    print("########### New ENTRY SUCCESS  ##################")
        
    return image_information

@app.post("/api/get_prediction/")
async def post_image(image_file: UploadFile):

    print("########### PREDICTION IN PROGRESS  ##################", image_file.filename, "\n")
    
    image_file_content = await image_file.read()
    
    predicted_label = await get_fsm_prediction(image_file_content)

    print("########### PREDICTION SUCCESSFUL  ##################")
        
    return predicted_label

#     1b.png
# image/png
# <tempfile.SpooledTemporaryFile object at 0x7f16bc076080 >
    # if response:
    #     return response
    # raise HTTPException(400, "Something went wrong/ Bad Request")