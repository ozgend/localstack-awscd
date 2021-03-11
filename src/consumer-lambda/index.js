const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1', credentials: { accessKeyId: 'mock', secretAccessKey: 'mock' } });
const db = new AWS.DynamoDB({ apiVersion: '2012-08-10', endpoint: 'http://localhost:4566' });

exports.handler = async function (event, context) {
    // console.log('++++++++++++++++++++++  consumer-lambda called');
    // console.log(`event: ${JSON.stringify(event, null, 2)}`);

    const items = event.Records.map(record => {
        const transaction = Buffer.from(record.kinesis.data, 'base64').toString('ascii');
        return {
            TableName: 'transactions',
            Item: {
                'hash': { S: transaction.hash },
                'amount': { N: `${transaction.amount}` },
                'timestamp': { N: `${transaction.timestamp}` }
            }
        };
    });

    for (let i = 0; i < items.length; i++) {
        await db.putItem(items[i]).promise();
    }

    return `consumed ${items.length} items`;
};