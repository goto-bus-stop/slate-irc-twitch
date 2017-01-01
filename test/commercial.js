const { PassThrough } = require('stream')
const { strictEqual } = require('assert')
const irc = require('slate-irc')
const twitch = require('../src/twitch')

describe('Commercials', function () {

  describe('commercial', () => {

    it('sends a .commercial privmsg to Twitch', done => {
      let stream = PassThrough()
      let client = irc(stream)
      client.use(twitch())

      stream.on('data', line => {
        strictEqual(line, 'PRIVMSG #channel :.commercial 60\r\n')
        done()
      })

      client.commercial('#channel', 60)
    })

    it('defaults to a 30 second commercial', done => {
      let stream = PassThrough()
      let client = irc(stream)
      client.use(twitch())

      stream.on('data', line => {
        strictEqual(line, 'PRIVMSG #channel :.commercial 30\r\n')
        done()
      })

      client.commercial('#channel')
    })

  })

})
