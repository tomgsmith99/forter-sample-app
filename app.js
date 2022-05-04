require('dotenv').config()

const express = require('express')

/*************************************************/

const app = express()

app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use(express.static('public'))

/*************************************************/

const port = process.env.PORT || 3000

app.listen(port, () => {
	console.log(`app listening at http://localhost:${port}`)
})

/*************************************************/

require('./routes/login')(app)

/*************************************************/

app.get('/favicon.ico', (req, res) => {
	res.sendStatus(200)
	return
})

app.get('/', (req, res) => {
	config.home = true
	res.render ('index.html', config)
})
