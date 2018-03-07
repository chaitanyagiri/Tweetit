const Twit = require('twit')
const unique = require('unique-random-array')
const config = require('../config')
const isReply = require('../helpers/isReply')
const https = require('https');

const param = config.twitterConfig
const queryString = unique(param.queryString.split(','))

const bot = new Twit(config.twitterKeys)


const newsnmedia = () => {
  bot.get(
    'trends/place',
    {
      id: 1,
    },
    (err, data, response) => {
      if (err) {
        console.log('ERRORDERP: Cannot Search Trends!, Description here: ', err)
      } else {
            const rando1 = Math.floor(Math.random() * data[0].trends.length);
            let hashtag="";
            if(data[0].trends[rando1].name.charAt(0) == '#'){
                hashtag = data[0].trends[rando1].name.substr(1);
            }else{
                hashtag = data[0].trends[rando1].name;
            }
            try {
                const url = "https://newsapi.org/v2/everything?q="+hashtag+"&sortBy=publishedAt&apiKey="+param.newsKEY;
                console.log(hashtag);
                https.get(url, res => {
                    res.setEncoding("utf8");
                    let body = "",b;
                    res.on("data", dat => {
                    body += dat;
                    });
                    res.on("end", () => {
                        b = JSON.parse(body);
                        if(b.articles.length){
                            const rando = Math.floor(Math.random() * b.articles.length)
                            bot.post(
                                        'statuses/update',
                                        {
                                            status: "\""+b.articles[rando].title+"\"\n"+ b.articles[rando].url+"\n #"+hashtag
                                        },
                                        (err, response) => {
                                            if (err) {
                                            console.log('\nERROR while tweeting quote!:'+err)
                                            }
                                        }
                                )
                            console.log("\n***********NEWS OR MEDIA TWEETED***********");
                            console.log(b.articles[rando].title);
                        }
                        else{
                            console.log("\n***********NO NEWS OR MEDIA FOR THAT TREND FOUND***********");
                            console.log("\n "+hashtag );
                        }
                    });
                });
            }
            catch(err) {
                console.log("Most probably API expired see error:"+err.message);
            }
        }
    });
}

module.exports = newsnmedia
