/*global angular */
(function () {
    angular.module('Cookbook.buildurl.factory', [])
    .factory('BuildUrl', ['APIAddresses', function (APIAddresses) {
        'use strict';
        var env, stringFormatter;
        env = 'local';
        stringFormatter = function (uri, data) {
            var count;
            for (count in data) {
                if (data.hasOwnProperty(count)) {
                    uri = uri.replace('{' + count + '}', data[count]);
                }
            }
            return uri;
        };
        return {
            //Pass the base uri and array of data, if no parameters pass null
            BuildUrl: function (uri, data) {
                if (data !== null) {
                    uri = stringFormatter(uri, data);
                }
                return APIAddresses[env] + uri;
            }
        };
    }]);
})();
