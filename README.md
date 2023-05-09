# MHI_Health_Systems

Course project for Clinical Decision Support Systems

This project is built using FARM Stack:

- Backend: FastAPI

- Frontend: ReactJS

- Databases: MongoDB (Tentative)

### Install FastAPI

We will be using FastAPI as the backend framework.

Key tools and their use:

1. uvicorn: FastAPI server
2. motor: FastAPI and MondoDB connection

`conda create -n mhi_few_shot python=3.10`

`conda activate mhi_few_shot`

`pip3 install fastapi uvicorn motor`

`pip3 install torch torchvision torchaudio`

### Setup MongoDB

Create an account on MongoDB Atlas and download the following:

- MongoDB Compass
- MongoDB Shell
- MongoDB Community Server

#### To sun the server db, see backend readme.

Connect the server and atlas using the URI provided in the connection tab

### Setup React

`cd frontend`

`npm cache clean -f`

`sudo npm install -g n`

`sudo n latest`

Install the frontend dependencies:

`npm install`

Start the frontend:

`npm start`

### Run FastAPI files:

`cd backend`

`uvicorn main:app --reload`
