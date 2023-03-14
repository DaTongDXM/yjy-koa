import Koa from 'koa';
import path from 'path';
import { App } from './types';
import { deepMerge, getHooks } from './utils';

type Params = {
  appPath: string;
}

const hooks = ["lift", "controller", "router", "typing"]

export default class KoaCore extends Koa {
  public app: App = (new Koa()) as App;
  constructor(params: Params) {
    super()
    const { appPath } = params;
    this.app.appPath = appPath;
    this.initConfig();
    this.initHooks();
    this.app.on('error', error => {
      console.log('#################error', error)
    })

  }

  static async create(params: Params) {
    const koaCore = new KoaCore(params);
    // await koaCore.initConfig();
    // await koaCore.initHooks();
    return koaCore;
  }

  async initConfig() {
    //运行环境
    const env = process.env.NODE_ENV;
    //是否本地运行单元测试，本地单元测试同样读取ts后缀文件
    const test = process.env.NODE_TEST;
    const extName = this.app.extName = (env === 'dev' || test) ? '.ts' : '.js';
    const baseConfig = await import(path.join(this.app.appPath, `config/config.base${extName}`));
    const curConfig = await import(path.join(this.app.appPath, `config/config.${env}${extName}`));
    this.app.config = deepMerge(baseConfig.default(this.app), curConfig.default(this.app));

  }
  async initHooks() {
    //获取hooks
    const allHooks = await getHooks(hooks);
    for (const hook of allHooks) {
      try {
        await hook.default(this.app);
      } catch (error) {

      }
    }

  }



}

