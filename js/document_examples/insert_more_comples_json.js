"use strict";

var AWS = require("aws-sdk");

var docClient = new AWS.DynamoDB.DocumentClient({
    region: "us-east-1"
});

var testJson = {
    "allergenPOV": {
        "caregiver": false,
        "personal": true
    },
    "foods": [
        "peanuts",
        "tree nuts",
        "seeds",
        "watermelon",
        "meat"
    ],
    "anaphylaxis": {
        "anaphylaxis": "No"
    },
    "email": "testingjen1@test.com",
    "epipen": {
        "epipen": "Sometimes"
    },
    "eyes": "FemaleEyesColor0Style0",
    "hair": "FemaleHairColor1Style1",
    "password": "passwrod",
    "sex": "female",
    "skull": "FemaleSkin1",
    "username": "testingjen1",
    "wordsOfWisdom": "Asdfasdfasdf",
    "yearofbirth": "1971",
    "yearsOfExperience": "5 years",
    "zipcode": "60606"
};

// insert foods - according to doc this should be async call
// this should be own lambda and listen to sns topic to persist
var foods = testJson.foods;
foods.forEach(function(food, idx) {
    var params = {
        Item: {
            "key": "ad5b4e63-8e20-4881-4444-d823dafbdba0",
            "food": food,
        },
        TableName: "chrisdbfood"

    };
    console.log("we are persisting: " + food);

    docClient.put(params, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        }
    });
});


// insert profile - have this send SNS 
// this will push "foods" to sns topic to persist in another lambda
var params = {
    Item: {
        "key": "ad5b4e63-8e20-4881-4444-d823dafbdba0",
        "profile": testJson
    },
    TableName: "chrisdb"
};

docClient.put(params, function(err, data) {
    if (err) console.log(err);
    else console.log(data);
});