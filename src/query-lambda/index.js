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
        return mapper(dynamoResult.Item);
    }
};

const scanTransactions = async () => {
    let transactions = [];

    let dynamoQuery = {
        Limit: 100,
        TableName: 'transactions'
    };

    let dynamoResult = await db.scan(dynamoQuery).promise();
    transactions.push(...dynamoResult.Items.map(mapper));
    console.log(`dynamoResult.LastEvaluatedKey: ${JSON.stringify(dynamoResult.LastEvaluatedKey)}`);

    while (dynamoResult.LastEvaluatedKey) {
        if (!dynamoResult.LastEvaluatedKey) {
            console.log('cursor completed.');
            break;
        }

        console.log(`scrolling... -> ${JSON.stringify(dynamoResult.LastEvaluatedKey)}`);
        dynamoQuery.ExclusiveStartKey = dynamoResult.LastEvaluatedKey;

        dynamoResult = await db.scan(dynamoQuery).promise();
        transactions.push(...dynamoResult.Items.map(mapper));
    }

    return transactions;
}

const mapper = (item) => {
    return {
        hash: item.hash.S,
        amount: item.amount.N,
        ts: item.ts.N
    };
}

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

    const hash = event.pathParameters.proxy || '';
    let result;

    try {
        if (hash === '') {
            result = await scanTransactions();
        }
        else {
            result = await queryTransaction(hash);
        }

        response.statusCode = result ? 200 : 404;
        response.body = result ? JSON.stringify(result) : JSON.stringify({ hash, message: `transaction not found` });
    }
    catch (err) {
        console.error('query-lambda error:', err);
        response.status = err.statusCode || 500;
        response.body = JSON.stringify({ code: err.code, message: err.message, hash });
    }

    return response;
};
