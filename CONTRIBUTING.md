## Contributing

You can help out by:

- Solving existing [issues](https://github.com/chaitanyagiri/tweetit/labels/bug).
- Enhancing the bot adding more functionality [(see issues)](https://github.com/chaitanyagiri/tweetit/labels/enhancement)
- Pointing out bugs/errors.

For above option(s), please create an issue so it can be addressed. New to GitHub issues? They have a pretty handy guide you can use to familiarize yourself with them.

## If you can make a change

What you will need:

- Your _own_ Twitter [account](https://twitter.com/signup) for testing
- API Keys for Twitter.
  - Get your Twitter API keys [here](https://apps.twitter.com/app/new).
- [Fork](https://github.com/chaitanyagiri/tweetit) the repository.
- Add API keys to `.env` file, your `.env` file should look something like this:

```shell
CONSUMER_KEY=xxxxxxxxxxxxxxxxxxxxdMhxg
CONSUMER_SECRET=xxxxxxxxxxxxxxxxxxxxkFNNj1H107PFv1mvWwEM6CZH0fjymV
ACCESS_TOKEN=xxxxxxxxx-xxxxxxxxxxxxxxxxxxxxecKpi90bFhdsGG2N7iII
ACCESS_TOKEN_SECRET=xxxxxxxxxxxxxxxxxxxxZAU8wNKAPU8Qz2c0PhOo43cGO
QUERY_STRING=#someTestHashTag
RESULT_TYPE=mixed
LANG=en
FOLLOW_INTERESTS=Computer Science Engineering, Developer, Designer, NodeJS, React, MongoDB, LNMIIT

RESULT_TYPE=mixed
TWITTER_LANG=en

TWITTER_USERNAME=chaitanyagiri
TWITTER_RETWEET_RATE=10
TWITTER_SEARCH_COUNT=20
TWITTER_LIKE_RATE=5
TWITTER_FOLLOW_RATE=60
TWITTER_QUOTE_RATE=43200

```

- Make your suggested change.
- Make sure the code style looks similar to the existing code.
- Create a pull request.
