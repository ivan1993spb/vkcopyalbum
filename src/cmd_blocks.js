'use strict';

var $ = require('jquery');

$(function () {
    $("#message-block").click(function () {
        $("#message-block").fadeOut("fast", function () {
            $("#cover-block").fadeOut();
            $("#cover-over-block").css("display", "none");
        });
    });
});

exports.showMessage = function (message) {
    $("#cover-block").fadeIn("fast", function () {
        $("#cover-over-block").css("display", "block");
        $("#cover-over-block > .spinner").css("display", "none");
        $("#message-block").text(message).fadeIn();
    });
};

exports.callSpinner = function () {
    $("#cover-block").fadeIn("fast", function () {
        $("#cover-over-block").css("display", "block");
        $("#message-block").css("display", "none");
        $("#cover-over-block > .spinner").fadeIn();
    });

    return function (callback) {
        $("#cover-over-block > .spinner").fadeOut("fast", function () {
            $("#cover-block").fadeOut("fast", function () {
                if (typeof callback === "function") {
                    callback();
                }
            });
            $("#cover-over-block").css("display", "none");
        });
    }
};
