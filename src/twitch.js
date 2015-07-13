import assign from 'object-assign'

export default function (opts = {}) {

  const match = opts.match || 'The moderators of this room are: '

  opts = assign({ membership: true }, opts)

  return function twitch(client) {
    client.on('data', message => {
      if (opts.tags?  (message.tags && message.tags['msg-id'] === 'room_mods')
         : /* else */ (message.command === 'NOTICE' && message.trailing.startsWith(match))) {
        client.moderators = message.trailing.slice(match.length).split(', ')
        client.emit('mods', client.moderators)
      }
    })

    assign(client, {
      twitchinit(fn) {
        this.twitchcap((e) => {
          if (e) fn(e)
          else   this.twitchclient(fn)
        })
      },
      twitchcap(fn) {
        this.write('CAP REQ :twitch.tv/commands' +
                     (opts.tags ? ' twitch.tv/tags' : '') +
                     (opts.membership ? ' twitch.tv/membership' : '')
                  , fn)
      },
      twitchclient(n, fn) {
        if (typeof n === 'function') [ fn, n ] = [ n, 4 ]
        else if (n === undefined)    n = 4
        this.write(`TWITCHCLIENT ${n}`, fn)
      },

      ban(channel, username, fn) {
        this.send(channel, `.ban ${username}`, fn)
      },
      unban(channel, username, fn) {
        this.send(channel, `.unban ${username}`, fn)
      },
      clear(channel, fn) {
        this.send(channel, `.clear`, fn)
      },
      color(channel, color, fn) {
        this.send(channel, `.color ${color}`, fn)
      },
      commercial(channel, seconds, fn) {
        this.send(channel, `.commercial ${seconds || 30}`, fn)
      },
      host(channel, target, fn) {
        this.send(channel, `.host ${target}`, fn)
      },
      unhost(channel, fn) {
        this.send(channel, `.unhost`, fn)
      },
      mod(channel, username, fn) {
        this.send(channel, `.mod ${username}`, fn)
      },
      unmod(channel, username, fn) {
        this.send(channel, `.unmod ${username}`, fn)
      },
      mods(channel, fn) {
        this.send(channel, `.mods`)
        if (fn) this.once('mods', mods => { fn(null, mods) })
      },
      r9kbeta(channel, fn) {
        this.send(channel, `.r9kbeta`, fn)
      },
      r9kbetaoff(channel, fn) {
        this.send(channel, `.r9kbetaoff`, fn)
      },
      slow(channel, fn) {
        this.send(channel, `.slow`, fn)
      },
      slowoff(channel, fn) {
        this.send(channel, `.slowoff`, fn)
      },
      subscribers(channel, fn) {
        this.send(channel, `.subscribers`, fn)
      },
      subscribersoff(channel, fn) {
        this.send(channel, `.subscribersoff`, fn)
      },
      timeout(channel, username, duration, fn) {
        // before 1.1.0, there was no `duration` parameter
        if (typeof duration === 'function') {
          fn = duration, duration = 600
        }
        else if (typeof duration === 'undefined') {
          duration = 600
        }
        this.send(channel, `.timeout ${username} ${duration}`, fn)
      }
    })

    if (opts.init) {
      client.on('motd', () => {
        client.twitchinit()
      })
    }
  }

}
