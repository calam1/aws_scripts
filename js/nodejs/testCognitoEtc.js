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

//cognito stuff
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:a13facb0-8a8b-4c3f-9d49-78a24aaa055e',
});

var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

// sign up - http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html#signUp-property
var params = {
    ClientId: '5f2vnltoaofob4rm0r12jrhq6g',//this is the app id in the user pools
    Password: 'password',
    Username: 'clamUserName',
    UserAttributes: [
        {
            Name: 'email',
            Value: 'chrislam67@gmail.com'
        },
        {
            Name: 'gender',
            Value: 'M' 
        },
        {
            Name: 'given_name',
            Value: 'Chris Lam' 
        },
        {
            Name: 'locale',
            Value: 'US' 
        },
        {
            Name: 'middle_name',
            Value: 'Albert' 
        },
        {
            Name: 'name',
            Value: 'CAL' 
        },
        {
            Name: 'phone_number',
            Value: '+13122222222' 
        },
        {
            Name: 'profile',
            Value: 'cal profile' 
        }
    ]
};

//cognitoidentityserviceprovider.signUp(params, function(err, data) {
//    if (err) {
//        console.log("error", err);
//    } else {
//        console.log(data); 
//    }
//});


// resend confirmation code - http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html#resendConfirmationCode-property
var params = {
    ClientId: '5f2vnltoaofob4rm0r12jrhq6g',
    Username: 'clamUserName',
}

//cognitoidentityserviceprovider.resendConfirmationCode(params, function(err, data) {
//    if (err) {
//        console.log("error", err);
//    } else {
//        console.log(data); 
//    }
//});


// confirm signup - http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html#confirmSignUp-property
var params = {
    ClientId: '5f2vnltoaofob4rm0r12jrhq6g',
    Username: 'clamUserName',
    ConfirmationCode: '123744',
}

//cognitoidentityserviceprovider.confirmSignUp(params, function(err, data) {
//    if (err) {
//        console.log("error", err);
//    } else {
//        console.log(data); 
//    }
//});



//////////////////////////////////////////////////////

var cognitoidentity = new AWS.CognitoIdentity();

// getId - http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentity.html#getId-property
var params = {
    IdentityPoolId: 'us-east-1:a13facb0-8a8b-4c3f-9d49-78a24aaa055e',
    Logins: {
    }
}

// cognitoidentity.getId(params, function(err, data) {
//     if (err) {
//         console.log("error", err);
//     } else {
//         console.log(data); 
//     }
// });




AWS.config.region = 'us-east-1';
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:a13facb0-8a8b-4c3f-9d49-78a24aaa055e',
});

AWS.config.credentials.get(function() {
    var accessKeyId = AWS.config.credentials.accessKeyId;
    var secretAccessKey = AWS.config.credentials.secretAccessKey;
    var sessionToken = AWS.config.credentials.sessionToken;
    var identityId = AWS.config.credentials.identityId;
    
    console.log('access key id', accessKeyId);
    console.log('secret access key', secretAccessKey);
    console.log('session token', sessionToken);
    console.log('identity id', identityId);
});
