'use strict';

var VK = require('vkapi');
var $ = require('jquery');
var escapeStringRegexp = require('escape-string-regexp');
var copyAlbum = require('./copy.js').copy;
var cmd_blocks = require('./cmd_blocks.js');

exports.AlbumList = function (page_size) {
    var list = [];
    var filterExp = new RegExp();
    var owner_id = 0;

    var albums = {
        'load': function (_owner_id, callback) {
            owner_id = _owner_id;
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
                        $('<div class="copy_button">copy to</div>').on("click", {
                            'album': album
                        }, function(event){
                            cmd_blocks.showPrompt(event.data.album.title, function(input) {
                                if (!input) {
                                    cmd_blocks.showMessage("Название нового альбома не может быть пустым!");
                                    return
                                }

                                VK.api("photos.createAlbum", {
                                    title:       input,
                                    group_id:    (owner_id > -1) ? owner_id : owner_id * -1,
                                    description: event.data.album.description
                                }, function (data) {
                                    if (data.error) {
                                        if (data.error.error_code == 9) {
                                            data.error.error_msg = "Попробуйте выполнить действие позже или дать новому альбому другое название";
                                        }

                                        cmd_blocks.showMessage("Не удалось добавить альбом. " + data.error.error_msg);
                                        return;
                                    }

                                    if (data.response) {
                                        console.log(data);
                                        copyAlbum(album);
                                    }
                                });
                            });
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

function createAlbum () {

}
