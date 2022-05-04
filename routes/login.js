
const axios = require('axios')

////////////////////////////////////////////////////

const users = {
	'lois.lane': {
		'ip_address': '0.0.0.1', // APPROVE
		'account_id': 'lois-abc-123'
	},
	'lex.luthor': {
		'ip_address': '0.0.0.2', // DECLINE
		'account_id': 'lex-abc-123'
	},
	'lana.lang': {
		'ip_address': '0.0.0.3', // NOT_REVIEWED
		'account_id': 'lana-abc-123'
	},
	'clark.kent': {
		'ip_address': '0.0.0.4', // VERIFICATION_REQUIRED
		'account_id': 'clark-abc-123'
	},
	'perry.white': {
		'account_id': 'perry-abc-123'
	}
}

////////////////////////////////////////////////////

module.exports = function(app){

	app.post('/login', function (req, res) {

		const { username, forter_token }  = req.body

		console.log("the email is: " + username)

		console.log("the forter token is: " + forter_token)

		// here is where you would check the user's username and password
		// against your user directory
		// Normally you send only successful authentications to Forter

		if (credentials_are_correct(username, 'password123')) {

			let ip_address, account_id

			if (process.env.TEST_MODE == 'true') {

				account_id = users[username]['account_id']

				if (username == 'perry.white') {
					ip_address = req.headers['x-forwarded-for'] || req.connection.remoteAddress
				}
				else {
					ip_address = users[username]['ip_address']
				}
			}
			else {
				account_id = 'no_account_id',
				ip_address = req.headers['x-forwarded-for'] || req.connection.remoteAddress
			}

			const data = JSON.stringify({
			  "accountId": account_id,
			  "connectionInformation": {
			    "customerIP": ip_address,
			    "userAgent": req.headers['user-agent'],
			    "forterTokenCookie": forter_token
			  },
			  "loginMethodType": "PASSWORD",
			  "loginStatus": "SUCCESS",
			  "eventTime": Date.now()
			})

			console.log("the data object being sent to Forter is:")

			console.dir(data)

			const config = {
			  auth: {
				username: process.env.FORTER_KEY
			  },
			  method: 'post',
			  url: process.env.FORTER_TENANT + '/v2/accounts/login/' + account_id,
			  headers: { 
			    'api-version': '2.36', 
			    'Content-Type': 'application/json'
			  },
			  data: data
			}

			axios(config)
			.then(function (response) {

			  	console.log(JSON.stringify(response.data))

			  	if (response.data.forterDecision == "VERIFICATION_REQUIRED") {
			  		// challenge the user with a 2nd factor

			  		// POST the result of the MFA challenge to the Forter Account Authentication Attempt API
			  		// https://portal.forter.com/app/developer/api/api/services-and-apis/account-authentication-api
			  	}

			  	res.json(response.data)

			})
			.catch(function (error) {
				console.dir(error)
				res.json({"error": "something went wrong with the request to Forter"})
			})
		}
	})
}

function credentials_are_correct(username, password) {
	return true
}
