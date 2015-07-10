/*global angular */
(function () {
    'use strict';
    angular.module('Cookbook.measurements.value', [])
        .value('Measurement', [
            {
                text: 'tsp'
            },
            {
                text: 'Tbsp'
            },
            {
                text: 'cup'
            },
            {
                text: 'lbs'
            },
            {
                text: 'Cup'
            },
            {
                text: 'Pint'
            },
            {
                text: 'Quart'
            },
            {
                text: 'Gallon'
            }
    ]);
})();
