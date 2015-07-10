/*global angular */
(function () {
    angular.module('Cookbook.singlerecipe.controller', [])
        .controller('SingleRecipeCtrl', ['$stateParams', 'RecipeFactory', function ($stateParams, RecipeFactory) {
            var _this, callback, errorCallback;
            _this = this;
            //Upon successful retrieval of recipe
            callback = function (data) {
                _this.Recipe = data;
            };
            //Upon callback error
            errorCallback = function (error) {
                console.log(error);
            };
            //Set the max number of stars
            _this.max = 5;
            //Load the recipe passed in $stateParams
            _this.loadRecipe = function () {
                RecipeFactory.GetSingleRecipe($stateParams.recipeId, callback, errorCallback);
            };
            //Open the recipe for editing
            _this.editRecipe = function (_id) {
                alert(_id);
            };
    }]);
})();
