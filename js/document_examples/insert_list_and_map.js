"use strict";

var AWS = require("aws-sdk");

var docClient = new AWS.DynamoDB.DocumentClient({
  region: "us-east-1"
});

var params = {
  Item: {
    key: "chriskey3",
    boolAttr: true,
    listAttr: [2, "baz", true],
    mapAttr: {
      foo: "zoo"
    }
  },
  TableName: "chrisdb"
};

docClient.put(params, function(err, data) {
  if (err) console.log(err);
  else console.log(data);
});

