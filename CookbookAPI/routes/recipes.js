/*global require, exports, process */

//Get the mongo instance
var mongo = require('mongodb').MongoClient;
var BSON = require('bson').BSONPure;
var db;

var setDb = function (Db) {
    db = Db;
};
// default to a 'localhost' configuration:
var connection_string = 'mongodb://localhost:27017/cookbook';
// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
    connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

mongo.connect(connection_string, function (err, Db) {
    if (err) {
        console.log(err);
    } else {
        setDb(Db);
        console.log('Connected Successfully');
        db.collection('recipes', {
            strict: true
        }, function (err, collection) {
            if (err) {
                console.log("The 'recipes' collection doesn't exist. Creating it with sample data...");
                populateDB(db);
            } else {
                return collection;
            }
        });
    }
});

//Open the database connection

//Find a single recipe
exports.findById = function (req, res) {
    var id = req.params.id;
    console.log('Retrieving recipe: ' + id);
    db.collection('recipes', function (err, collection) {
        collection.findOne({
            '_id': new BSON.ObjectID(id)
        }, function (err, item) {
            res.send(item);
        });
    });
};
//Get all recipes
exports.findAll = function (req, res) {
    db.collection('recipes', function (err, collection) {
        collection.find().toArray(function (err, items) {
            res.send(items);
        });
    });
};
//Add a new recipe to the collection
exports.addRecipe = function (req, res) {
    var recipe = req.body;
    console.log('Adding recipe: ' + JSON.stringify(recipe));
    db.collection('recipes', function (err, collection) {
        collection.insert(recipe, {
            safe: true
        }, function (err, result) {
            if (err) {
                res.send({
                    'error': 'An error has occurred'
                });
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
};
//Update a recipe with new or changed values
exports.updateRecipe = function (req, res) {
    var id = req.params.id;
    var recipe = req.body;
    console.log('Updating recipe: ' + id);
    console.log(JSON.stringify(recipe));
    db.collection('recipes', function (err, collection) {
        collection.update({
            '_id': new BSON.ObjectID(id)
        }, recipe, {
            safe: true
        }, function (err, result) {
            if (err) {
                console.log('Error updating wine: ' + err);
                res.send({
                    'error': 'An error has occurred'
                });
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(recipe);
            }
        });
    });
};
//Delete the passed recipe
exports.deleteRecipe = function (req, res) {
    var id = req.params.id;
    console.log('Deleting recipe: ' + id);
    db.collection('recipes', function (err, collection) {
        collection.remove({
            '_id': new BSON.ObjectID(id)
        }, {
            safe: true
        }, function (err, result) {
            if (err) {
                res.send({
                    'error': 'An error has occurred - ' + err
                });
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
};

var populateDB = function (db) {
    var recipes = [
        {
            title: 'Recipe 1',
            description: 'This is a test recipe',
            ingredients: [{
                Ingredient: 'Ingredient 1',
                Amount: 1,
                Measurement: {
                    Id: 2,
                    Text: 'cup'
                }
            }, {
                Ingredient: 'Ingredient 2',
                Amount: 1,
                Measurement: {
                    Id: 3,
                    Text: 'oz'
                }
            }, {
                Ingredient: 'Ingredient 3',
                Amount: 4,
                Measurement: {
                    Id: 2,
                    Text: 'Tbsp'
                }
            }],
            steps: [{
                Step: 1,
                Text: 'This is step 1'
            }, {
                Step: 2,
                Text: 'This is step 2'
            }],
            images: [{
                Id: 1,
                Img: 'Base64String'
            }],
            ranking: 3,
            course: {
                Id: 3,
                Text: 'Appetizer'
            },
            genre: {
                Id: 1,
                Text: 'American'
            },
            favorited: 4,
            submittedBy: 'User1',
            timeToCook: '1.25',
            lastUpdatedOn: Date.now()
        },
        {
            title: 'Recipe 2',
            description: 'This is a test recipe',
            ingredients: [{
                Ingredient: 'Ingredient 1',
                Amount: 1,
                Measurement: {
                    Id: 2,
                    Text: 'cup'
                }
            }, {
                Ingredient: 'Ingredient 2',
                Amount: 1,
                Measurement: {
                    Id: 3,
                    Text: 'oz'
                }
            }, {
                Ingredient: 'Ingredient 3',
                Amount: 4,
                Measurement: {
                    Id: 2,
                    Text: 'Tbsp'
                }
            }],
            steps: [{
                Step: 1,
                Text: 'This is step 1'
            }, {
                Step: 2,
                Text: 'This is step 2'
            }],
            images: [{
                Id: 1,
                Img: 'Base64String'
            }],
            ranking: 3,
            course: {
                Id: 3,
                Text: 'Entree'
            },
            genre: {
                Id: 2,
                Text: 'Mexican'
            },
            favorited: 4,
            submittedBy: 'User2',
            timeToCook: '2',
            lastUpdatedOn: Date.now()
        }
    ];
    db.collection('recipes', function (err, collection) {
        collection.insert(recipes, {
            safe: true
        }, function (err, result) {
            console.log(err + ' ' + result);
        });
    });
};
