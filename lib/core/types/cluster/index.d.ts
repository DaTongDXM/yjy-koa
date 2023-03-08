import * as koa from 'koa'
declare module 'koa' {
  interface Options {
    appPath: string,
    port?: number,
    workers?: number
  }
}
export = koa