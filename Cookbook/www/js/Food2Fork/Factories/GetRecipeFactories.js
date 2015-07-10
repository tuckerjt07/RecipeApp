/*global angular */
(function () {
    'use strict';
    angular.module('food2fork.factory', [])
        .factory('Food2Fork', ['SharedFactoryFunctions', 'Food2ForkConfig', function (SharedFactoryFunctions, Food2ForkConfig) {
        var buildUrl;
        buildUrl = function (params) {
            var url;
            if (params === undefined) {
                params = '';
            }
            url = Food2ForkConfig.baseUrl;
            url = url.replace('[APIKEY]', Food2ForkConfig.apiKey);
            return url;
        };
        return {
            getMostPopular: function (callback, errorCallback) {
                SharedFactoryFunctions.get(buildUrl(), callback, errorCallback);
            }
        };
    }]);
})();
