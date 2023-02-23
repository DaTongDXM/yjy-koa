import Koa from 'koa';

export interface App extends Koa{
    appPath:string;
    extName:string;
    config:any;
}