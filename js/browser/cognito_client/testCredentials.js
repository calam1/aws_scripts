var AWS = require('aws-sdk');


var creds = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:633d5440-9196-45f7-839c-0c118877b380'
})
 
AWS.config.update({
    region: 'us-east-1',
    credentials: creds
});


var s3 = new AWS.S3({region: 'us-east-1'});
s3.listObjects({Bucket: 'cognitoclient'}, function(err, data) {
    if (err) console.log(err);
    else console.log(data);
});