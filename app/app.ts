// import YJYKoaCore from 'yjy-koa-core/core';

// import YJYKoaCore from '../lib/core'
// const app = YJYKoaCore.create({ appPath: __dirname });
// const app = new YJYKoaCore({ appPath: __dirname })
const Cluster = require('yjy-koa-core/core/cluster/index')
Cluster.startCluster({
  appPath: __dirname
})