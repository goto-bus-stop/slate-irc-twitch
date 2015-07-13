import { PassThrough } from 'stream'
import { strictEqual, deepEqual } from 'assert'
import irc from 'slate-irc'
import twitch from '../src/twitch'

describe('Moderators', function () {

  describe('mod', () => {

    it('sends a .mod privmsg to Twitch', done => {
      let stream = PassThrough()
      let client = irc(stream)
      client.use(twitch())

      stream.on('data', line => {
        strictEqual(line, 'PRIVMSG #channel :.mod helpful_user\r\n')
        done()
      })

      client.mod('#channel', 'helpful_user')
    })

  })

  describe('unmod', () => {

    it('sends a .unmod privmsg to Twitch', done => {
      let stream = PassThrough()
      let client = irc(stream)
      client.use(twitch())

      stream.on('data', line => {
        strictEqual(line, 'PRIVMSG #channel :.unmod awol_mod\r\n')
        done()
      })

      client.unmod('#channel', 'awol_mod')
    })
  })

  describe('mods', () => {

    it('sends a .mods privmsg to Twitch', done => {
      let stream = PassThrough()
      let client = irc(stream)
      client.use(twitch())

      stream.on('data', line => {
        strictEqual(line, 'PRIVMSG #channel :.mods\r\n')
        done()
      })

      client.mods('#channel')
    })

    it('emits a "mods" event when Twitch replies', done => {
      let stream = PassThrough()
      let client = irc(stream)
      client.use(twitch({ tags: false }))

      client.on('mods', mods => {
        deepEqual(mods, [ 'me', 'myself', 'i' ])
        done()
      })

      stream.on('data', line => {
        if (line === 'PRIVMSG #channel :.mods\r\n') {
          stream.write(':tmi.twitch.tv NOTICE #channel ' +
                       ':The moderators of this room are: me, myself, i\r\n')
        }
      })

      client.mods('#channel')

    })

  })

})