'use strict';

var VK = require('vkapi');
var $ = require('jquery');
var escapeStringRegexp = require('escape-string-regexp');
var copyAlbum = require('./copy.js').copy;

exports.AlbumList = function (page_size) {
    var list = [];
    var filterExp = new RegExp();

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
            $("#albums").empty();
            list.forEach(function (album) {
                if (filterExp.test(album.title)) {
                    $("#albums").append($('<div class="album"></div>').append(
                        $('<div></div>').append($("<img>").attr("src", album.thumb_src)),
                        $('<div class="album_title"></div>').text(album.title),
                        $('<div class="copy_button">copy</div>').on("click", {
                            'album': album
                        }, function(event){
                            copyAlbum(event.data.album)
                        })
                    ));
                }
            });
        },

        'setFilter': function (title_filter) {
            console.log("new filter title", title_filter);
            if (!title_filter) {
                filterExp = new RegExp();
            } else if (typeof title_filter === "string") {
                title_filter = escapeStringRegexp(title_filter);
                title_filter = title_filter.replace(/\s+/, ".+?");
                filterExp = new RegExp(title_filter);
            }

            console.log(filterExp)
        }
    };

    return albums;
}
