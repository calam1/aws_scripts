module.exports.handler = function(event, context) {
  console.log("I can read the file");

  console.log('Received event:', JSON.stringify(event, null, 2));
  console.log('Context:', JSON.stringify(context, null, 2));

  // var parsedUrl = url.parse(event.ResponseURL);
  // var options = {
  //   hostname: parsedUrl.hostname,
  //   port: 443,
  //   path: parsedUrl.path,
  //   method: "PUT",
  //   headers: {
  //     "content-type": "",
  //     "content-length": responseBody.length
  //   }
  // };

  // var request = https.request(options, function(response) {
  //   console.log("Status code: " + response.statusCode);
  //   console.log("Status message: " + response.statusMessage);
  //   context.done();
  // });

  // request.on("error", function(error) {
  //   console.log("send(..) failed executing https.request(..): " + error);
  //   context.done();
  // });

  // request.write(responseBody);
  // request.end();
};

function sendResponse(event, context, data, err) {
  var responseBody = {
    StackId: event.StackId,
    RequestId: event.RequestId,
    LogicalResourceId: event.LogicalResourceId,
    PhysicalResourceId: 'route53Dependency-' + event.ResourceProperties.DomainName,
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
