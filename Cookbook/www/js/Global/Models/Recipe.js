/*global angular */
(function () {
    'use strict';
    angular.module('Cookbook.recipe.value', [])
    .value('Recipe', {
        title: String,
        description: String,
        ingredients: [{
            Ingredient: String,
            Amount: Number,
            Measurement: {
                Id: Number,
                Text: String
            }
        }],
        steps: [{
            Step: Number,
            Text: String
        }],
        images: [{
            Id: Number,
            Img: String
        }],
        ranking: Number,
        course: {
            Id: Number,
            Text: String
        },
        genre: {
            Id: Number,
            Text: String
        },
        favorited: Number,
        timeToCook: Number,
        submittedBy: String,
        lastUpdatedOn: {
            type: Date,
            default: Date.now
        }
    });
})();
