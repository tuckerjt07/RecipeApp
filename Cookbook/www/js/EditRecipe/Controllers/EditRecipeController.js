/*global angular */
(function () {
    'use strict';
    angular.module('Cookbook.editrecipe.controller', [])
        .controller('EditRecipeCtrl', ['$scope', '$stateParams', 'Measurement', 'RecipeFactory', function ($scope, $stateParams, Measurement, RecipeFactory) {
        //Make this global inside function
        var _this, clearIngredients, reorderSteps, retrieveCallback, errorCallback;
        //Clear the Ingredient input
        clearIngredients = function () {
            _this.Ingredient = null;
            _this.Amount = null;
            _this.Measurement = null;
        };
        //Reorder the steps
        reorderSteps = function () {
            var count;
            for (count in _this.steps) {
                if (_this.steps.hasOwnProperty(count)) {
                    _this.steps[count].Step = parseInt(count, 10) + 1;
                }
            }
        };
        _this = this;
        //Upon successful retrieval
        retrieveCallback = function (data) {
            _this.Recipe = data;
        };
        //If error
        errorCallback = function (error) {
            console.log(error);
        };
        //Instantiate the Ingredients array
        _this.ingredients = [];
        //Instantiate the Directions array
        _this.steps = [];
        //Expose the Measurement model to the view
        _this.MeasurementsList = Measurement;
        //Load the recipe passed in $stateParams
        _this.loadRecipe = function () {
            RecipeFactory.GetSingleRecipe($stateParams.recipeId, retrieveCallback, errorCallback);
        };
        //Add an ingredient to the list
        _this.addIngredient = function () {
            _this.ingredients.push({
                Ingredient: _this.Ingredient,
                Amount: _this.Amount,
                Measurement: _this.Measurement.Text
            });
            //Empty the input fields
            clearIngredients();
        };
        //Remove selected ingredient from the list
        _this.removeIngredient = function (index) {
            _this.ingredients.splice(index, 1);
        };
        //Add direction to the recipe
        _this.addStep = function (text) {
            _this.steps.push({ Step: _this.steps.length + 1, Text: text });
            _this.Ingredient = null;
        };
        //Remove selected step from the list
        _this.removeStep = function ($index) {
            _this.steps.splice($index, 1);
            reorderSteps();
        };
    }]);
})();
