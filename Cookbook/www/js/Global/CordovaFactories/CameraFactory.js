/*global angular, navigator, Camera */
(function () {
    'use strict';
    angular.module('Cookbook.cordova.camera.factory', [])
        .factory('CameraFactory', [
            function () {
                var capturePicture = function (callback, errorCallback, storage, imageQuality, cameraPopoverOptions, saveToPhotoAlbumBool) {
                    cameraPopoverOptions = cameraPopoverOptions !== undefined ? cameraPopoverOptions : null;
                    saveToPhotoAlbumBool = saveToPhotoAlbumBool !== undefined ? saveToPhotoAlbumBool : null;
                    navigator.camera.getPicture(callback,
                                                errorCallback, {
                        quality: parseInt(imageQuality, 10),
                        destinationType: Camera.DestinationType[storage],
                        popoverOptions: cameraPopoverOptions,
                        saveToPhotoAlbum: saveToPhotoAlbumBool
                    });
                };
                return {
                    captureBase64: function (callback, errorCallback, imageQuality, cameraPopoverOptions, saveToPhotoAlbumBool) {
                        capturePicture(callback, errorCallback, 'DATA_URL', imageQuality, cameraPopoverOptions, saveToPhotoAlbumBool);
                    },
                    captureFile: function (callback, errorCallback, imageQuality, cameraPopoverOptions, saveToPhotoAlbumBool) {
                        capturePicture(callback, errorCallback, 'FILE_URI', imageQuality, cameraPopoverOptions, saveToPhotoAlbumBool);
                    }
                };
    }]);
})();
