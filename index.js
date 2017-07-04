var loaderUtils = require('loader-utils');
var po2json = require('po2json');
var fs = require('fs-extra');
var path = require('path');
var fnv = require('fnv');

var collection = {};

function createToken(request) {
  var h = new fnv.FNV();
  h.update(Buffer(request));
  return h.digest('hex');
}

/**
 * @todo Add require hook for SSR
 */

module.exports = function () {};

module.exports.pitch = function (remainingRequest) {
  if (this.cacheable) this.cacheable();
  this.addDependency(remainingRequest);

  var callback = this.async();
  var basename = path.basename(remainingRequest, '.po');
  var options = loaderUtils.getOptions(this);
  var token = createToken(remainingRequest);
  var source = 'module.exports = ' + JSON.stringify(token) + ';';

  if (options.outputDir) {
    po2json.parseFile(remainingRequest, { format: 'jed1.x' }, function (err, data) {
      if (err) {
        this.emitError(err);
      } else {
        var messages = data.locale_data.messages;
        delete messages[''];
        if (!collection[basename]) collection[basename] = {};
        collection[basename][token] = messages;

        fs.outputFile(
          path.resolve(options.outputDir, basename + '.json'),
          JSON.stringify(collection[basename]),
          function (error) {
            callback(error, source);
          }
        );
      }
    });
  } else {
    callback(error, source);
  }
};
