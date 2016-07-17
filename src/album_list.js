'use strict';

var VK = require('vkapi');
var $ = require('jquery');
var escapeStringRegexp = require('escape-string-regexp');

exports.AlbumList = function (page_size) {
    var list = [];
    var filterExp = /./;

    var albums = {
        'load': function (owner_id, callback) {
            console.log("loading albums for owner_id ", owner_id);

            VK.api("photos.getAlbums", {
                "owner_id": owner_id,
                "need_covers": 1
            }, function(data) {
                if (data.response.count > 0) {
                    list = data.response.items;
                } else {
                    list = [];
                }

                if (typeof callback === "function") {
                    callback();
                }
            });
        },

        'show': function () {
            list.forEach(function (album) {
                if (filterExp.test(album.title)) {
                    $("#albums").append($("<div></div>").text(album.title));
                }
            });
        },

        'setFilter': function (filter) {
            if (typeof title_filter === "string") {
                title_filter = escapeStringRegexp(title_filter);
                title_filter.replace(/\s+/, ".+?");
                filterExp = new RegExp(title_filter);
            }
        }
    };

    return albums;
}
