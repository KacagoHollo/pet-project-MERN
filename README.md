# Fullstack Api Exam Project || Vizsgaremek

It is my "final project" at the Fullstack Api class; a MERN-stack (full-stack) webapplication made with React & Node.js.
The application is made for bird sanctuary, to collect the organizations, whihe can help with injured birds, or give advice or help in this topic.

Start the program

Start the program with vsc

To start the codes do the following steps:

1. step

clone the repository and open with vsc 2. step

at the terminal:

cd backend
npm install
cd ..
cd frontend
npm install
cd ..

3. step

create az .env file at the backend folder with the following data

PORT = 8080
APP_URL={url-of-frontend}
CONNECTION_STRING={mongo-connection-string}

GOOGLE_REDIRECT_URI = http://localhost:3000/callback/google
GOOGLE_CLIENT_ID =
GOOGLE_CLIENT_SECRET ={secret}
JWT_SECRET =

REACT_APP_GOOGLEBASEURL=https://accounts.google.com/o/oauth2/v2/auth
REACT_APP_CLIENT_ID=

LOGFLARE_SOURCE_ID=
LOGFLARE_API_KEY=

4. step

copy the .env file at the root

5.  step

update the login's link at user.js with your GOOGLE_CLIENT_ID

6. step

cd frontend
npm start
cd ..
cd backend
npm start
cd ..

if you wish to use login and its features ask for permisson from the developer

Main technologies I used

React (w JavaScript ES6, react-router, basic & custom Hooks)
Node.js (w express)
MongoDB (w mongoose)
CSS, material-UI
Jest (w mongodb-memory-server, supertest & mocked data)
Docker (w pipeline & docker-compose)
Swagger (w yaml)

Codes I used
At frontend

React: npx create-react-app frontend
Material-ui: npm install @material-ui/Select, FormControl, InputLabel, MenuItem, Button, TextField
Router: npm install react-router-dom
JWT decode: npm i jwt-decode
Axios: npm i axios
jwt-decode,
Loading spin: react-loading-spin

At backend

npm init
npm i express
npm install cors
npm install dotenv
npm install mongoose
npm install axios
npm i bcrypt
npm i jsonwebtoken
npm i jwt-decode
npm i swagger-ui-express
npm i pino-logflare
