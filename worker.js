const AWS = require("aws-sdk");

const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });
const ivs = new AWS.IVS();

exports.handleSessionEnd = async function (event, context) {
  await sqs
    .sendMessage({
      QueueUrl: process.env.QUEUE_URL,
      DelaySeconds: 120,
      MessageBody: JSON.stringify(event),
    })
    .promise();
  console.log(event);
};

exports.deleteChannel = async function (event, context) {
  console.log(event.Records);
  const endEvent = JSON.parse(event.Records[0].body);
  try {
    const result = await Promise.all(
      endEvent.resources.map((arn) => ivs.deleteChannel({ arn }))
    );
    console.info(result);
  } catch (error) {
    throw error;
  }
};
