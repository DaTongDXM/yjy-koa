const KoaCore = require('../../lib/core/index.ts');
const path = require('path')
const app = KoaCore.default.create({ appPath: path.resolve(__dirname, '../../', 'app') });