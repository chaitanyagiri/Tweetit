const Twit = require('twit')
const unique = require('unique-random-array')
const config = require('../config')
const isReply = require('../helpers/isReply')

const param = config.twitterConfig
const followString = unique(param.followString.split(','))

const bot = new Twit(config.twitterKeys)

const follow = () => {
  const query = followString()

  bot.get(
    'users/search',
    {
      q: query,
      page:1,
      count: param.searchCount
    },
    (err, data, response) => {
      if (err) {
        console.log('ERROR: Cannot Search User to follow!, Description here: ', err)
      } else {
        // grab random tweet ID to retweet - desired range for random number is [0..data.statuses.length-1]
        const rando = Math.floor(Math.random() * data.length)
        let followUserID

        if (!isReply(data[rando])) {
            followUserId = data[rando].id_str
        }else {
          followUserId = data[rando].id_str;
        }

        bot.post(
          'friendships/create',
          {
            id: followUserId
          },
          (err, response) => {
            if (err) {
              console.log('ERROR while Following!')
            }
            console.log("***********FOLLOWED A PERSON***********");
            console.log(
              'SUCCESS: FOLLOWED: ',
              data[rando].name,
              'RANDO ID: ',
              rando
            )
          }
        )
      }
    }
  )
}

module.exports = follow
