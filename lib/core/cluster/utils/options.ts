//模块提供了一些基本的系统操作函数
import os from "os";
import path from "path";
import assert from 'assert';
import fs from 'fs';
import { Options } from '../../types/cluster/index'
module.exports = function (options: Options) {
  if (!options.workers) {
    //默认设置系统cup核数
    options.workers = os.cpus().length;
  }

  const pkgPath = path.join(options.appPath, 'package.json');
  assert(fs.existsSync(pkgPath), `${pkgPath} shoule exist`);



}

