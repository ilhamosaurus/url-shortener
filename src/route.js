const express = require('express');
const router = express.Router();
const dns = require('dns');
const validUrl = require('valid-url');

router.get('/', (req, res) => {
  res.send('<h1>URL Shortener Microservice</h1>\n<main>\n<section>\n<form action="api/shorturl" method="POST">\n<fieldset>\n<legend>URL Shortener</legend>\n<label for="url_input">URL:</label>\n<input id="url_input" type="text" name="url" placeholder="https://github.com/ilhamosaurus" />\n<input type="submit" value="Shrink it!" />\n</fieldset>\n</form>\n</section>\n</main>');
})

module.exports = router;