# REST API for car reservation management using Node.js 

Final Challenge of the Compass UOL Scholarship Program: Back-end Journey (Node.js) - AWS Cloud Context - 01/16/2023

The API is a car reservation management system, built with MongoDB, Mongoose, TypeScript, and Node.js. With this API, users can perform operations such as creating, updating, and deleting users and cars, as well as creating, updating, and deleting reservations.

The API uses the REST pattern for communication with clients and returns data in JSON format. The API documentation is available on Swagger UI, allowing for easy exploration of the available endpoints.

# Summary

- [**Links**](#links)
- [**How to Run Locally**](#how-to-run-locally)
- [**How to Use**](#how-to-use)




# Links

[Swagger](https://)
[Deploy](https://)

# How to Run Locally

1. Certify that Node v18.13.0 or any posterior Major 18 version is installed;

2. Have a MongoDB connection of your own (with a connection string and password);

3. Clone the repository:

```
git clone https://github.com/fernandapessoa/challenge3.git
```

4. Change to project directory:

```
cd challenge3
```

5. Install necessary dependencies:

```
npm install
```

6. Make a .env file following the contents of .env.example:

- NODE_ENV: Either development or production;
- PORT: The port to host the application;
- DATABASE: The connection string to the Mongo Database;
- DATABASE_PASSWORD: The password
- JWT_SECRET: For JWT authentication, can be any random string;
- JWT_EXPIRES_IN: The time in which a JWT expires;
- BCRYPT_SALT: For encryption, can be any number.

7. Build the application:

```
npm run build
```

8. Start the application:

```
npm start:dev
```


# How to Use

The application has a MongoDB database, with a collection for users, car and reserves.

Once running, the application awaits for HTTP requests.

Documentation of how each request should look like is available via Swagger.

Requests are also implemented on the file `Final Challenge.postman_collection.json`, which can be opened using POSTMAN.

The available operations are briefly described below.

## GET Operations

- **Get All Users**: Returns all users of the currently logged in user. 
- **Get Me**: Returns the user who is currently authenticated.
- **Get All Cars**: Returns all cars registered in the system.
- **Get Car by Id**: Returns a specific car by its ID.
- **Get Car by Query Param**: Returns a list of cars that match the given query parameters.
- **Get All User's Reserve**: Returns all reservations made by the currently authenticated user.
- **Get User's Reserve by Id**: Returns a specific reservation made by the currently authenticated user by its ID.
- **Get User's Reserve by Query Param**: Returns a list of reservations made by the currently authenticated user that match the given query parameters.

## POST Operations

- **Register User**: Registers a new user in the system.
- **Authenticate User**: Authenticates a user in the system.
- **Register Car**: Registers a new car in the system.
- **Register Reserve**: Registers a new reservation in the system.

## PATCH Operations

- **Update User**: Updates the user data of the currently authenticated user.
- **Update Car by car id and acessory id**:: Updates a specific car's data by its ID and accessory ID.

## PUT Operations

- **Update Car by Id**: Updates a specific car's data by its ID.
- **Update User's Reserve by Id**:  Updates a specific reservation made by the currently authenticated user by its ID.

## DELETE Operations

- **Delete User**: Deletes the account of the currently authenticated user. 
- **Delete Car By Id**: Deletes a specific car by its ID.
- **Delete Users's Reserves by Id**:  Deletes a specific reservation made by the currently authenticated user by its ID.
