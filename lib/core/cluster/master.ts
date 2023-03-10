import EventEmitter from "events";
import parseOptions from "./utils/options";
import Messager from './utils/messager'
import Manager from "./utils/manager";
import { Options } from '../types/cluster/index'
class Master extends EventEmitter {
  private options;
  private messager;
  private manager;
  constructor(options: Options) {
    super()
    this.options = parseOptions(options);
    this.messager = new Messager(this);
    this.manager = new Manager()

  }
}
module.exports = Master