const Twit = require('twit')
const unique = require('unique-random-array')
const config = require('../config')
const isReply = require('../helpers/isReply')
const sentiment = require('sentiment');

const param = config.twitterConfig
const queryString = unique(param.queryString.split(','))

const bot = new Twit(config.twitterKeys)

const retweet = () => {
  const query = queryString()

  bot.get(
    'search/tweets',
    {
      q: query,
      result_type: param.resultType,
      lang: param.language,
      filter: 'safe',
      count: param.searchCount
    },
    (err, data, response) => {
      if (err) {
        console.log('ERRORDERP: Cannot Search Tweet!, Description here: ', err)
      } else {
        // grab random tweet ID to retweet - desired range for random number is [0..data.statuses.length-1]
        const rando = Math.floor(Math.random() * data.statuses.length)
        let retweetId

        if (!isReply(data.statuses[rando])) {
          retweetId = data.statuses[rando].id_str;
        } else {
          retweetId = data.statuses[rando].id_str;
        }
        
        let senti = sentiment(data.statuses[rando].text).score;
        console.log("**************** THIS IS SENTIMENT SCORE:"+senti+"*********************")
        //Including neutral score i.e, 0
        if(senti>-1){
          bot.post(
            'statuses/update',
            {
              status: "Great!",
              in_reply_to_status_id : retweetId,
              auto_populate_reply_metadata:true
            },
            (err, response) => {
              if (err) {
                console.log('ERROR while Replying!')
              }
              console.log("***********REPLIED TO A TWEET***********");
              console.log(
                'SUCCESS: RT: ',
                data.statuses[rando].text,
                'RANDO ID: ',
                rando
              )
            }
          )
        }else{;}

        bot.post(
          'statuses/retweet/:id',
          {
            id: retweetId
          },
          (err, response) => {
            if (err) {
              console.log('ERROR while Retweet!')
            }
            console.log("***********RETWEETED***********");
            console.log(
              'SUCCESS: RT: ',
              data.statuses[rando].text,
              'RANDO ID: ',
              rando
            )
          }
        )
      }
    }
  )
}

module.exports = retweet
