import Router from "koa-router";
import path from 'path';
import { App } from '../types/index'
export default async (app: App) => {
  app.router = new YJYRouter(app)
  const appRouter = await import(path.join(app.appPath, `router${app.extName}`))
  if (!appRouter) {
    throw new Error("router is not defined");
  }
  const router = appRouter.default(app);
  app.use(router.routes()).use(async (ctx) => {
    ctx.body = '404'
  })
  // const ro
}
class YJYRouter extends Router {
  private app: App;
  constructor(app) {
    super()
    this.app = app
  }
}