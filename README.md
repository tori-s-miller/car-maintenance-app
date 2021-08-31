# Good Dog #

AutoLog is an application that gives you the ability to track car maintenance. With all your maintenance logged in one place, you’ll no longer be wondering when the last time you completed a maintenance task was or when your next task is due.

---

## FUNCTIONALITY ##

AutoLog's functionality includes:

* Access to a demo account to try the app out before signing up
* Sign up as a new user
* Login as an existing user
* Ability to schedule future maintenance tasks
* Ability to change scheduled tasks to completed tasks
* Ability to delete scheduled and completed maintenance tasks

---

## APPLICATION WEBSITE ##

View a working prototype here: (https://autolog-application.herokuapp.com/)

---

## SECURITY ##

Application uses JWT authentication

Passwords are encrypted using bcrypt.js

---

## TECHNOLOGY ##

This is a MERN Stack application, which is comprised of:

* MongoDB
* Express
* React
* Node.js

---

## API DOCUMENTATION ##

API endpoints for the back end include:

### Auth ###

POST to '/api/auth' to authenticate user & get token

### Users ###

POST to 'api/users' to create a new user

### Account ###

* GET api/account/pendingmaintenance to get current user's pending maintenance
* POST api/account/pendingmaintenance to create a pending maintenance task
* DELETE api/account/pendingmaintenance/:id to delete a pending maintenance item
* GET api/account/completedmaintenance to get current user's completed maintenance
* POST api/account/completedmaintenance to create a completed maintenance task
* DELETE api/account/completedmaintenance/:id to delete a completed maintenance item