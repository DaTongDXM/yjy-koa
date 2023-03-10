import EventEmitter from "events";
import parseOptions from "./utils/options";
import Messager from './utils/messager'
import Manager from "./utils/manager";
import ConsoleLog from "../utils/consoleLog";
import path from 'path'
import { Options } from '../types/cluster/index'
class Master extends EventEmitter {
  private options;
  private messager;
  private manager;
  private log;
  constructor(options: Options) {
    super()
    this.options = parseOptions(options);
    this.messager = new Messager(this);
    this.manager = new Manager()
    this.log = new ConsoleLog()
    const yjykoaVersion = require(path.resolve(__dirname, '../../../package.json')).version
    this.log.info(`[master] ========================YJY-KOA Start========================`)
    this.log.info(`[master] node version ${process.version}`)
    this.log.info(`[master] yjy-koa version ${yjykoaVersion}`)
  }
}
module.exports = Master