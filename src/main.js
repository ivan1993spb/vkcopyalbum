'use strict';

var VK = require('vkapi');
var url = require('url');
var $ = require('jquery');
var cmd_blocks = require('./cmd_blocks.js');
var album_list = require('./album_list.js');

var group_url = "http://vk.com/grps0304"

var albums = album_list.AlbumList(10);

VK.init(function() {
    // Init albums
    $(function () {
        var stopSpinner = cmd_blocks.callSpinner();

        var path = url.parse(group_url).pathname;
        var screen_name = "";
        if (path != null) {
            screen_name = path.split('/')[1];
        }

        if (screen_name.length > 0) {
            VK.api("utils.resolveScreenName", {
                "screen_name": screen_name
            }, function (data) {
                if (data.response.object_id) {
                    if (['user', 'group', 'event', 'page'].indexOf(data.response.type) > -1) {
                        var owner_id = data.response.object_id;
                        if (data.response.type != "user") {
                            owner_id = -data.response.object_id;
                        }

                        albums.load(owner_id, function () {
                            stopSpinner(albums.show);
                        });
                    } else {
                        cmd_blocks.showMessage("invalid object type: " + data.response.type);
                        console.log("invalid object type: " + data.response.type);
                    }
                } else {
                    cmd_blocks.showMessage("cannot resolve screen name: " + screen_name);
                    console.log("cannot resolve screen name: " + screen_name);
                }
            });
        } else {
            cmd_blocks.showMessage("cannot get screen name");
            console.log("cannot get screen name");
        }
    });
}, function() {
    cmd_blocks.showMessage("api initialization failed");
    console.log("api initialization failed");
}, '5.52');
