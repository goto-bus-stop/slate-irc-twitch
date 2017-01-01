const { PassThrough } = require('stream')
const { strictEqual } = require('assert')
const irc = require('slate-irc')
const twitch = require('../src/twitch')

describe('User colour', function () {

  describe('color', () => {

    it('sends a .color privmsg to Twitch', done => {
      let stream = PassThrough()
      let client = irc(stream)
      client.use(twitch())

      stream.on('data', line => {
        strictEqual(line, 'PRIVMSG #channel :.color #ff00ff\r\n')
        done()
      })

      client.color('#channel', '#ff00ff')
    })

  })

})