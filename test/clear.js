const { PassThrough } = require('stream')
const { strictEqual } = require('assert')
const irc = require('slate-irc')
const twitch = require('../src/twitch')

describe('Clear chat', function () {

  describe('host', () => {

    it('sends a .clear privmsg to Twitch', done => {
      let stream = PassThrough()
      let client = irc(stream)
      client.use(twitch())

      stream.on('data', line => {
        strictEqual(line, 'PRIVMSG #channel :.clear\r\n')
        done()
      })

      client.clear('#channel')
    })

  })

})