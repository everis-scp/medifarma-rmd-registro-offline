#!/usr/bin/env node

module.exports = function(context) {

    /** @external */
    var fs = require('fs'),
        path = require('path'),
        shell = require('shelljs');

    var wwwPath = path.join(context.opts.projectRoot, 'www'),
        ui5Root = path.join(wwwPath, 'resources'),
        kapselUI5File = path.join(ui5Root, '.kapsel.ui5');

    // Remove Kapsel UI5 if present
    if (fs.existsSync(kapselUI5File)) {
        console.log("Removing Kapsel UI5 files");
        shell.rm('-rf', ui5Root);
    }
};
