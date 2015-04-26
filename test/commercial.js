import { PassThrough } from 'stream'
import { strictEqual } from 'assert'
import irc from 'slate-irc'
import twitch from '../src/twitch'

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
