import express from 'express';
import AWS from 'aws-sdk';

const port = 3000;
const app = express();
const dynamoConfig = {
  	"region":"us-east-2",
    endpoint: "http://localhost:8000"
}

app.get('/', (req, res) =>
  res.send('Hello World!')
);

app.listen(port, () => {
  console.log('Node Environment: ' + process.env.NODE_ENV);
  console.log('Application listening on port: ' + port);
});

// TODO: move to a config file
export dynamodb = AWS.DynamoDB(dynamoConfig);
// need to connect the database to with...
// var DynamoDBStore = require('connect-dynamodb')({session: session});
