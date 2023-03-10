import YJYKoaCore from 'yjy-koa-core/core';
const Cluster = require('yjy-koa-core/core/cluster/index')
// import YJYKoaCore from '../lib/core'
// const app = YJYKoaCore.create({ appPath: __dirname });
const app = new YJYKoaCore({ appPath: __dirname })
Cluster.startCluster({
  appPath: __dirname
})