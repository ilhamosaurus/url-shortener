require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI);

const Schema = mongoose.Schema;

const linkSchema = new Schema({
  address: { 
    type: String, 
    required: true 
  },
  list: Number
});

const Link = mongoose.model('links', linkSchema);

module.exports = Link;