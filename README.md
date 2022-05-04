# Forter Trusted Identities sample application #

This sample application is intended to show a baseline deployment of Forter Trusted Identities.

The sample app focuses on the Login touchpoint, but the setup is similar for the Sign-Up and In-App touchpoints.

> Note: this example application is not officially supported by Forter and should be used for reference and educational purposes only.

The app contains the two key interfaces with Forter:

* front-end js
* back-end API call(s)

You must have access to a Forter test tenant.

## Prerequisites ##

* NodeJS: This app is a NodeJS app designed to run on localhost, so you should install NodeJS on your system.

* Forter API key: You will need a Forter API key, which can be found in your Forter Test portal instance:
https://portal.forter.com/app/developer/api/api/general/security-and-authentication

* Forter JavaScript snippet: https://portal.forter.com/app/developer/api/api/services-and-apis/javascript-integration

## Setup ##

* Copy the `.env_example` file to `.env`

* Update the values in `.env` to match your environment.

* Update the `FORTER JS SNIPPET` in `public/index.html`

* Install the dependencies

`npm install`

## Run the app ##

`node app.js`

## Test the app ##

You can use the pre-built users to test out the various responses from Forter.

Responses from Forter will be logged server-side, and will be logged to the browser console as well.

For all of the test users, the password field will be ignored. In most deployments, Forter is called for a decision only after a user has successfully authenticated.
