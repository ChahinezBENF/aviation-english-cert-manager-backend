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

- **Front-End**:  CSS, JavaScript, React
- **Back-End**: Node.js, Express
- **Database**: MongoDB (controller data, certification status, test history, etc.)
- **Authentication**: JWT (role-based access)

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
My program runs without errors, and I have tested API requests, database connections, error handling, and validation to ensure smooth functionality.

- **Successful API Requests** (`POST http://localhost:5050/auth/login` => `{"email": "carol.danvers@example.com","password":"captainmarvel"}` => `{ "id":"682403445bfb05dcf84a10d2","token": eyJhbGciOiJIUzI1NiI....."}` )
- **- Error Handling** (`{"error": "Invalid email or password"` )
- **- Database Connectivity** (`{Connected to MongoDB via Mongoose` )

## 6.Level of effort displayed in creativity, presentation, and user experience:
My project demonstrates strong effort in creativity, presentation, and user experience. I have designed it to be user-friendly, with clear navigation, efficient backend structure, and well-documented features:

- **Creativity :**  Custom features like role-based access control.
- **Presentation :** - Clean project structure with separate frontend and backend README files.
- **- User Experience:** Thoughtful error handling and intuitive API responses 


---
#  II. (12%) Core JavaScript :
## 1.
## 2.
## 3.
## 4.
## 5.
## 6.
---
#  III. (9%) Database :
## 1.
## 2.
## 3.
---
#  IV. (19%) Server :
## 1.
## 2.
## 3.
## 4.
---
# Frontend repo Link: 