
const controller = require('../../lib/core/hooks/controller');
const path = require('path')
controller.default({
  appPath: path.resolve(__dirname, '../../', 'example'),
  extName: ".ts"
});