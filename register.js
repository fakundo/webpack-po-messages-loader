var po2json = require('po2json');

module.exports = function(extensions) {
  extensions.forEach(function(ext) {
    require.extensions[ext] = function(module, filename) {
      var content = po2json.parseFileSync(filename, { format: 'jed1.x' });
      var messages = content.locale_data.messages;
      delete messages[''];
      module._compile('module.exports = ' + JSON.stringify(messages) + ';', filename);
    }
  });
}
