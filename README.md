# ExpressJS REST API Boilerplate

A simple ExpressJS REST API Boilerplate with JWT authentication and MongoDB as database.

## Boilerplate Features:
- Registration
- Login
- JWT authentication
- Private routes example
- Schema Validation check (email validation, minimum characters, etc.)
- Password Encryption
- MongoDB Backend

## Setup
1. Clone the project
```
git clone https://github.com/udz-codes/express-rest-boilerplate.git
```
2. Install packages
```
npm install
```
3. Setup environment variables: Create .env file in root of the project and set 3 enviroment variables
```
PORT = ""

DB_URL = ""

JWT_SECRET = ""
```
  > **PORT:** Port number for local host <br/>
  > **DB_URL:** MongoDB URL, You can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) as database <br/>
  > **JWT_SECRET:** A random string that will be used for JWT encoding and authentication <br/>

4. Run the project
```
node app.js
```
OR, if you have [nodemon](https://www.npmjs.com/package/nodemon) installed
```
npm start
```

## API endpoints

| **Endpoint** | **Purpose** | **Features** |
| :------------- | :---------- | :----------- |
| / | Homepage  | None |
| /api/user/register | Registration route that saves information of a new user on the database  | Duplicate user check, password hashing |
| /api/user/login | Login route that returns token on successful login  | User existance check, Password match check, JWT Creation |
| /api/private | Example private route that can't be accessed without a token  | "auth-token" header is required, which means user must be logged in to access this route |


## Production dependencies
| **Package** | **Version** | **Purpose** |
| :------------- | :---------- | :----------- |
| [express](https://expressjs.com/) | ^4.17.1 | Creating the REST API |
| [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)  | ^8.5.1 | Generating JWT and Authenticating it |
| [mongoose](https://www.npmjs.com/package/mongoose) | ^6.0.9 | Connecting to MongoDB |
| [bcryptjs](https://www.npmjs.com/package/bcryptjs) | ^2.4.3 | Hashing the password  |
| [@hapi/joi](https://www.npmjs.com/package/joi) | ^17.1.1 | Schema validation check |
