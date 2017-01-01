const { PassThrough } = require('stream')
const { strictEqual } = require('assert')
const irc = require('slate-irc')
const twitch = require('../src/twitch')

describe('Slow Mode', function () {

  describe('slow', () => {

    it('sends a .slow privmsg to Twitch', done => {
      let stream = PassThrough()
      let client = irc(stream)
      client.use(twitch())

      stream.on('data', line => {
        strictEqual(line, 'PRIVMSG #channel :.slow\r\n')
        done()
      })

      client.slow('#channel')
    })

  })

  describe('slowoff', () => {

    it('sends a .slowoff privmsg to Twitch', done => {
      let stream = PassThrough()
      let client = irc(stream)
      client.use(twitch())

      stream.on('data', line => {
        strictEqual(line, 'PRIVMSG #channel :.slowoff\r\n')
        done()
      })

      client.slowoff('#channel')
    })

  })

})