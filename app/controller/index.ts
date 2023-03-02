import { Module } from 'module';
import path from 'path';
import YJYKoaCore from 'yjy-koa-core/core';
export default class IndexController extends YJYKoaCore {
  constructor() {
    super({ appPath: path.resolve(__dirname, '../') })
  }
  public async entry() {
    const { context, app } = this;
    console.info('i am IndexController-entry')

  }
  public async index(ctx, next) {
    // console.log(this)
    // console.log(ctx)
    ctx.body = 'index'
    ctx.status = 200
  }
}