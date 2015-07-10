/*global angular */
(function () {
    angular.module('Cookbook.recipeuri.value', [])
    .value('RecipeURI', {
        getAll: 'recipes',
        getSingle: 'recipes/{0}'
    });
})();
