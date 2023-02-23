import Koa from 'koa';
import path from 'path';
import {App} from './types';
import { deepMerge } from './utils';

type Params={
    appPath:string;
}

export default async function KoaCore(params:Params){
    const app:App=new Koa();
    const {appPath}=params;
    app.appPath=appPath;
    
    const env=process.env.NODE_ENV;
    const extName=app.extName=env==='dev'?'.ts':'.js';
    const baseConfig=await import(path.join(appPath,`config/config.base${extName}`));
    const curConfig=await import(path.join(appPath,`config/config.${env}${extName}`));
    app.config=deepMerge(baseConfig.default(app),curConfig.default(app));
    console.log(app.config)
}

