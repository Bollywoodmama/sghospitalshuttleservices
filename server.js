
// Imports the required Express (used to create a web server and define routes for handling HTTP requests.), body-parser (middleware for Express that parses incoming request bodies) and twilio libraries
const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

//Require the .env file,  where the twilio credentials, which are sensitive, are stored. This loads the environment variable folder
require('dotenv').config()
const app = express();
const client = twilio(process.env.ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN);

//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// to define a route handler for POST requests to the specified path. This is the URL path that this route will handle. When a POST request is made to this path, the provided callback function will be executed.
app.post('/send-sms', (req, res) => {
    const phoneNumber = req.body.mobile;

    // Generate a random number between 1 and 20
    const minutes = Math.floor(Math.random() * 20) + 1;

    // A method provided by the Twilio client library to create and send an SMS message.
    client.messages.create({

        // Converts the minutes integer to a string. This ensures that the number is correctly concatenated with the other string parts.
        body: 'The shuttle bus is arriving in ' + minutes.toString() + ' mins.',
        to: "+65"+ phoneNumber,
        from: '+12166779814',

        // Sends response to client when SMS was successfully sent 
    }).then(() => {
        res.send('SMS sent successfully!');
    }).catch((err) => {
        console.error(err);
        res.status(500).send('Error sending SMS');
    });
});

// This function call tells the Express application and the port on which the server will listen for incoming HTTP requests. It signifies the point where the server is fully configured and ready to start handling incoming HTTP requests.
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
