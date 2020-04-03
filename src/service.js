const api = require('./api.js')
const VoiceResponse = require('twilio').twiml.VoiceResponse;

/* Global Variables */
const restaurantPhonenumber = '+14153416915'
const ngrokUrl = 'https://43e1eee9.ngrok.io'


/* Functions */
const main_menu = (req, res) => {
	console.log('In: service/main_menu')
    const twiml = new VoiceResponse()
    // Define the Gather Verb 
    const gather = twiml.gather({
		numDigits: '1',
		action: '/evaluateGather',
		method: 'POST',
		input: 'dtmf speech'
    });
    // User Action - Prompt User with Main Menu
    gather.say({
		voice: 'woman',
		language: 'en'
	}, 'Welcome to Little Louies BBQ. Press one start a conversation over text message. Press two to be connected to service agent.')

	res.send(twiml.toString())
}

const evaluate_gather = (req, res) => {
    console.log('In service/evaluate_gather')
    console.log(req.body)
    const twiml = new VoiceResponse()
    
    if(req.body.Digits == 1) {
        console.log('User Pressed ONE')
        twiml.say('Thanks for contacting Little Louies BBQ. And Agent will reach out shortly. Good Bye.')
        api.send_sms_message(req.body.From, req.body.To)
        twiml.hangup()
    } else if(req.body.Digits == 2) {
        console.log('User Pressed TWO')
        const dial = twiml.dial()
        // Add caller into a Conference or Queue
        dial.conference('littleLouiesBBQ') //Alternatively you could use <Queue> 
        // Dial the resturant
        api.make_outbound_call(restaurantPhonenumber, req.body.To, `${ngrokUrl}/joinConference`)
    } else {
        twiml.redirect('/mainMenu')
    }

    res.send(twiml.toString());
}

const join_conference = (req, res) => {
    console.log('In: service/join_conference')
    const twiml = new VoiceResponse()
    const dial = twiml.dial()
    dial.conference('littleLouiesBBQ')
    res.send(twiml.toString());
}


module.exports = {
    main_menu,
    evaluate_gather,
    join_conference,
}