import { PassThrough } from 'stream'
import { strictEqual } from 'assert'
import irc from 'slate-irc'
import twitch from '../src/twitch'

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