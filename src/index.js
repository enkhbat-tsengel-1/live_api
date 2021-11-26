const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

const ivs = new AWS.IVS();

exports.createChannel = async function (event, context) {
  const res = await ivs.createChannel({ name: uuidv4() });
  return {
    statusCode: 200,
    body: JSON.stringify(res),
  };
};

exports.listStreams = async function (event, context) {
  const res = await ivs.listStreams({});
  return {
    statusCode: 200,
    body: JSON.stringify(res),
  };
};

exports.getChannel = async function (event, context) {
  const res = await ivs.getChannel({ arn: event.arn });
  return {
    statusCode: 200,
    body: JSON.stringify(res),
  };
};
