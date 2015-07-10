/*global angular */
(function () {
    'use strict';
    angular.module('Cookbook.editrecipecamera.controller', [])
        .controller('EditRecipeCameraCtrl',['CameraFactory', function (CameraFactory) {
        var _this, photoSuccess, photoError;
        _this = this;
        _this.img = null;
        photoSuccess = function (data) {
            _this.img = data;
        };
        photoError = function (error) {
            console.log(error);
        };
        _this.takePhoto = function () {
            CameraFactory.captureFile(photoSuccess, photoError, 50, null, true);
        };
    }]);
})();
