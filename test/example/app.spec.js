const KoaCore = require('../../lib/core/index');
const path = require('path')
const app = KoaCore.default.create({ appPath: path.resolve(__dirname, '../../', 'app') });