"use strict";

var AWS = require("aws-sdk");

var docClient = new AWS.DynamoDB.DocumentClient({
  region: "us-east-1"
});

// query key and return "AttributesToGet"
var params = {
  TableName: "chrisdb",
  KeyConditions: {
    key: {
      ComparisonOperator: "EQ",
      AttributeValueList: [
        "chriskey",
      ]
    }
  },
  AttributesToGet: [
    "mapAttr",
  ]
};
 
docClient.query(params, function(err, data) {
  if (err) {
    console.log(err);
  } else {
    // example of how to access attributes that are stored as a document
    // console.log(data.Items[0]["mapAttr"]["foo"]);
    // console.log(data.Items[0].mapAttr["foo"]);
    console.log(data.Items[0].mapAttr.foo);
  }
});