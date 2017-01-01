const assign = require('simple-assign')

module.exports = function (opts = {}) {
  const match = opts.match || 'The moderators of this room are: '

  opts = assign({ membership: true }, opts)

  return function twitch (client) {
    client.on('data', (message) => {
      if (opts.tags ? (message.tags && message.tags['msg-id'] === 'room_mods')
         : /* else */ (message.command === 'NOTICE' && message.trailing.startsWith(match))) {
        client.moderators = message.trailing.slice(match.length).split(', ')
        client.emit('mods', client.moderators)
      }
    })

    assign(client, {
      twitchinit (callback) {
        this.twitchcap((e) => {
          if (e) {
            callback(e)
          } else {
            this.twitchclient(callback)
          }
        })
      },
      twitchcap (callback) {
        this.write('CAP REQ :twitch.tv/commands' +
                     (opts.tags ? ' twitch.tv/tags' : '') +
                     (opts.membership ? ' twitch.tv/membership' : ''), callback)
      },
      twitchclient (n, callback) {
        if (typeof n === 'function') {
          [ callback, n ] = [ n, 4 ]
        } else if (n === undefined) {
          n = 4
        }
        this.write(`TWITCHCLIENT ${n}`, callback)
      },

      ban (channel, username, callback) {
        this.send(channel, `.ban ${username}`, callback)
      },
      unban (channel, username, callback) {
        this.send(channel, `.unban ${username}`, callback)
      },
      clear (channel, callback) {
        this.send(channel, `.clear`, callback)
      },
      color (channel, color, callback) {
        this.send(channel, `.color ${color}`, callback)
      },
      commercial (channel, seconds, callback) {
        this.send(channel, `.commercial ${seconds || 30}`, callback)
      },
      host (channel, target, callback) {
        this.send(channel, `.host ${target}`, callback)
      },
      unhost (channel, callback) {
        this.send(channel, `.unhost`, callback)
      },
      mod (channel, username, callback) {
        this.send(channel, `.mod ${username}`, callback)
      },
      unmod (channel, username, callback) {
        this.send(channel, `.unmod ${username}`, callback)
      },
      mods (channel, callback) {
        this.send(channel, `.mods`)
        if (callback) this.once('mods', mods => { callback(null, mods) })
      },
      r9kbeta (channel, callback) {
        this.send(channel, `.r9kbeta`, callback)
      },
      r9kbetaoff (channel, callback) {
        this.send(channel, `.r9kbetaoff`, callback)
      },
      slow (channel, callback) {
        this.send(channel, `.slow`, callback)
      },
      slowoff (channel, callback) {
        this.send(channel, `.slowoff`, callback)
      },
      subscribers (channel, callback) {
        this.send(channel, `.subscribers`, callback)
      },
      subscribersoff (channel, callback) {
        this.send(channel, `.subscribersoff`, callback)
      },
      timeout (channel, username, duration, callback) {
        // before 1.1.0, there was no `duration` parameter
        if (typeof duration === 'function') {
          [ callback, duration ] = [ duration, 600 ]
        } else if (typeof duration === 'undefined') {
          duration = 600
        }
        this.send(channel, `.timeout ${username} ${duration}`, callback)
      }
    })

    if (opts.init) {
      client.on('motd', () => {
        client.twitchinit()
      })
    }
  }
}
