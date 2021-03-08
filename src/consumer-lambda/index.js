exports.handler = async function (event, context) {
    console.log('>  consumer-lambda called');
    console.log(`event: ${JSON.stringify(event, null, 2)}`);
    return 'consumer-lambda';
};