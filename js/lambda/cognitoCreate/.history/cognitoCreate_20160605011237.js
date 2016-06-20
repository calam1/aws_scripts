module.exports.handler = function(event, context) {
  console.log('Received event:', JSON.stringify(event, null, 2));
  console.log('Context:', JSON.stringify(context, null, 2));

  buildCognitoUserAndIdentityPools(event, function (err, result) {
    var status = err ? 'FAILED' : 'SUCCESS'
      return sendResponse(event, context, status, result, err);
  });
}

function sendResponse(event, context, status, data, err) {
  var responseBody = {
    StackId: event.StackId,
    RequestId: event.RequestId,
    LogicalResourceId: event.LogicalResourceId,
    PhysicalResourceId: 'cognitoDependency-' + event.ResourceProperties.AdditionalData.project,
    Status: status,
    Reason: getReason(err) + " See details in CloudWatch Log: " + context.logStreamName,
    Data: data
  };

  console.log("RESPONSE:\n", responseBody);
  var json = JSON.stringify(responseBody);

  var https = require("https");
  var url = require("url");

  var parsedUrl = url.parse(event.ResponseURL);
  var options = {
    hostname: parsedUrl.hostname,
    port: 443,
    path: parsedUrl.path,
    method: "PUT",
    headers: {
      "content-type": "",
      "content-length": json.length
    }
  };

  var request = https.request(options, function(response) {
    console.log("STATUS: " + response.statusCode);
    console.log("HEADERS: " + JSON.stringify(response.headers));
    context.done(null, data);
  });

  request.on("error", function(error) {
    console.log("sendResponse Error:\n", error);
    context.done(error);
  });

  request.on("end", function() {
    console.log("end");
  });
  request.write(json);
  request.end();
}

function getReason(err) {
  if (err)
    return err.message;
  else
    return '';
}

function buildCognitoUserAndIdentityPools(event, cb) {
  var AWS = require('aws-sdk');
  AWS.config.region = 'us-east-1';

  var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
    apiVersion: '2016-04-18'
  });

  var environment = event.ResourceProperties.AdditionalData.environment;

  // CREATE USER POOL PARAMS
  var params = {
    PoolName: 'cognitoUser-' + environment,
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
      return cb(err);
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
          return cb(err);
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

          var cognitoidentity = new AWS.CognitoIdentity({
            apiVersion: '2014-06-30'
          });

          // CREATE IDENTITY POOL
          cognitoidentity.createIdentityPool(params, function(err, data) {
            if (err) {
              console.log(err, err.stack);
              return cb(err);
            } else {
              console.log(data);
              return cb(null, data);
            }
          });
        }
      });
    }
  });
};