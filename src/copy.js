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
			});
		}
	})
};

function copyPhoto(photo) {

}
