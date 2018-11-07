var fs = require('fs');
var path = require('path');
var oldFileName = path.resolve(__dirname + '/' + 'proba.js');
var version = '1.8.0';
console.log('old ', oldFileName);
var title = oldFileName.split('.');
var newFileName = '_version_' + version + '_.' + 'proba.js';
// var newFileName = title[0] + '_version_' + version + '_.' + title[1];

console.log('new', newFileName);
fs.copyFile(oldFileName, '/app/copies/proba.js', (er) => {
    if (er) throw er;
    var name = path.resolve('../') + '/app/copies/' + newFileName;
    fs.rename(oldFileName, name, (error) => {
        if (error) throw error;
        console.log('Rename completed')

    })

})
