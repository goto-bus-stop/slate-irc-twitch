slate-irc-twitch
================

Twitch commands plugin for [slate-irc](https://github.com/slate/slate-irc).

[![NPM](https://nodei.co/npm/slate-irc-twitch.png?compact=true)](https://nodei.co/npm/slate-irc-twitch)

## Usage

```javascript
const irc = require('slate-irc')
const twitch = require('slate-irc-twitch')

const client = irc(stream)
client.use(twitch({ init: true
                  , tags: false }))

client.ban('#my_stream', 'annoying_user')
```

## API

### twitch(opts={})

Returns a plugin for .use() with `slate-irc`. Options:

 * init: Whether to send the twitchs-related CAP messages and the TWITCHCLIENT message
   automatically. If true, you shouldn't call `twitchinit()` yourself. Defaults to false.
 * tags: Whether to ask for [tags](http://ircv3.net/specs/core/message-tags-3.2.html)
   in IRC messages. (Sends `CAP REQ :twitch.tv/tags`.) Defaults to false.
 * membership: Whether to ask for JOIN/LEAVE messages when users join or leave
   chat. (Sends `CAP REQ :twitch.tv/membership`.) Defaults to true.

### client.twitchinit()

Initialises Twitch-specific IRC functionality by sending a capability request and a
TWITCHCLIENT message.

### client.twitchcap()

Sends a capability request. Asks for `twitch.tv/commands` normally, and for
`twitch.tv/commands twitch.tv/tags` if the `tags` option is enabled.

### client.twitchclient(version=4)

Sends a TWITCHCLIENT message.

### client.mods(channel[, cb])

Gets the list of moderators on a channel. The callback takes `(error, mods)`, Node-style,
where `mods` is an array of moderator usernames.

### client.on('mods', cb)

Called when a moderators message is received, usually after a `.mods()` call.

### client.ban(channel, username)

Bans a user from the given channel.

### client.unban(channel, username)

Unbans a user from the given channel.

### client.clear(channel)

Clears the chat.

### client.color(channel, color)

Sets your user colour. `color` is a hex sextet, eg. "#FF00FF". Non-turbo users can only
choose from a specific set of colours.

### client.commercial(duration=30)

Starts a commercial on the stream. Duration can be 30, 60, 90, 120, 150 or 180.

### client.host(channel, target)

Start hosting an other channel.

### client.unhost(channel)

Stop hosting the other channel.

### client.mod(channel, user)

Give moderator status to a user.

### client.unmod(channel, user)

Remove moderator status from a user.

### client.r9kbeta(channel)

Enable R9K anti-spam in the chat.

### client.r9kbetaoff(channel)

Disable R9K anti-spam in the chat.

### client.slow(channel)

Enable slow mode.

### client.slowoff(channel)

Disable slow mode.

### client.subscribers(channel)

Enable subscriber-only mode.

### client.subscribersoff(channel)

Disable subscriber-only mode.

### client.timeout(channel, user, duration = 600)

Times out a user for `duration` seconds. This will stop them from chatting
for the given amount of seconds; 10 minutes by default.

## Licence

[MIT](./LICENSE)
