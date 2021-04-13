const { v4: uuid } = require('uuid');
const crypto = require('crypto');
const Streamer = require('./event-producer');
const _streamer = new Streamer();

_streamer.startCollector();

const produceEvents = () => {
  _streamer.add([{
    hash: crypto.createHash('sha1').update(uuid()).digest('base64').replace(/\//g, '_').replace(/\+/g, '-').replace(/=/g, ''),
    amount: Math.floor(Math.random() * Math.floor(99)),
    ts: Date.now()
  }]);
};

setInterval(produceEvents, 25);
