/* global describe, it */
const { PassThrough } = require('stream')
const { strictEqual } = require('assert')
const irc = require('slate-irc')
const twitch = require('../src/twitch')

describe('Stream hosting', function () {
  describe('host', () => {
    it('sends a .host privmsg to Twitch', done => {
      let stream = PassThrough()
      let client = irc(stream)
      client.use(twitch())

      stream.on('data', line => {
        strictEqual(line, 'PRIVMSG #channel :.host channel_2\r\n')
        done()
      })

      client.host('#channel', 'channel_2')
    })
  })

  describe('unhost', () => {
    it('sends a .unhost privmsg to Twitch', done => {
      let stream = PassThrough()
      let client = irc(stream)
      client.use(twitch())

      stream.on('data', line => {
        strictEqual(line, 'PRIVMSG #channel :.unhost\r\n')
        done()
      })

      client.unhost('#channel')
    })
  })
})
