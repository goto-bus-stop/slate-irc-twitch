import { PassThrough } from 'stream'
import { strictEqual } from 'assert'
import irc from 'slate-irc'
import twitch from '../src/twitch'

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