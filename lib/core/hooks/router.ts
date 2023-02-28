import Router from "koa-router";
import { App } from '../types/index'
export default async (app) => {
  app.router = new YJYRouter(app)
  // const ro
}
class YJYRouter extends Router {
  private app: App;
  constructor(app) {
    super()
    this.app = app
  }

}