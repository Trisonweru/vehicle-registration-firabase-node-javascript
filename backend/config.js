"use strict";
const assert = require("assert");
require("dotenv").config();

const {
  PORT,
  API_KEY,
  AUTHDOMAIN,
  PROJECTID,
  STORAGEBUCKET,
  MESSAGESENDERID,
  APPID,
} = process.env;

assert(PORT, "PORT is required");

module.exports = {
  port: PORT,
  firebaseConfig: {
    apiKey: API_KEY,
    authDomain: AUTHDOMAIN,
    projectId: PROJECTID,
    storageBucket: STORAGEBUCKET,
    messagingSenderId: MESSAGESENDERID,
    appId: APPID,
  },
};
