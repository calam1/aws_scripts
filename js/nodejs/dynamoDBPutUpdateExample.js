var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';

//just to test aws cli - dynamodb
var db = new AWS.DynamoDB();
db.listTables(function(err, data) {
  if (err) {
    console.log('there was an error', err);
  } else {
    console.log(data.TableNames);
  }
});





var docClient = new AWS.DynamoDB.DocumentClient();



// var payload = {
//   TableName: 'userProfile-development',
//   Item: {
//     id: '89d4d4a0-2b55-11e6-a3ca-9d434c6dad04',
//     favorites: [
//       'pizza',
//       'burgers',
//       'fries',
//     ]
//   }
// };

// docClient.put(payload, function(err, data) {
//   if (err) {
//     console.log('error', err);
//   } else {
//     console.log('response from put', data);
//   }
// });

// http://www.laylamandella.com/blog/


// var payload = {
//   TableName: 'userProfile-development',
//   Key: {
//       id: '89d4d4a0-2b55-11e6-a3ca-9d434c6dad04'
//   },
//   UpdateExpression:
//     'set allergens = :allergens',
//   ExpressionAttributeValues: {
//       ':allergens': allergens
//   }
// };




// add only works for number or set values
// var payload = {
//   TableName: 'userProfile-dev',
//   Key: {
//     "id": "us-east-1:85d22133-fd7a-4fce-a024-9f650232fc4d"
//   },
//   AttributeUpdates: {
//      "endTime": {
//        Action: 'ADD',
//        Value: 8 
//      }
//   }
// };

// var payload = {
//   TableName: 'userProfile-development',
//   Key: {
//     id: '89d4d4a0-2b55-11e6-a3ca-9d434c6dad04'
//   },
//   UpdateExpression: 'set allergens = :allergens',
//   ExpressionAttributeValues: {
//     ':allergens': allergens
//   }
// };

var foods = [
  'peanut',
  'seeds'
];

// var payload = {
//   TableName: 'userProfile-dev',
//   Key: {
//     id: "us-east-1:85d22133-fd7a-4fce-a024-9f650232fc4d"
//   },
//   UpdateExpression: 'SET #attrName = :attrValue',
//   ExpressionAttributeNames: {
//     '#attrName': 'foods'
//   },
//   ExpressionAttributeValues: {
//     ':attrValue': foods
//   }
// };


// docClient.update(payload, function(err, data) {
//   if (err) {
//     console.log('error', err);
//   } else {
//     console.log('response from put', data);
//   }
// });


var params = {
  'foods': [
    'pizza',
    'burgers'
  ],
  'allergenPOV': {
    'caregiver': true,
    'personal': false
  },
  "sex": 'male',
  "allergens": [
    "seeds",
    "milk",
    "peanuts"
  ]
}


var userId = "us-east-1:85d22133-fd7a-4fce-a024-9f650232fc4d";

for (var key in params) {
  console.log(key);
  var keyAttr = key;
  console.log(params[key]);
  var valAttr = params[key];

  var payload = {
    TableName: 'userProfile-dev',
    Key: {
      id: userId
    },
    UpdateExpression: 'SET #attrName = :attrValue',
    ExpressionAttributeNames: {
      '#attrName': keyAttr
    },
    ExpressionAttributeValues: {
      ':attrValue': valAttr
    }
  };

  docClient.update(payload, function(err, data) {
    if (err) {
      console.log('error', err);
    } else {
      console.log('response from put', data);
    }
  });
};