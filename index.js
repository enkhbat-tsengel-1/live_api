const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

const ivs = new AWS.IVS();

const REGION = "eu-west-1";

exports.createChannel = async function (event, context) {
  const res = await ivs.createChannel({ name: uuidv4() }).promise();
  return {
    statusCode: 200,
    body: JSON.stringify(res),
  };
};

exports.getChannel = async function (event, context) {
  const accountId = getAccountId(context);
  const res = await ivs
    .getChannel({
      arn: `arn:aws:ivs:${REGION}:${accountId}:channel/${event.pathParameters.id}`,
    })
    .promise();
  return {
    statusCode: 200,
    body: JSON.stringify(res),
  };
};

exports.listStreams = async function (event, context) {
  const res = await ivs.listStreams({}).promise();
  return {
    statusCode: 200,
    body: JSON.stringify(res),
  };
};

exports.getStream = async function (event, context) {
  const accountId = getAccountId(context);
  const res = await ivs
    .getStream({
      channelArn: `arn:aws:ivs:${REGION}:${accountId}:channel/${event.pathParameters.id}`,
    })
    .promise();
  return {
    statusCode: 200,
    body: JSON.stringify(res),
  };
};

function getAccountId(context) {
  return context.invokedFunctionArn.split(":")[4];
}
