"use strict";

var AWS = require("aws-sdk");

var docClient = new AWS.DynamoDB.DocumentClient({
  region: "us-east-1"
});

var params = {
  Item: {
    key: "chriskey2",
    stringSet: docClient.createSet(["a", "b"]),
    numberSet: docClient.createSet([2, 3]),
    binarySet: docClient.createSet([new Buffer(6), new Uint8Array(5)])
  },
  TableName: "chrisdb"
};

docClient.put(params, function(err, data) {
  if (err) console.log(err);
  else console.log(data);
});