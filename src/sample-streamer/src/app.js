const { v4: uuid } = require('uuid');
const crypto = require('crypto');
const EventStreamer = require('./event-streamer');
const _eventStreamer = new EventStreamer();

_eventStreamer.startCollector();

const streamGenerator = () => {
  _eventStreamer.add([{
    hash: crypto.createHash('sha1').update(uuid()).digest('base64').replace(/\//g, '_').replace(/\+/g, '-').replace(/=/g, ''),
    amount: Math.floor(Math.random() * Math.floor(99)),
    ts: Date.now()
  }]);
};

setInterval(streamGenerator, 25);
