/*global angular*/
(function () {
    'use strict';
    angular.module('food2fork.config.values', [])
    .value('Food2ForkConfig', {
        apiKey: 'fc523fa10970faa75abfa25ba6601e7a',
        baseUrl: 'http://food2fork.com/api/search/?key=[APIKEY]'
    });
})();
