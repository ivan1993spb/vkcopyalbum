'use strict';

var VK = require('vkapi');
// var url = require('url');
// var $ = require('jquery');
var cmd_blocks = require('./cmd_blocks.js');
// var album_list = require('./album_list.js');

// Copy album
exports.copy = function (album) {
    VK.api("photos.get", {
        owner_id:    album.owner_id,
        album_id:    album.id,
        photo_sizes: 1
    }, function(data) {
        if (data.error) {
            cmd_blocks.showMessage("cannot load photo: "+data.error);
            console.log("cannot load photo: ", data.error);
        } else if (data.response.count > 0) {
            data.response.items.forEach(function(photo){
                console.log("photo", photo.sizes[photo.sizes.length-1]);
                getDataUri(photo.sizes[photo.sizes.length-1], function (image) {
                    console.log(image);
                });
                // var data = new FormData();
                // data.append("file1", ...);
            });
        }
    })
};

function copyPhoto(photo) {

}

function getDataUri(url, callback) {
    var image = new Image();

    image.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
        canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

        canvas.getContext('2d').drawImage(this, 0, 0);

        // Get raw image data
        // callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));

        // ... or get as Data URI
        callback(canvas.toDataURL('image/png'));
    };

    image.src = url;
}
