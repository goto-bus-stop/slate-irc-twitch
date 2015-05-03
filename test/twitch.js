import { PassThrough } from 'stream'
import { strictEqual } from 'assert'
import irc from 'slate-irc'
import twitch from '../src/twitch'

describe('Basic Twitch IRC features', function () {

  describe('connecting', () => {

    it('sends a CAP REQ for commands and a TWITCHCLIENT message', done => {
      let stream = PassThrough()
      let client = irc(stream)
      client.use(twitch({ init: true }))

      stream.once('data', line => {
        strictEqual(line, 'CAP REQ :twitch.tv/commands\r\n')
        stream.once('data', line => {
          strictEqual(line, 'TWITCHCLIENT 4\r\n')
          done()
        })
      })

      client.emit('motd')
    })

    it('sends a CAP REQ for tags if needed', done => {
      let stream = PassThrough()
      let client = irc(stream)
      client.use(twitch({ init: true, tags: true }))

      stream.once('data', line => {
        strictEqual(line, 'CAP REQ :twitch.tv/commands twitch.tv/tags\r\n')
        done()
      })
      client.emit('motd')
    })

  })

})
