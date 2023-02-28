import Koa from 'koa';

export interface App extends Koa {
  //项目运行路径
  appPath: string;
  //文件后缀名
  extName: string;
  //配置文件
  config: any;
  //控制器
  controller: any;
}