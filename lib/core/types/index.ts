import Koa from 'koa';
import KoaRouter from 'koa-router';
import * as koa from 'koa'
declare module 'koa' {

  type PlainObject<T = any> = { [key: string]: T }
  interface Icontroller extends PlainObject { }

  interface App extends Koa {
    //项目运行路径
    appPath: string;
    //文件后缀名
    extName: string;
    //配置文件
    config: any;
    //控制器
    controller: Icontroller;
    //路由
    router: Router;
  }

  interface Router extends KoaRouter {

  }
}


export = koa