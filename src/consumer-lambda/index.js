const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1', credentials: { accessKeyId: 'mock', secretAccessKey: 'mock' } });
const db = new AWS.DynamoDB({ apiVersion: '2012-08-10', endpoint: `http://${process.env.LOCALSTACK_HOSTNAME}:4566` });

const processRecord = async (record) => {
    const transaction = JSON.parse(Buffer.from(record.kinesis.data, 'base64').toString('utf8'));
    const dynamoItem = {
        TableName: 'transactions',
        Item: {
            'hash': { S: transaction.hash },
            'amount': { N: `${transaction.amount}` },
            'ts': { N: `${transaction.ts}` }
        }
    };

    try {
        await db.putItem(dynamoItem).promise();
    }
    catch (err) {
        console.error(`error persisting transaction ${transaction.hash}`, err);
    }
};

exports.handler = async function (event, context) {
    console.log('++++++++++++++++++++++  consumer-lambda called');
    // console.log(`consumer-lambda env: ${JSON.stringify(process.env, null, 2)}`);
    // console.log(`event: ${JSON.stringify(event, null, 2)}`);

    await Promise.all(event.Records.map(async (record) => {
        return await processRecord(record);
    }));

    return event.Records.length;
};