const twilio = require('twilio')
const client = new twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN) 


/* API Function */

// Send an outbound SMS
const send_sms_message = (to, from) => {
    console.log('In: api/sendSmsMessage')
    return client.messages.create({
		body: `Welcome to Little Louies BBQ, what can I help you with?`,
		to: to,
		from: from,
    })
    .then(message => console.log(message.sid));
}


// Make an outbound call
const make_outbound_call = (to, from, url) => {
	console.log('In: api/make_outbound_call')
	return client.calls
		.create({
			from: from,
			to: to,
			url: `${url}`,
        })
        .then(call => console.log(call.sid))
}





module.exports = {
    send_sms_message,
    make_outbound_call,
}

