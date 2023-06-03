[object Object]

## INTRODUCTION

AI Code Converter is a web app that converts your code from one language to another.

## Environment File

Before starting the application , you should create 2 environment files (.env) files both for frontend and backend.

Follow the following steps to create a .env file

### BACKEND ENV FILE

1) Navigate to Backend folder
2) Create a file named .env
3) Populate the file with following syntax and save it.

```sh
PORT = 8083
OPENAI_KEY = YOUR_OPENAI_KEY
SECRET = YOUR_SECRET_KEY
```

### FRONTEND ENV FILE

1) Navigate to Frotned folder
2) Create a file named .env
3) Populate the file with following syntax and save it.

```sh
REACT_APP_BACKEND = 'https://localhost:{BACKEND_PORT}/api'
```

## Start The Application

To start the Backend App, run the following command

```sh
cd backend
npm install
npm start
```

To start the React App , run the following command

```sh
cd frontend
npm install 
npm start
```
