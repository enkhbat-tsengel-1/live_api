const AWS = require("aws-sdk");

const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

exports.handleSessionEnd = async function (event, context) {
  await sqs
    .sendMessage({
      QueueUrl: process.env.QUEUE_URL,
      DelaySeconds: 120,
      MessageBody: JSON.stringify(event.Records[0]),
    })
    .promise();
  console.log(event);
};

exports.deleteChannel = async function (event, context) {
  console.log(event);
};
