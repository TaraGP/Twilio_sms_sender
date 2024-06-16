//backend/server.js
import express from 'express';
import pkg from 'body-parser';
import twilio from 'twilio';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const port = 3000;
const { urlencoded, json } = pkg;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/send-sms', (req, res) => {
  const to = req.body.to;
  const messageBody = req.body.message;

  client.messages
    .create({
      body: messageBody,
      from: twilioPhoneNumber,
      //if mms message needs to be sent then use the below  line.
     // mediaUrl: ['https://raw.githubusercontent.com/dianephan/flask_upload_photos/main/UPLOADS/DRAW_THE_OWL_MEME.png'],
      to: to
    })
    .then(message => {
      console.log(message.sid);
      res.send(`Message sent to ${to}`);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Failed to send sms message');
    });
});

app.post('/send-whatsapp', (req, res) => {
  const to = req.body.to;
  const messageBody = req.body.message;
  console.log("Twilio phone number:",twilioPhoneNumber);

  client.messages
    .create({
      body: messageBody,
      from: `whatsapp:${twilioPhoneNumber}` ,
      //if mms message needs to be sent then use the below  line.
     // mediaUrl: ['https://raw.githubusercontent.com/dianephan/flask_upload_photos/main/UPLOADS/DRAW_THE_OWL_MEME.png'],
      to: `whatsapp:${to}`
    })
    .then(message => {
      console.log(message.sid);
      res.send(`whatsapp Message sent to ${to}`);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send(`Failed to send whatsapp message`);
    });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
