/*
* grunt-my-grunt-plugin
* https://github.com/Administrator/my-grunt-plugin
*
* Copyright (c) 2015 tonykung
* Licensed under the MIT license.
*/

'use strict';


var fs = require('fs');


module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    function showDebugInfo (options) {
        if (options.isDebug) {
            grunt.log.writeflags(options, 'Custom Options');
        }
    }

    function verifyFoldersExist (folderPaths) {
        if (folderPaths.length < 1) {
            grunt.fail.fatal("no folder is specified in the option 'foldersToScan'");
        }
        folderPaths.forEach(function (path) {
            if (path === '' || path === undefined || !grunt.file.exists(path) || !grunt.file.isDir(path)) {
                grunt.fail.fatal("any one of the paths specidied in foldersToScan is not correct, not exist? not a directory path?");
            }
        });
    }

    function checkFileSize (folders) {
        folders.forEach(function (folderToScan){
            grunt.log.writeln('Peeking %s', folderToScan);
            grunt.file.recurse(folderToScan, function (absolutePath, rootDir, subDir, fileName){
                var stats, asBytes;

                if (grunt.file.isFile(absolutePath)) {
                    stats = fs.statSync(absolutePath);
                    asBytes = stats.size / 1024;
                    grunt.log.writeln('Found file %s with size of %s kb', fileName, asBytes);
                }
            });
            grunt.log.writeln();
        })
    }

    grunt.registerTask('my_grunt_plugin', 'The best Grunt plugin ever.', function() {
        var options = this.options({
            foldersToScan: [],
            isDebug: false
        });

        showDebugInfo(options);
        verifyFoldersExist(options.foldersToScan);
        checkFileSize(options.foldersToScan);
    });

};
