/*global angular */
(function () {
    'use strict';
    angular.module('Cookbook.recipe.factory', [])
        .factory('RecipeFactory', ['SharedFactoryFunctions', 'RecipeURI', 'BuildUrl',
            function (SharedFactoryFunctions, RecipeURI, BuildUrl) {
                return {
                    GetAllRecipes: function (callback, errorCallback) {
                        var url = BuildUrl.BuildUrl(RecipeURI.getAll, null);
                        SharedFactoryFunctions.get(url, callback, errorCallback);
                    },
                    GetSingleRecipe: function (_id, callback, errorCallback) {
                        var params, url;
                        params = [];
                        params.push(_id);
                        url = BuildUrl.BuildUrl(RecipeURI.getSingle, params);
                        SharedFactoryFunctions.get(url, callback, errorCallback);
                    }
                };
            }]);
})();
