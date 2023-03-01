// import { App } from "./core/types/index";
import * as koa from "koa"
import { App, Router } from "./core/types/index"
declare module 'koa' {
  interface YJYKoaCoreAPP extends App { }

}

export = koa

