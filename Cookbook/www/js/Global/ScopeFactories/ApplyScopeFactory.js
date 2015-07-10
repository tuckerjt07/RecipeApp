/*global angular */
(function () {
    'use strict';
    angular.module('cookbook.applyscope.factory', [])
    .factory('ApplyScope', function () {
        return {
            IfNotInProgress: function (scope) {
                if (scope) {
                    if (!scope.$$phase) {
                        scope.$digest();
                    } else {
                        return false;
                    }
                }
            }
        };
    });
})();
