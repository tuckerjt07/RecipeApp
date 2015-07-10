/*global angular */
(function () {
    'use strict';
    angular.module('home.toprecipes.controller', [])
        .controller('TopRecipesCtrl', ['$scope', '$window', 'Food2Fork', '$ionicSlideBoxDelegate',
                                       function ($scope, $window, Food2Fork, $ionicSlideBoxDelegate) {
                //Local variable declaration
                var getTopRecipes, getTopFive, _this;
                //Make the "this" instance of TopRecipesCtrl global inside the function
                _this = this;
                //Object to hold callback functions
                getTopRecipes = {};
                //Pick the top five recipes from the list
                getTopFive = function (recipes) {
                    var index, topFive;
                    topFive = [];
                    for (index in recipes) {
                        if (index > 4) {
                            break;
                        } else {
                            topFive.push({
                                description: recipes[index].title,
                                src: recipes[index].image_url,
                                link: recipes[index].source_url
                            });
                        }

                    }
                    return topFive;
                };
                //Callback upon successful top recipes retrieval
                getTopRecipes.callback = function (data) {
                    _this.mostPopular = getTopFive(data.recipes);
                    $ionicSlideBoxDelegate.$getByHandle('slideBoxTopFive').update();
                    $ionicSlideBoxDelegate.$getByHandle('slideBoxTopFive').start();
                };
                //Callback if getTopRecipes fails
                getTopRecipes.errorCallback = function (error) {
                    alert(error);
                };
                //Get the top recipes of the day
                _this.getTopRecipes = function () {
                    Food2Fork.getMostPopular(getTopRecipes.callback, getTopRecipes.errorCallback);
                };
                //open the selected recipe
                _this.openModal = function (pageToDisplay) {
                    $window.open(pageToDisplay);
                };
    }]);
})();
