require('dotenv').config();

const express = require('express'),
{ json } = require('body-parser'),
session = require('express-session'),
{ getAllMessages, createMessage, history } = require('./messagesCtrl');

const app = express();

app.use(json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  let badWords = ["knucklehead", "jerk", "internet explorer"];
  if (req.body.message) {
    let badWordsExist = true;
    for (let i = 0; i < badWords.length; i++) {
      let regex = new RegExp(badWords[i], "g");
      req.body.message = req.body.message.replace(regex, "****");
    }
    next();
  } else {
    next();
  }
});

app.get('/api/messages', getAllMessages);
app.post('/api/messages', createMessage);
app.get('/api/messages/history', history);

const port = process.env.SERVER_PORT || 3005;
app.listen(port, () => console.log(`Server listening on port ${port}`));