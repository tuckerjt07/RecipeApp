/*global angular, window, cordova, StatusBar */
/*jshint -W069 */
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'global.package', 'home.package', 'food2fork.package', 'editrecipe.package',
                           'Cookbook.cordova.factory.package', 'Cookbook.viewrecipe.package', 'ionic.rating', 'ui.mask'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleLightContent();
        }
    });
})

.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$compileProvider',
             function ($stateProvider, $urlRouterProvider, $httpProvider, $compileProvider) {
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.withCredentials = true;
        delete $httpProvider.defaults.headers.common["X-Requested-With"];
        $httpProvider.defaults.headers.common["Accept"] = "application/json";
        $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|blob|tel):|data:image\//);
        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

        // setup an abstract state for the tabs directive
        .state('tab', {
            url: "/tab",
            abstract: true,
            templateUrl: "templates/tabs.html"
        })

        // Each tab has its own nav history stack:

        .state('tab.home', {
            url: '/home',
            views: {
                'tab-dash': {
                    templateUrl: 'templates/tab-home.html',
                    controller: 'DashCtrl'
                }
            }
        })

        .state('tab.recipes', {
            url: '/recipes',
            views: {
                'tab-chats': {
                    templateUrl: 'templates/RecipeTemplates/tab-recipes.html'
                }
            }
        })
        .state('tab.recipes-detail', {
            url: '/recipes/:recipeId',
            params: {
                favoriteid: {
                    value: '1',
                    squash: false
                }
            },
            views: {
                'tab-chats': {
                    templateUrl: 'templates/RecipeTemplates/tab-view-recipe.html'
                }
            }
        })
        .state('tab.recipe-edit', {
            url: '/editrecipes/:recipeId',
            params: {
                favoriteid: {
                    value: '1',
                    squash: false
                }
            },
            views: {
                'tab-chats': {
                    templateUrl: 'templates/RecipeTemplates/tab-add-recipe.html'
                }
            }
        })
        .state('tab.test', {
            url: '/test',
            views: {
                'tab-account': {
                    templateUrl: 'templates/tab-account.html',
                    controller: 'AccountCtrl'
                }
            }
        });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/home');

}]);
