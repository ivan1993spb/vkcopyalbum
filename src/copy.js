'use strict';

var VK = require('vkapi');
// var url = require('url');
// var $ = require('jquery');
var cmd_blocks = require('./cmd_blocks.js');
// var album_list = require('./album_list.js');

exports.copy = function (album) {
	console.log("ok", album);

	VK.api("photos.get", {
		owner_id: album.owner_id,
		album_id: album.id
	}, function(data) {
		console.log(data)
		
		if (data.error) {
            cmd_blocks.showMessage("cannot load photo: "+data.error);
			console.log("cannot load photo: ", data.error);
		} else if (data.response.count > 0) {
			// console.log(data)
		}
	})
};

function copyPhoto(photo) {

}
