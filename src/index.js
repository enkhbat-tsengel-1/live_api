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

exports.getChannel = async function (event, context) {
  // const res = await ivs.getChannel({ arn: `arn:aws:ivs:us-west-2:123456789012:channel/${event.}` });
  return {
    statusCode: 200,
    body: JSON.stringify(event),
  };
};

exports.listStreams = async function (event, context) {
  const res = await ivs.listStreams({});
  return {
    statusCode: 200,
    body: JSON.stringify(res),
  };
};

exports.getStream = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify(event),
  };
};
