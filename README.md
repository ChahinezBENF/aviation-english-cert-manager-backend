# ICAO English Training Management System for Controllers and Pilots

This is a web application designed to manage ICAO English certifications for air traffic controllers and pilots. It helps HR departments track and manage certifications, while also allowing controllers and pilots to view their certification status, upload documents, and track expiry.

## 🎯 Project Purpose and Objectives

- **Main Goal**: Help HR departments track and manage ICAO English certifications for air traffic controllers and pilots.
- Allow controllers/pilots to view their certification status, upload documents, and track expiry.
- Categorize users by certification level (4, 5, 6) and automatically calculate expiration dates.
- Display airport-wide and organization-wide statistics on certification status.
- Manage statistics based on certification levels and validity , Rols .... etc.

## 🔐 User Roles

1. **HR Agent (Admin)**:
   - Full CRUD access to controller/pilot data.
   - Manage certification levels, test dates, and uploads.
   - View and export statistics per airport/organization.
  
2. **Controller/Pilot (User)**:
   - View only their profile, certification info, and test history.
   - Upload certification documents.
   - See test deadlines and plan retakes.

## 📊 Key Features

```plaintext
| **Feature**            | **Description**                                            |
|------------------------|------------------------------------------------------------|
| **Login System**       | Auth with role-based access (HR or Pilot/Controller)       |
| **Dashboard for HR**   | Stats on all controllers' certification levels, expiries   |
| **Profile System**     | Controller info, certification level, test history         |
| **Certificate Upload** | Upload and store certificates                              |
| **Alerts/Reminders**   | Indicate who needs to retake based on expiry logic         |
| **Manage Statistics**  | Get the necessary statistics with grapghs and tables       |
| **Search & Filter**    | Search by  name, level, expiry date, airport               |
```
## 🔧 Tech Stack

- **Back-End**: Node.js, Express
- **Database**: MongoDB (controller data, certification status, test history, etc.)
- **Authentication**: JWT (role-based access)
- **Dependencies**:  dotenv, method-override, cors

## 🔧 Project Structure for Backend
```plaintext
project-root/
├── Backend/                    # Backend folder for server-side code 
│   ├── models/                 # Mongoose schemas (e.g., user.js, airport.js)
│   ├── middleware/             # Middleware for authentication and authorisation 
│   ├── utils/                  # Utility for generating tokens (e.g., jwt.js)
│   ├── routes/                 # API routes (e.g., airportRoutes.js, userRoutes.js)
│   ├── db/                     # MongoDB connection setup (e.g., conn.js)
│   ├── server.js               # Server entry point and Express application setup
│   ├── seedData.js             # Database seeding scripts
|   ├── package.json            # Backend dependencies and scripts 
|   ├── .gitignore              # Files and directories to ignore in Git 
│   └── .env                    # Environment variables 
└── README.md                   # Documentation for the project (Backend Sid)

```

# ✅ Requirement Fulfillment for Backend : 
#  I. (20%) Project Structure, Standardization, and Convention :

## 1.Project is organized into appropriate files and directories, following best practices : 
I have demonstrated that my project is well-organized by presenting the backend project structure (UP), ensuring logical file organization and adherence to best practices.

## 2.Project contains an appropriate level of comments :
My project contains extensive comments to enhance readability and explain key functionalities.

#### Example:
```javascript
// Pre-save hook to calculate certification expiration date

// Remove the user from the airport's array (controllers or pilots)

//Middleware function to authenticate users via JWT
```
## 3.Project is pushed to GitHub, and contains a README file that documents the project, including an overall description of the project: 
My project has been pushed to GitHub with over 10 commits. It includes separate README files for both the backend and frontend, and I am currently working on documenting the project to provide a comprehensive overall description.
## 4.Standard naming conventions are used throughout the project: 
My project follows standard naming conventions across all files, functions, variables, and database schemas to ensure consistency and readability. The structure is as follows: 

- **Files** (`middleware/authorizeRoles` , `models/user.js` , `routes/userLogic` )
- **Functions** (`exports.getAllUsers = async (req, res)` ,`function generateToken(user)`,`exports.updateAirport = async (req, res)` )
- **Schemas** (`const AirportSchema = new mongoose.Schema({})`) 
- **Variables** (`const roleField` , `const existingAirport` , `const token = req.header()` )

## 5.Ensure that the program runs without errors :
My program runs without errors, and I have tested API requests, database connections, error handling, and validation to ensure smooth functionality.Examples:

- **Successful API Requests** (`POST http://localhost:5050/auth/login` => `{"email": "carol.danvers@example.com","password":"captainmarvel"}` => `{ "id":"682403445bfb05dcf84a10d2","token": eyJhbGciOiJIUzI1NiI....."}` )
- **Error Handling** (`{"error": "Invalid email or password"` )
- **Database Connectivity** (`{Connected to MongoDB via Mongoose` )

## 6.Level of effort displayed in creativity, presentation, and user experience:
My project demonstrates strong effort in creativity, presentation, and user experience. I have designed it to be user-friendly, with clear navigation, efficient backend structure, and well-documented features:

- **Creativity :**  Custom features like role-based access control.
- **Presentation :** - Clean project structure with separate frontend and backend README files.
- **User Experience:** Thoughtful error handling and intuitive API responses 

---
#  II. (12%) Core JavaScript :
## 1.Demonstrate proper usage of ES6 syntax and tools: 
I utilized many ES6 features and tools, as shown in the following examples:

- **Using async/await** 
```javascript
const getAllUsers = async () => {
  try {   .........
  } catch (error) {
   ................  }
};
```
- **Object proprety** 
```javascript
{ id: user._id, role: user.role, token: token }
```
- **Modules** 
```javascript
require('dotenv').config();
```

## 2.Use functions and classes to adhere to the DRY principle:
I provided code adheres to the DRY principle in several ways, example:

- **Dynamic Role Updates** 
```javascript
await Airport.findOneAndUpdate(
    { code: savedUser.airportCode },
    { $addToSet: { [updateField]: savedUser._id } }
  );
```
- **Using try/catch** 
```javascript
exports.getUserById = async (req, res) => {
  try {............} catch (err) {
    ............}};
```
- **Reusabale Function** 
```javascript
function authorizeRoles(...roles) { .............. }
```

## 3.Use Promises and async/await, where appropriate:
My project demonstrates appropriate use of Promises and async/await to handle asynchronous operations effectively, ensuring clean, readable, and maintainable code. Below are examples from my code:

- **Using Promise.all for Parallel Execution** 
```javascript
await User.deleteMany({}); // Clear all users
await Airport.deleteMany({}); // Clear all airports
```
- **Using try/catch** 
```javascript
const userData = await Promise.all([
  { .............. }]),
```

## 4. Use Axios or Fetch to Retrieve Data from an API
The application uses Mongoose for retrieving, creating, and updating data in the MongoDB database. While Axios or Fetch is not used in this version, Mongoose provides a similar functionality for database interactions. Example:
```javascript
const users = await User.find();
``` 
## 5.Use sound programming logic throughout the application:
My code demonstrates sound programming logic by:

### Structuring logic in reusable functions to avoid redundancy  ( authorizeRoles function).

### Following DRY principles by encapsulating repeated logic in helper functions or well-defined workflows.

### Using clear control flows, such as checking for user roles or updating nested fields in user objects:

```javascript
if (req.body.certificationLevel) {
  updateData['certification.level'] = req.body.certificationLevel;
  delete updateData.certificationLevel;
}
```
### Avoiding hardcoded values and using dynamic values instead (req.user.role and req.params.id).

## 6.Use appropriate exception handling.
my application demonstrates effective exception handling using try/catch blocks 
---
#  III. (9%) Database :
## 1.Use MongoDB to create a database for your application:
My application uses MangoDB with connection managed by Mangoose hosted on Atlas


#### Example:
```javascript
mongoose.connect(process.env.ATLAS_URI, { dbName: 'icao_management' }).then(() => console.log('Connected to MongoDB'))
```

## 2.Apply appropriate indexes to your database collections:
- **Airport Code Index :** Ensures quick searches for users by airport.
- **Unique Email Index :** Prevents duplicate user emails.

#### Examples:
```javascript
UserSchema.index({ airportCode: 1 });
........
email: {type: String, required: true, unique: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
```

## 3.Create reasonable schemas for your data by following data modeling best practices: 
My  User and Pilot schemas organizes fields logically and enforces validation, plus incudes the pre-save hooks for password hashing and certification expiration calculation
#### Example:
```javascript
const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  role: { type: String, enum: ['controller', 'pilot', 'hr'], default: 'controller' },
  airportCode: { type: String },});
```
---
#  IV. (19%) Server :
## 1.Create a RESTful API using Node and Express: 
Built using Node.js and Express to manage users and airports with clear and consistent endpoints.
## 2.Include API routes for all four CRUD operations:
I creates APIs for Users/Airports/Authentication, examples:

```javascript
router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
```

## 3.Utilize the native MongoDB driver or Mongoose to interface with your database:
I Used Mongoose to manage schemas, validations, and queries

## 4.Include at least one form of user authentication/authorization within the application: 

- **Authentication :** JWT-based tokens ensure secure access(`middleware/authenticateToken` ).

- **Authorization :** Role-based access control restricts specific routes to authorized users (`middleware/authorizeRoles` ).
---

## Frontend repository Link: https://github.com/ChahinezBENF/aviation-english-cert-manager-react
## Frontend deployement Link: https://icao-english-cert.onrender.com 

---
# 🚀 Future Enhancements : 

## Test History
The test history will be dynamic—whenever a controller earns a certificate, it will be automatically recorded in their test history.

## Certification database
create a database to store a certifications earned by employees so the HR can manageit easly and the employees can downloadit 

## Certification Database
A dedicated database will be created to store all certifications earned by employees. This will enable HR to manage them efficiently while allowing employees to download their certificates as needed.


# 📚 Resources Used

- https://www.w3schools.com/js/default.asp
- https://developer.mozilla.org/en-US/docs/Web/JavaScript
- https://mongoosejs.com/docs/api/query.html
- https://jasonwatmore.com/nodejs-jwt-authentication-tutorial-with-example-api