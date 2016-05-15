// var Q = require("q");
var Promise = require("bluebird");
var GitHubApi = require("github");

var github = new GitHubApi({
  version: "3.0.0"
});

// callback way
var getUserAvatarWithCallback = function(user, callback) {
  github.search.users({
    q: user
  }, function(err, res) {
    if (err) {
      callback(err, nulll)
    } else {
      var avatarUrl = res.items[0].avatar_url;
      callback(null, avatarUrl);
    }
  })
};

getUserAvatarWithCallback("calam1", function(err, avatar) {
  console.log("got url with callback pattern", avatar);
});

// bluebird
var getUserAvatarWithBlueBird = function(user) {
  return new Promise(function(resolve, reject) {
    github.search.users({
      q: user
    }, function(err, res) {
      if (err) {
        reject(err);
      } else {
          var avatarUrl = res.items[0].avatar_url;
          resolve(avatarUrl);
      }
    });
  });
};

getUserAvatarWithBlueBird("calam1")
.then(function(avatarUrl) {
    console.log("got the avatar url via Promises", avatarUrl);
})
.catch(function(error) {
    console.log("error getting avatar with bluebird", error);
});