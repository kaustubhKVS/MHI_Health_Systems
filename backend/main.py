from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Path, HTTPException


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
