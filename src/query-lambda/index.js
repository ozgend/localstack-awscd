const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1', credentials: { accessKeyId: 'mock', secretAccessKey: 'mock' } });
const db = new AWS.DynamoDB({ apiVersion: '2012-08-10', endpoint: 'http://localhost:4566' });


const findTransaction = async (hash) => {
    var param = {
        TableName: 'transactions',
        Key: {
            'hash': { S: hash }
        },
        ProjectionExpression: 'ATTRIBUTE_NAME'
    };

    try {
        const transaction = await db.getItem(param).promise();
        console.log(`hash found ${hash}`, err);
        return transaction.Item;
    }
    catch (err) {
        console.log(`hash not found ${hash}`, err);
        return { hash };
    }
};

const okResponse = (result) => {
    const response = {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json'
        },
        isBase64Encoded: false,
        body: JSON.stringify(result, null, 2)
    }
    return response;
};

const errorResponse = (err) => {
    var response = {
        statusCode: error.statusCode,
        headers: {
            'Content-Type': 'text/plain',
            'x-amzn-ErrorType': error.code
        },
        isBase64Encoded: false,
        body: `[${error.code}] ${error.message}`
    }
    return response
};

exports.handler = async function (event, context) {
    console.log(`query-lambda: $LOCALSTACK_HOSTNAME: ${process.env.LOCALSTACK_HOSTNAME}`);

    // console.log('>  query-lambda called');
    // console.log(`event: ${JSON.stringify(event, null, 2)}`);
    try {
        const item = await findTransaction(event.pathParameters.proxy);
        return okResponse(item);
    }
    catch (err) {
        console.log('query-lambda error:');
        console.error(err);
        return errorResponse(err);
    }
};
