/*global angular */
(function () {
    'use strict';
    angular.module('global.shared.factory', [])
        .factory('SharedFactoryFunctions', ['$http',
            function ($http) {
                return {
                    get: function (url, callback, errorCallback) {
                        $http.get(url).success(function (response) {
                            if (callback !== undefined) {
                                callback(response);
                            }
                        }).error(function (error) {
                            if (errorCallback !== undefined) {
                                errorCallback(error);
                            }
                        });
                    }
                };
    }]);
})();
