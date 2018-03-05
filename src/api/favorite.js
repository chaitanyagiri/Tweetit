const Twit = require('twit')
const unique = require('unique-random-array')
const config = require('../config')
const isReply = require('../helpers/isReply')

const param = config.twitterConfig
const queryString = unique(param.queryString.split(','))

const bot = new Twit(config.twitterKeys)

const favorite = () => {
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
          retweetId = data.statuses[rando].id_str
        }else{
          retweetId = data.statuses[rando].id_str
        }

        bot.post('favorites/create', {
          id: retweetId
        }, (err, data, response) => {
          if (err) {
            console.log(err)
          } else {
            console.log("***********LIKED A TWEET***********");
            console.log(`${data.text} `)
          }
        })
      }
    }
  )
}

module.exports = favorite
