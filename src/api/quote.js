const Twit = require('twit')
const unique = require('unique-random-array')
const config = require('../config')
const isReply = require('../helpers/isReply')
const https = require('https');

const param = config.twitterConfig
const uniquestr = unique(param.queryString.split(','))

const bot = new Twit(config.twitterKeys)

const quote = () => {
  const query = uniquestr()
  const postData={
      filter:'funny',
      type:'tag'
  }
  
  const url =
  "https://favqs.com/api/qotd";

https.get(url, res => {
  res.setEncoding("utf8");
  let body = "",b;
  res.on("data", data => {
    body += data;
  });
  res.on("end", () => {
    b = JSON.parse(body);
    bot.post(
                'statuses/update',
                {
                  status: "QUOTE OF THE DAY \n"+b.quote.body+" -"+ b.quote.author
                },
                (err, response) => {
                  if (err) {
                    console.log('ERROR while tweeting quote!:'+err)
                  }
                }
        )
    console.log("***********QUOTE TWEETED***********");
    console.log(b.quote.body);
  });
});
}

module.exports = quote
