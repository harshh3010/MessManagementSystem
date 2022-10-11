# Mess Management System Backend

This is the backend for mess management system that we create as a part of our major project at MNNIT Allahabad.

The backend serves the static frontend website and exposes different APIs for frontend app to use.

## Setup

- Launch terminal in `MessManagementSystem/Backend/` directory.
- Run the following command to install all required node packages:
  ```
  > npm install
  ```
- Create a `config.env` file in `MessManagementSystem/Backend/` directory. Specify different fields and set their values as given in `config.env.example` file.
- To run the app in <i>development</i> or <i>production</i> mode, use the following commands:
  ```
  > npm run start:dev
  > npm run start:prod
  ```
- After the server is live, you can access the frontend website at `http://<<server-url>>/index.html` and api at `http://<<server-url>/api/v1/`

> Note: To access the UI from backend, you need to build it first, to do so complete the frontend setup and run `npm run build` in frontend directory.
