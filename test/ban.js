import { PassThrough } from 'stream'
import { strictEqual } from 'assert'
import irc from 'slate-irc'
import twitch from '../src/twitch'

describe('Ban/Timeout moderation', function () {

  describe('ban', () => {

    it('sends a .ban privmsg to Twitch', done => {
      let stream = PassThrough()
      let client = irc(stream)
      client.use(twitch())

      stream.on('data', line => {
        strictEqual(line, 'PRIVMSG #channel :.ban annoying_user\r\n')
        done()
      })

      client.ban('#channel', 'annoying_user')
    })

  })

  describe('unban', () => {

    it('sends a .unban privmsg to Twitch', done => {
      let stream = PassThrough()
      let client = irc(stream)
      client.use(twitch())

      stream.on('data', line => {
        strictEqual(line, 'PRIVMSG #channel :.unban nice_user\r\n')
        done()
      })

      client.unban('#channel', 'nice_user')
    })
  })

  describe('timeout', () => {

    it('sends a .timeout privmsg to Twitch', done => {
      let stream = PassThrough()
      let client = irc(stream)
      client.use(twitch())

      stream.on('data', line => {
        strictEqual(line, 'PRIVMSG #channel :.timeout spammer\r\n')
        done()
      })

      client.timeout('#channel', 'spammer')
    })

  })

})