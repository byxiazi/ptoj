"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var index_1 = require("../util/index");
var _ = require('lodash');
var readdir = require('fs-readdir-recursive');
function errorHandler(filenames, opts) {
    var errors = [];
    if (!filenames.length) {
        errors.push('No images can be found');
    }
    _.forEach(filenames, function (filename) {
        if (!fs.existsSync(filename)) {
            errors.push(filename + " doesn't exists");
        }
    });
    if (opts.outFile && opts.outDir) {
        errors.push("can't have --out-file and --out-dir");
    }
    if (errors.length > 0) {
        console.error(errors.join(". "));
        process.exit(2);
    }
}
exports.default = errorHandler;
exports.readdirFilter = function (dir) {
    return readdir(dir).filter(index_1.isImage);
};
exports.flattenFilenames = function (filenames) {
    var _filenames = [];
    _.each(filenames, function (filename) {
        var stat = fs.statSync(filename);
        if (stat.isDirectory()) {
            var dir = exports.readdirFilter(filename);
            var dirname_1 = filename;
            _.each(dir, function (filename) {
                _filenames.push(path.join(dirname_1, filename));
            });
        }
        else {
            /* istanbul ignore next */
            if (index_1.isImage(filename)) {
                _filenames.push(filename);
            }
        }
    });
    return _filenames;
};
exports.filenameOfOutDir = function (dirName, filename) {
    filename = path.basename(filename.replace(/png$/, 'jpeg'));
    var dest = path.join(dirName, filename);
    return dest;
};
exports.filenameOfOutFile = function (filename, index, ext) {
    if (ext === void 0) { ext = '.jpeg'; }
    /* istanbul ignore next */
    if (index_1.isJpeg(filename)) {
        ext = path.extname(filename);
    }
    filename = index_1.newFileName(filename);
    if (index === 0) {
        filename += "" + ext;
    }
    else {
        filename += "(" + index + ")" + ext;
    }
    return filename;
};
exports.defaultOutFile = function (filenames, ext) {
    if (ext === void 0) { ext = '.jpeg'; }
    var defaultNames = {};
    _.each(filenames, function (filename, index) {
        var _filename = index_1.newFileName(filename);
        defaultNames[index] = _filename + ext;
    });
    return defaultNames;
};
