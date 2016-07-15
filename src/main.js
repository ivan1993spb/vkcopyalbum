'use strict';

var VK = require('vkapi');
var url = require('url');
var $ = require('jquery');

var group_url = "http://vk.com/grps0304"
// var group = "http://vk.com/id147789572"
// var group = "http://vk.com/event115597744"
// var group = "http://vk.com/club124934146"

$(function(){

    var path = url.parse(group_url).pathname;
    var screen_name = "";
    if (path != null) {
        screen_name = path.split('/')[1];
    }

    if (screen_name.length > 0) {
        VK.api("utils.resolveScreenName", {
            "screen_name": screen_name
        }, function(data) {
            if (data.response.object_id) {
                if (['user', 'group', 'event', 'page'].indexOf(data.response.type) > -1) {
                    var owner_id = data.response.object_id;
                    if (data.response.type != "user") {
                        owner_id = -data.response.object_id;
                    }

                } else {
                    throw new Error("invalid object type: " + data.response.type)
                }
            } else {
                throw new Error("cannot resolve screen name: " + screen_name);
            }
        });
    } else {
        throw new Error("cannot get screen name");
    }
});

function AlbumList(page_size) {
    this.page_size = page_size;
}

AlbumList.prototype.load = function () {
    VK.api("photos.getAlbums", {
        "owner_id": owner_id,
        "need_covers": 1
    }, function(data) {
        if (data.response.count) {
            data.response.items.forEach(function(album) {
                $("#albums").append($("<div></div>").text(album.title))
            });
        } else {

        }
    }, '5.52');
}
