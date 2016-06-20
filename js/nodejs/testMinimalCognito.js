var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';

//just to test aws cli - dynamodb
var db = new AWS.DynamoDB();
// db.listTables(function(err, data) {
//     if (err) {
//         console.log('there was an error', err); 
//     } else {
//         console.log(data.TableNames);
//     }
// });




/////////////////////////cognito identity stuff///////////////////////////

var cognitoidentity = new AWS.CognitoIdentity({
  apiVersion: '2014-06-30'
});

// getId - http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentity.html#getId-property
var params = {
  IdentityPoolId: 'us-east-1:633d5440-9196-45f7-839c-0c118877b380',
};

// Generates (or retrieves) a Cognito ID. Supplying multiple logins (attribute in params, you can pass in
// will create an implicit linked account.
// This is a public API. You do not need any credentials to call this API.
// cognitoidentity.getId(params, function(err, data) {
//     if (err) {
//         console.log('error', err);
//     } else {
//         console.log('cognito id:', data); 
//         // cognito id: { IdentityId: 'us-east-1:18c9c572-0d23-4784-a961-fe2022705734' }

//     }
// });

////////////////////////cognito credentials stuff////////////////////////
// note the identity pool id is from the identity pool created in cognito - the identity id
// is from the cognitoidentity.getId() - above function
// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//   IdentityPoolId: 'us-east-1:633d5440-9196-45f7-839c-0c118877b380',
//   IdentityId: 'us-east-1:18c9c572-0d23-4784-a961-fe2022705734'
// });

var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
  apiVersion: '2016-04-18'
});

// sign up - http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html#signUp-property
var params = {
  ClientId: '7civ431fec41bb280096co5vp8', //this is the app id in the user pool that was created in cognito
  Password: 'password',
  Username: 'clam2', //username cannot be same
  UserAttributes: [{
    Name: 'email',
    Value: 'calam_60187@yahoo.com'
      // Value: 'chrislam67@gmail.com'
  }],
};

// cognitoidentityserviceprovider.signUp(params, function(err, data) {
//    if (err) {
//        console.log('error', err);
//    } else {
//     //    console.log('sign up response', data); 
//        console.log('sign up response', data.user); 
//    }
// });

// confirm signup - http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html#confirmSignUp-property
// var params = {
//     ClientId: '7civ431fec41bb280096co5vp8',
//     Username: 'clam',
//     ConfirmationCode: '533612',//retrieved from email
//     ForceAliasCreation: false,
// }

// failure due to above account already confirmed the email
var params = {
  ClientId: '7civ431fec41bb280096co5vp8',
  Username: 'clam2',
  ConfirmationCode: '747845', //retrieved from email
  ForceAliasCreation: false, //if email exist will error out on confirmation, if true will transfer email to new account, for ppl who forgot they had a username, so now they can reset password
}

// cognitoidentityserviceprovider.confirmSignUp(params, function(err, data) {
//    if (err) {
//        console.log("error", err);
//    } else {
//        console.log(data); 
//    }
// });



var params = {
  IdentityId: 'us-east-1:18c9c572-0d23-4784-a961-fe2022705734',
}

// If you explicity call the getOpenIdToken, then you have to use the sts call to get assumerolewithwebidentity - so use cognitoidentity.getCredentialsForIdentity, which encapuslates these 2 method calls
// get token - http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentity.html#getOpenIdToken-property
// cognitoidentity.getOpenIdToken(params, function(err, resp) {
//     if (err) {
//         console.log('get open id err', err);
//     } else {
//         console.log('get open id resp', resp);
//     }
// });

//  since we do not have the logins data, we are unauthorized
var creds = new AWS.CognitoIdentityCredentials({
  IdentityId: 'us-east-1:18c9c572-0d23-4784-a961-fe2022705734',
});
AWS.config.credentials = creds;

var params = {
  IdentityId: 'us-east-1:18c9c572-0d23-4784-a961-fe2022705734',
};


// make sure the unauth and auth roles are created and set in the federated identity pool, otherwise you get this error - [InvalidIdentityPoolConfigurationException: Invalid identity pool configuration. Check assigned IAM roles for this pool.]
// since the params
// cognitoidentity.getCredentialsForIdentity(params, function(err, response) {
//   if (err) {
//     console.log('getCredentialsForIdentity error', err);
//   } else {
//     console.log('getCredentialsForIdentity success', response);
//     // console.log('session token', response.Credentials.SessionToken);

//     // you basically need to get the response data from above which contains the credentials and create a new credentials object
//     // NOTE don't create a new CognitoIdentityCredentials object, add the logins element to the original CognitoIdentityCredentials object
//     // TODO fix this
//     AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//       IdentityPoolId: 'us-east-1:633d5440-9196-45f7-839c-0c118877b380',
//       Logins: {
//         'cognito-idp.us-east-1.amazonaws.com/us-east-1_DLWkDQlGD': response.Credentials.SessionToken
//       }
//     });

//     var params = {
//       UserPoolId: 'us-east-1_DLWkDQlGD',
//     };

//     cognitoidentityserviceprovider.listUsers(params, function(err, data) {
//       if (err) console.log(err, err.stack); // an error occurred
//       else console.log(data); // successful response
//     });

//   }
// });



// PLAYGROUND
// var params = {
//   UserPoolId: 'us-east-1_DLWkDQlGD',
// };

// cognitoidentityserviceprovider.listUsers(params, function(err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else console.log(data); // successful response
// });




// get info about identity from identity pool - remember our constructors to define AWS.config.credentials
// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//     IdentityPoolId: 'us-east-1:0973810b-3979-489a-9a4b-971bd88ad554',
//     IdentityId: 'us-east-1:849a2614-b510-4a8c-9620-59b445375a08'
// });
// http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityCredentials.html
// AWS.config.credentials.get(function() {
//     var accessKeyId = AWS.config.credentials.accessKeyId;
//     var secretAccessKey = AWS.config.credentials.secretAccessKey;
//     var sessionToken = AWS.config.credentials.sessionToken;
//     var identityId = AWS.config.credentials.identityId;

//     console.log('access key id', accessKeyId);
//     console.log('secret access key', secretAccessKey);
//     console.log('session token', sessionToken);
//     console.log('identity id', identityId);

//    // console.log('all credentials', AWS.config.credentials);
// });

var params = {
  IdentityPoolId: 'us-east-1:18c9c572-0d23-4784-a961-fe2022705734'
};
// cognitoidentity.describeIdentityPool(params, function(err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else     console.log(data);           // successful response
// });





///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
// some dynamodb test stuff
var docClient = new AWS.DynamoDB.DocumentClient();

// try to insert just the hash key into dynamoDB
// var payload = {
//   TableName: 'userProfile-dev',
//   Item: {
//     id: 'us-east-1:849a2614-b510-4a8c-9620-59b445375a08',
//   }
// };

// docClient.put(payload, function(err, data) {
//   if (err) {
//     console.log('error', err);
//   } else {
//     console.log('response from put', data);
//   }
// });

var payload = {
  TableName: 'userProfile-dev',
  Item: {
    id: 'us-east-1:849a2614-b510-4a8c-9620-59b445375a08',
    allergens: [
      'peanuts',
      'milk',
      'seeds',
    ]
  }
};

//docClient.put(payload, function(err, data) {
//  if (err) {
//    console.log('error', err);
//  } else {
//    console.log('response from put', data);
//  }
//});