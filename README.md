# CRUD

CRUD API's

## Authentication Helper, Parts of Util, Service,Controller for Create User API

- POST : http://localhost:4007/users/register
- BODY : {
  "name": "Shefali",
  "email": "shef@example.com",
  "username": "Shefali Lamba",
  "password": "sl172003",
  "description": "MERN Stack developer"
  }

  ## Setting up Project,RouteUtils, Parts of Util, Service,Controller for GetUsers API

- GET : http://localhost:4007/users
  HEADER : {
  authorization: bearer + token
  }

## Model,Parts of Util, Service,Controller for Update User API

- PUT : http://localhost:4007/users/{objectID}
- HEADER : {
  authorization: bearer + token
  }
- BODY:{
  "name": "Shefali Lamba",
  "email": "abcde@example.com",
  "username":"Shef33",
  "password": "sl172003",
  "description": "No description"
  }

## Parts of Util, Service,Controller for Authenticate,authenticate User API

- POST: http://localhost:4007/users/authenticate
- BODY: {
  "username":"Shefali Lamba",
  "password": "sl172003"
  }

## Parts of Util, Service,Controller for Authenticate,authenticate User API

- DELETE: http://localhost:4007/users/{objectID}
- HEADER : {
  authorization: bearer + token
  }

## Thank you
