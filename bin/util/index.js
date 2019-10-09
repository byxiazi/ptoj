"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var imgExtReg = /^.(jpg|jpeg|png)$/i;
var jpegReg = /^.(jpg|jpeg)$/i;
var isImage = function (filename) {
    return imgExtReg.test(path.extname(filename));
};
exports.isImage = isImage;
var isJpeg = function (filename) {
    return jpegReg.test(path.extname(filename));
};
exports.isJpeg = isJpeg;
var newFileName = function (filename) {
    var ext = path.extname(filename);
    if (!ext)
        return filename;
    var _filename = filename
        .split(ext)
        .join('')
        .replace(/\/|\\/g, '.')
        .replace(/^\.*/, '');
    return _filename;
};
exports.newFileName = newFileName;
