import { PassThrough } from 'stream'
import { strictEqual } from 'assert'
import irc from 'slate-irc'
import twitch from '../src/twitch'

describe('ROBOT9000 Anti-spam', function () {

  describe('r9kbeta', () => {

    it('sends a .r9kbeta privmsg to Twitch', done => {
      let stream = PassThrough()
      let client = irc(stream)
      client.use(twitch())

      stream.on('data', line => {
        strictEqual(line, 'PRIVMSG #channel :.r9kbeta\r\n')
        done()
      })

      client.r9kbeta('#channel')
    })

  })

  describe('r9kbetaoff', () => {

    it('sends a .r9kbetaoff privmsg to Twitch', done => {
      let stream = PassThrough()
      let client = irc(stream)
      client.use(twitch())

      stream.on('data', line => {
        strictEqual(line, 'PRIVMSG #channel :.r9kbetaoff\r\n')
        done()
      })

      client.r9kbetaoff('#channel')
    })

  })

})