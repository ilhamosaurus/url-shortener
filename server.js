const express = require('express');
const app = express();
require('dotenv').config()
const cors = require('cors');
const router = require('./src/route');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', router);

const server = app.listen(process.env.PORT || 3100, () => {
  console.log(`Server running on port ${server.address().port}`);
});