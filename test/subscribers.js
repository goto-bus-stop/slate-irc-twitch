/* global describe, it */
const { PassThrough } = require('stream')
const { strictEqual } = require('assert')
const irc = require('slate-irc')
const twitch = require('../src/twitch')

describe('Slow Mode', function () {
  describe('subscribers', () => {
    it('sends a .subscribers privmsg to Twitch', done => {
      let stream = PassThrough()
      let client = irc(stream)
      client.use(twitch())

      stream.on('data', line => {
        strictEqual(line, 'PRIVMSG #channel :.subscribers\r\n')
        done()
      })

      client.subscribers('#channel')
    })
  })

  describe('subscribersoff', () => {
    it('sends a .subscribersoff privmsg to Twitch', done => {
      let stream = PassThrough()
      let client = irc(stream)
      client.use(twitch())

      stream.on('data', line => {
        strictEqual(line, 'PRIVMSG #channel :.subscribersoff\r\n')
        done()
      })

      client.subscribersoff('#channel')
    })
  })
})
