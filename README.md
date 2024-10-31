## Getting Started

This document is intended to get you started quickly in building a backend driven Node.js application complete with pages and content, backend logic and a PostgreSQL database for data storage.
## Prerequisites

The only prerequisite software required to have installed at this point is Git for version control and a code editor - we will use VS Code (VSC).

## Package Management

The foundation of the project development software is Node. While functional, Node depends on "packages" to add functionality to accomplish common tasks. This requires a package manager. Three common managers are NPM (Node Package Manager), YARN, and PNPM. While all do the same thing, they do it slightly differently. We will use PNPM for two reasons: 1) All packages are stored on your computer only once and then symlinks (system links) are created from the package to the project as needed, 2) performance is increased meaning that when the project builds, it does so faster.
You will need to either install or activate PNPM before using it. See https://pnpm.io/

## Install the Project Dependencies

1. Open the downloaded project folder (where this file is located) in VS Code (VSC).
2. Open the VSC terminal: Terminal > New Window.
3. Run the following command in the terminal:

    pnpm install

4. The first time it may take a few minutes, depending on the speed of your computer and the speed of your Internet connection. This command will instruct PNPM to read the package.json file and download and install the dependencies (packages) needed for the project. It will build a "node_modules" folder storing each dependency and its dependencies. It should also create a pnpm-lock.yaml file. This file should NEVER be altered by you. It is an internal file (think of it as an inventory) that PNPM uses to keep track of everything in the project.

## Start the Express Server

With the packages installed you're ready to run the initial test.
1. If the VSC terminal is still open use it. If it is closed, open it again using the same command as before.
2. Type the following command, then press Enter:

    pnpm run dev

3. If the command works, you should see the message "app listening on localhost:5500" in the console.
4. Open the package.json file.
5. Note the "Scripts" area? There is a line with the name of "dev", which tells the nodemon package to run the server.js file.
6. This is the command you just ran.
7. Open the server.js file.
8. Near the bottom you'll see two variables "Port" and "Host". The values for the variables are stored in the .env file.
9. These variables are used when the server starts on your local machine.

## Move the demo file

When you installed Git and cloned the remote repository in week 1, you should have created a simple web page.
1. Find and move that simple web page to the public folder. Be sure to note its name.
## Test in a browser

1. Go to http://localhost:5500 in a browser tab. Nothing should be visible as the server has not been setup to repond to that route.
2. Add "/filename.html" to the end of the URL (replacing filename with the name of the file you moved to the public folder).
3. You should see that page in the browser.



CSE 340 – Outcome Mastery Report 

 

Name: Christian Uzomba Uche 

GitHub: URL: Click here for my GitHub Repository 

Deployed website URL: Click here for my Website  

 

Instructions: 

For each of the course outcomes listed below, include 2-3 examples of the way you have demonstrated this outcome. Each example should include: 

A reference to the specific file/function you have created. 

A 2-3 sentence description of what you did. 

 

Outcome 1: Develop current web front-end standards of validity and practice. 

Examples: 

Example: The Form Validation setup 

File/Function: utilities/account-validation.js  

Description: Implemented JavaScript client-side form validation to ensure proper input before submission. This includes checking required fields, proper email formatting, and password requirements to meet current web standards. 

Example: Responsive Design 

File/Function: public/css/styles.css (CSS for responsive design) 

Description: Created responsive layout elements and media queries to adapt the site for mobile, tablet, and desktop devices, ensuring it aligns with current web frontend standards. 

 

Outcome 2: Use variables, arrays, functions, and control structures in server code. 

Example: Handling user sessions 

File/Function:  controllers/accountController.js 

Description: Developed a function that manages user sessions, checks for valid tokens, and retrieves user roles. This function uses variables, control structures, and server-side logic to manage access control for authenticated users. 

Example: Data processing with arrays 

File/Function: controllers/invController.js 

Description: Used arrays to store and process products before rendering them to the client. Control structures were implemented to handle conditional rendering based on product category. 

 

Outcome 3: Develop web applications that implement common design patterns. 

Example: The Model-View-Controller (MVC) architecture 

File/Function: server.js, controllers/accountController.js 

Description: Implemented the MVC pattern for the account management module, organizing the code into distinct models, views, and controllers. This design pattern improves maintainability and readability. 

Example: Middleware pattern for error handling 

File/Function: errors/error.ejs 

Description: Created middleware functions to handle application errors. This includes logging errors and returning user-friendly messages, keeping the application secure and user oriented. 

 

Outcome 4: Design and use relational databases for CRUD interactions. 

Example: Setting up a PostgreSQL database with the pgAmin 

File/Function: database/db-sql-code.sql 

Description: Designed relational database tables for user and product data. Created relationships between tables to support CRUD operations and ensure data integrity. 

Example: CRUD operations for inventory management 

File/Function: controllers/invController.js, accountController.js 

Description: Developed server-side CRUD operations to add, update, delete, and retrieve inventory items, allowing users to manage products effectively. 

Outcome 5: Validate data (client-side and server-side) appropriate to the task. 

Example: Client-side validation for login 

File/Function: utilities/index.js, account-validation, inventory-validation.js 

Description: Used JavaScript to validate email format and password requirements on the client side before sending login requests to the server, reducing the chance of invalid submissions and implementing “jwt”. 

Example: Server-side validation for registration 

File/Function: controllers/registrationController.js 

Description: Implemented server-side validation to check for duplicate emails and enforce strong password criteria, ensuring that only valid data is stored in the database. 

 

Outcome 6: Demonstrate the skills of a productive team member (such as solving problems, collaborating with others, communicating clearly, fulfilling assignments, and meeting deadlines.) 

Example: GitHub collaboration for project 

File/Function:  GitHub repository, README.md, Google Team 

Description: Actively contributed code, documented project updates, and managed pull requests on GitHub, fostering effective collaboration and clear communication within the team. 

Example: Collaborative debugging with Teams and Instructor 

File/Function: controllers/accountController.js, invController.js 

Description: Worked with teams to debug and endure functionality, sharing insight with teams and instructors to better understand the project. 

 