const express = require('express');
const router = express.Router();
const dns = require('dns');
const validUrl = require('valid-url');
const Link = require('./db-config');

router.get('/', (req, res) => {
  res.send('<h1>URL Shortener Microservice</h1>\n<main>\n<section>\n<form action="api/shorturl" method="POST">\n<fieldset>\n<legend>URL Shortener</legend>\n<label for="url_input">URL:</label>\n<input id="url_input" type="text" name="url" placeholder="https://github.com/ilhamosaurus" />\n<input type="submit" value="Shrink it!" />\n</fieldset>\n</form>\n</section>\n</main>');
})

router.post('/shorturl', async (req, res) => {
  const url = req.body.url;

  try{
    console.log("Received URL:", url);

    if (!validUrl.isUri(url)) {
      throw "Invalid URL";
    }

    const link = await Link.findOne({ address: url }).exec();

    if (link) {
      return res.json({
        original_url: link.address,
        short_url: `http://localhost:3001/api/shorturl/${link.list}`
      });
    }

    const count = await Link.countDocuments();

    const newLink = new Link ({
      address: url,
      list: count + 1,
    });

    await newLink.save();

    return res.json({
      original_url: newLink.address,
      short_url: `http://localhost:3001/api/shorturl/${newLink.list}`,
    });
  }
  catch (err) {
    return res.json({
      err: err,
    });
  }
});

router.get('/shorturl/:short_url', async (req, res) => {
  const short_url = Number(req.params.short_url); // Use req.params instead of req.body

  try {
    console.log("Received shorturl:", short_url);
    
    const link = await Link.findOne({ list: short_url }).exec();

    if (!link) {
      return res.status(404).json({ error: 'Short URL not found' });
    }

    res.redirect(link.address);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;