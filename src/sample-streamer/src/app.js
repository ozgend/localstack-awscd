const { v4: uuid } = require('uuid');
const EventStreamer = require('./event-streamer');
const _eventStreamer = new EventStreamer();

_eventStreamer.startCollector();

const streamGenerator = () => {
  _eventStreamer.add([{
    hash: uuid(),
    amount: Math.floor(Math.random() * Math.floor(99)),
    timestamp: Date.now()
  }]);
};

setInterval(streamGenerator, 13);
