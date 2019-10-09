"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var _a = require('canvas'), createCanvas = _a.createCanvas, Image = _a.Image;
var canvas = createCanvas(400, 300);
var ctx = canvas.getContext('2d');
var transform = function (src, quality) {
    var imgData = fs.readFileSync(src);
    var img = new Image();
    img.src = imgData;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    var stream = canvas.createJPEGStream({
        quality: quality || 0.8,
        chromaSubsampling: false
    });
    return stream;
};
exports.default = transform;
