/*global angular */
(function () {
    'use strict';
    angular.module('Cookbook.viewrecipe.controller', [])
        .controller('RecipeCtrl', ['$state', 'RecipeFactory',
            function ($state, RecipeFactory) {
                //Create variables
                var _this, allRecipesCallback, errorAllRecipesCallback;
                //Make this global to this controller
                _this = this;
                //Upon successful return of recipes
                allRecipesCallback = function (data) {
                    _this.Recipes = data;
                };
                //Upon error from service
                errorAllRecipesCallback = function (error) {
                    console.log(error);
                };
                //Star Rating max value
                _this.max = 5;
                //Get all the users recipes
                _this.getRecipes = function () {
                    RecipeFactory.GetAllRecipes(allRecipesCallback, errorAllRecipesCallback);
                };
                //View more details of a recipe
                _this.openExtendedView = function (recipe) {
                    recipe.viewMore = recipe.viewMore ? false : true;
                };
                //Launch edit mode
                _this.openEditMode = function (recipe) {
                    alert(recipe.editMode);
                    recipe.editMode = recipe.editMode ? false : true;
                };
    }]);
})();
