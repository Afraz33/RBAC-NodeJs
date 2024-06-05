# RBAC Backend API

Welcome to our RBAC Backend API project! This project provides a Role-Based Access Control API for managing user roles and permissions.

## Installation

To get started, clone this repository and install the dependencies:

```bash
git clone https://github.com/Afraz33/RBAC-NodeJs
cd RBAC-NodeJs
npm install
```

## Configuration
Create a .env file, with your credentials by looking up the sample.env file.

## Usage 
```bash
npm start 
```

Once the server is running, you can access the API at:
```bash
http://localhost:8000
```

## Architecture

### Routes

- The `routes` directory contains all the route definitions for the API endpoints.
- Each route maps to a specific URL endpoint and HTTP method and calls the corresponding controller function to handle the request.

### Controllers

- The `controllers` directory contains the logic for handling requests from the routes.
- Controllers process incoming requests, interact with the models to retrieve or modify data, and send back appropriate responses.

### Models

- The `models` directory contains the data models representing entities in the database.
- Each model defines the schema and methods for interacting with the corresponding database table.

### Middleware

#### Permission Middleware

- The `permissionMiddleware` directory contains middleware functions for handling role-based access control.
- These middleware functions intercept incoming requests and check whether the user making the request has the necessary permissions to access the requested resource.

#### JWT Authentication Middleware

- The `jwtMiddleware` directory contains middleware functions for JWT (JSON Web Token) authentication.
- These middleware functions handle user authentication by verifying JWT tokens included in the request headers.


## Documentation
You can access API Documentation via this link:

https://documenter.getpostman.com/view/23403023/2sA3Qza8YR
