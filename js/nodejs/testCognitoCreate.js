var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';

var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
  apiVersion: '2016-04-18'
});

// CREATE USER POOL PARAMS
var params = {
  PoolName: 'testUserPool',
  AliasAttributes: [
    'email',
  ],
  AutoVerifiedAttributes: [
    'email',
  ],
  EmailVerificationMessage: 'Thanks for validating via email!Your verification code is {####}.',
  EmailVerificationSubject: 'email subject',
  Policies: {
    PasswordPolicy: {
      MinimumLength: 6,
      RequireLowercase: false,
      RequireNumbers: false,
      RequireSymbols: false,
      RequireUppercase: false
    }
  },
};

// CREATE USER POOL 
cognitoidentityserviceprovider.createUserPool(params, function(err, data) {
  if (err) {
    console.log(err, err.stack);
  } else {
    console.log(data);
    var userPoolId = data.UserPool.Id;
    var userPoolName = data.UserPool.Name;
    console.log('pool id is:', userPoolId);

    // CREATE POOL CLIENT / APP PARAMS
    var params = {
      ClientName: 'iOS',
      UserPoolId: userPoolId,
      GenerateSecret: false
    };
    
    // CREATE POOL CLIENT / APP
    cognitoidentityserviceprovider.createUserPoolClient(params, function(err, data) {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log(data);
        var clientId = data.UserPoolClient.ClientId;
        var poolUserId = data.UserPoolClient.UserPoolId;

        // CREATE IDENTITY POOL PARAMS
        var params = {
          AllowUnauthenticatedIdentities: true,
          IdentityPoolName: userPoolName + 'IdentityPool',
          CognitoIdentityProviders: [{
            ClientId: clientId,
            ProviderName: 'cognito-idp.us-east-1.amazonaws.com/' + poolUserId,
          }, ],
        };
        
        // CREATE IDENTITY POOL PARAMS
        var cognitoidentity = new AWS.CognitoIdentity({
          apiVersion: '2014-06-30'
        });

        cognitoidentity.createIdentityPool(params, function(err, data) {
          if (err) console.log(err, err.stack);
          else     console.log(data);
        });
      }
    });
  }
});