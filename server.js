const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
require('dotenv').config()

const app = express();
const client = twilio(process.env.ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN);


app.use(bodyParser.json());

app.post('/send-sms', (req, res) => {
    const { phoneNumber } = req.body;

    client.messages.create({
        body: "The shuttle bus is arriving in 5 mins.",
        to: phoneNumber,
        from: '+12166779814'
    }).then(() => {
        res.send('SMS sent successfully!');
    }).catch((err) => {
        console.error(err);
        res.status(500).send('Error sending SMS');
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
