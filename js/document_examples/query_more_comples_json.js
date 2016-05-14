"use strict"

var AWS = require("aws-sdk");

var docClient = new AWS.DynamoDB.DocumentClient({
    region: "us-east-1"
});

var params = {
    TableName: "chrisdb",
    KeyConditions: {
        key: {
            ComparisonOperator: "EQ",
            AttributeValueList: [
                "ad5b4e63-8e20-4881-4444-d823dafbdba0"
            ]
        }
    }
};

docClient.query(params, function(err, data) {
    if (err) {
        console.log(err);
    } else {
        // console.log(data);
        console.log(data.Items[0].profile.epipen.epipen);

    }
})