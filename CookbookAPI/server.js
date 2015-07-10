/*global require, process*/
var express = require('express'),
    recipes = require('./routes/recipes.js');

var app = express();

var port = process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";

app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});

app.get('/recipes', recipes.findAll);
app.get('/recipes/:id', recipes.findById);
app.post('/recipes', recipes.addRecipe);
app.put('/recipes/:id', recipes.updateRecipe);
app.delete('/recipes:/id', recipes.deleteRecipe);

app.listen(port, ip);
console.log('Listening on port ' + port + '...');
