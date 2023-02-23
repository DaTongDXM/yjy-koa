import Koa from 'koa';
import path from 'path';
import { App } from './types';
import { deepMerge, getHooks } from './utils';

type Params = {
  appPath: string;
}

const hooks = ["lift"]

export default async function KoaCore(params: Params) {
  const app: App = (new Koa()) as App;
  const { appPath } = params;
  app.appPath = appPath;

  const env = process.env.NODE_ENV;
  const extName = app.extName = env === 'dev' ? '.ts' : '.js';
  const baseConfig = await import(path.join(appPath, `config/config.base${extName}`));
  const curConfig = await import(path.join(appPath, `config/config.${env}${extName}`));
  app.config = deepMerge(baseConfig.default(app), curConfig.default(app));
  //获取hooks
  const allHooks = await getHooks(hooks);
  for (const hook of allHooks) {
    try {
      await hook.default(app);
    } catch (error) {

    }
  }

  app.on('error', error => {
    console.log('#################error')
  })
}

