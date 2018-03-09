// listen on port so now.sh likes it
const { createServer } = require('http')

// bot features
// due to the Twitter ToS automation of likes
// is no longer allowed, so:
const Twit = require('twit')
const config = require('./config')
const consoleLol = require('console.lol')

const bot = new Twit(config.twitterKeys)

const retweet = require('./api/retweet')
const reply = require('./api/reply')
const favorite = require('./api/favorite')
const follow = require('./api/follow')
const quote = require('./api/quote')
const newsnmedia =  require('./api/newsandmedia')

console.rofl('Bot starting...')

// retweet on keywords
retweet()
setInterval(retweet, config.twitterConfig.retweet)
favorite()
setInterval(favorite, config.twitterConfig.like)
newsnmedia()
setInterval(newsnmedia, config.twitterConfig.retweet)
follow()
setInterval(follow, config.twitterConfig.followrate)
quote()
setInterval(quote, config.twitterConfig.quoterate)


// reply to new follower
const userStream = bot.stream('user')
userStream.on('follow', reply)

// This will allow the bot to run on now.sh
const server = createServer((req, res) => {
  res.writeHead(302, {
    Location: `https://twitter.com/${config.twitterConfig.username}`
  })
  res.end()
})

server.listen(process.env.PORT || 3000)
