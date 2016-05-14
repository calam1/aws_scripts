"use strict";

var AWS = require("aws-sdk");

var docClient = new AWS.DynamoDB.DocumentClient({
  region: "us-east-1"
});

var params = {
    Key: {
      key: "chriskey"
    },
    TableName: "chrisdb"
};

docClient.get(params, function(err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});