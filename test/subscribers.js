import { PassThrough } from 'stream'
import { strictEqual } from 'assert'
import irc from 'slate-irc'
import twitch from '../src/twitch'

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