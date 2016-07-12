'use strict';

var VK = require('vkapi');
var url = require('url');
var jquery = require('jquery')


// var test = "http://vk.com/grps0304"
// var test = "http://vk.com/id147789572"
// var test = "http://vk.com/event115597744"
// var test = "http://vk.com/club124934146"


var path = url.parse(test).pathname;
var screen_name = "";

if (path != null) {
    screen_name = path.split('/')[1]
}

VK.api("utils.resolveScreenName", {
    "screen_name": screen_name
}, function(data) {
    if (data.response) {
        if (['user', 'group', 'event', 'page'].indexOf(data.response.type) > -1) {
            var owner_id = data.response.object_id;
            if (data.response.type != "user") {
                owner_id = -data.response.object_id;
            }

            VK.api("photos.getAlbums", {"owner_id": owner_id}, function(data) { 
                console.log("getAlbums:", data);
            });
        } else {
            throw new Error("invalid object type: " + data.response.type)
        }
    }
});
