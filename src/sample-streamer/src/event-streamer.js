const AWS = require('aws-sdk');
const _period = 250;
const _stream = 'transaction-stream';
const _queue = [];

class EventStreamer {
  constructor() {
    this._kinesis = new AWS.Kinesis({ region: 'us-east-1', endpoint: 'http://localhost:4566' });
  }

  add(items) {
    _queue.push(...items);
  }

  startCollector() {
    setInterval(this._queueCollector, _period, this._kinesis);
  }

  _queueCollector(kinesis) {
    if (_queue.length === 0) {
      return;
    }

    const items = _queue.splice(0, 100);

    const records = items.map(item => {
      return {
        Data: JSON.stringify(item),
        PartitionKey: `p_${item.timestamp}`
      };
    });

    const recordsParams = {
      Records: records,
      StreamName: _stream
    };

    kinesis.putRecords(recordsParams, (err, data) => {
      if (err) {
        console.info(`kinesis error: ${err}`);
      }
      else {
        console.info(`>> streamed ${records.length} events | [${items[0].hash}]`);
      }
    });
  }
};

module.exports = EventStreamer;
