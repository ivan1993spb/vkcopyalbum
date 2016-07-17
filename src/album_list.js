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

            console.log(VK);
            VK.api("photos.getAlbums", {
                "owner_id": owner_id,
                "need_covers": 1
            }, function(data) {
                console.log("loaded ", data);

                if (data.response.length > 0) {
                    list = data.response;
                } else {
                    list = [];
                }

                console.log("album list:", list);

                if (typeof callback === "function") {
                    callback();
                }
            });
        },

        'show': function () {
            list.forEach(function (album) {
                console.log("ok");
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

    $(function () {
        
    });

    return albums;
}
