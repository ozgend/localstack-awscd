const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1', credentials: { accessKeyId: 'mock', secretAccessKey: 'mock' } });
const db = new AWS.DynamoDB({ apiVersion: '2012-08-10', endpoint: `http://${process.env.LOCALSTACK_HOSTNAME}:4566` });

const queryTransaction = async (hash) => {
    const dynamoQuery = {
        TableName: 'transactions',
        Key: {
            'hash': { S: hash }
        }
    };

    const dynamoResult = await db.getItem(dynamoQuery).promise();

    if (dynamoResult.Item) {
        console.log(`hash found ${hash}`);
        console.log(JSON.stringify(dynamoResult));

        return {
            hash: dynamoResult.Item.hash.S,
            amount: dynamoResult.Item.amount.N,
            timestamp: dynamoResult.Item.timestamp.N
        };
    }
};

exports.handler = async function (event, context) {
    console.log('++++++++++++++++++++++  query-lambda called');
    // console.log(`query-lambda env: ${JSON.stringify(process.env, null, 2)}`);
    // console.log(`event: ${JSON.stringify(event, null, 2)}`);

    let response = {
        isBase64Encoded: false,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const hash = event.pathParameters.proxy;

    try {
        const transaction = await queryTransaction(hash);
        if (transaction) {
            response.statusCode = 200;
            response.body = JSON.stringify(transaction);
        }
        else {
            response.statusCode = 404;
            response.body = JSON.stringify({ hash, message: `transaction not found` });
        }
    }
    catch (err) {
        console.error('query-lambda error:', err);
        response.status = err.statusCode || 500;
        response.body = JSON.stringify({ code: err.code, message: err.message, hash });
    }

    return response;
};
