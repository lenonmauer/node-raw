require('dotenv').config();

const app = require('./core/http-server')(process.env);

app.setRouter(null).start();
