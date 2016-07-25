'use strict';

var $ = require('jquery');

$(function () {
    $("#message-block").click(function () {
        $("#message-block").fadeOut("fast", function () {
            $("#cover-block").fadeOut();
            $("#cover-over-block").css("display", "none");
        });
    });

    $("#prompt-block > button").click(function () {
        $("#prompt-block").fadeOut("fast", function () {
            $("#cover-block").fadeOut();
            $("#cover-over-block").css("display", "none");
        });
    });
});

exports.showMessage = function (message) {
    $("#prompt-block").css("display", "none");

    $("#cover-block").fadeIn("fast", function () {
        $("#cover-over-block").css("display", "block");
        $("#cover-over-block > .spinner").css("display", "none");
        $("#message-block").text(message).fadeIn();
    });
};

exports.showPrompt = function (message, callback) {
    $("#cover-block").fadeIn("fast", function () {
        $("#cover-over-block").css("display", "block");
        $("#cover-over-block > .spinner").css("display", "none");
        $("#prompt-block > p").text(message);

        if (typeof callback === 'function') {
            var clickEvent = function () {
                $("#cover-block").fadeOut('fast', function () {
                    $("#prompt-block > button").unbind("click", clickEvent);
                    callback($("#prompt-block > input").val());
                });
            };
            $("#prompt-block > button").click(clickEvent);
        }

        $("#prompt-block > input").val("");
        $("#prompt-block").fadeIn("fast", function () {
            $("#prompt-block > input").focus();
        });
    });
};

exports.callSpinner = function () {
    $("#cover-block").css("display", "block");
    $("#cover-over-block").css("display", "block");
    $("#message-block").css("display", "none");
    $("#cover-over-block > .spinner").css("display", "block");

    return function (callback) {
        $("#cover-over-block > .spinner").fadeOut("fast", function () {
            $("#cover-block").fadeOut("fast", callback);
            $("#cover-over-block").css("display", "none");
        });
    }
};
