const AWS = require("aws-sdk");

const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });
const ivs = new AWS.IVS();

const records = [
  {
    messageId: "944a81f2-049a-41d2-b4b3-274d43c6f617",
    receiptHandle:
      "AQEBNUnM0Oee8IcR1Pnm3DJsp8N91VE74OKtaqBaEBLM4hGZ+XRs2UXKzaa/Ng0THc9qWV3X71nAyOrB4br0+IYWaNwJYW/dtH86XtYVgi9wTpyj4ijC2DeRk9GBNKRymyOPrQomPZ5wABP3ZjDlgobNUHi5rBsAPHQpJIFJraPX6Zoxmt2sqi+MO3LvDppdUd6Xh9IjhmeJefWIM77Fx7N0JKq4b0SvO9uizXcTBEYLHzoVLH+ouVFqc0efhS5zoCm4A19dvoFtTA7MYqyE42eIwgLzO69hTF4ud+WO/OHaiOW5wviesoc+B/rgEl09bdOb0P+eZLYQ5YZf9D4GoGkmLD4mNevhOSw3/8TH/zOZQnBm5co7dMKu2HYggJTuptg0XSeP8s5Nx2N3ArQTg0cfKzjU6DyXbAkTT2AidnPus++2wAKhfonE7xv8AafgDYVxt9ZXGBQNEmxvtS4/b1EvTg==",
    body: '{"version":"0","id":"40864d47-0ab8-1642-ef4f-a0d7822aa4ba","detail-type":"IVS Stream State Change","source":"aws.ivs","account":"605916927665","time":"2021-11-26T21:25:49Z","region":"eu-west-1","resources":["arn:aws:ivs:eu-west-1:605916927665:channel/qe0BGumaS4GT"],"detail":{"event_name":"Session Ended","channel_name":"94f27abe-095f-4dd3-8866-95aae07a903a","stream_id":"st-1DZlyH2nTvDCVgiupGkH0hp"}}',
    attributes: {
      ApproximateReceiveCount: "1",
      SentTimestamp: "1637961953111",
      SenderId:
        "AROAY2E3WS2YWCCCVWXXV:awscodestar-live-api-infrastructure-EventWorker-T4fb0jD8Uu0F",
      ApproximateFirstReceiveTimestamp: "1637962073111",
    },
    messageAttributes: {},
    md5OfBody: "e7d8fc6b679b7561d0cfb5d206f10df6",
    eventSource: "aws:sqs",
    eventSourceARN:
      "arn:aws:sqs:eu-west-1:605916927665:awscodestar-live-api-infrastructure-SessionEndQueue-120SPRB6S2YGV",
    awsRegion: "eu-west-1",
  },
];
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
  await Promise.all(
    endEvent.resources.map((arn) => ivs.deleteChannel({ arn }))
  );
};
