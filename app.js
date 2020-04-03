require('dotenv').config()
const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser') //Used to parse requests so you can use its info
const app = express()
const routes = require("./src/service.js")

const PORT = 3001

/* Middleware */
app.use(bodyParser.urlencoded({ extended: false}));// Thus lets express know to use static files
app.use('/', express.static('./'))


/* Routes */
app.post('/mainMenu', routes.main_menu)
app.post('/evaluateGather', routes.evaluate_gather)
app.post('/joinConference', routes.join_conference)



/* Server */
app.listen(PORT, function() {
	console.log(`IVR_workflow RUNNING ON PORT ${PORT}`)
})