import EventEmitter from "events";
import parseOptions from "./utils/options";
import { Options } from '../types/cluster/index'
class Master extends EventEmitter {
  private options
  constructor(options: Options) {
    super()
    this.options = parseOptions(options)
  }
}
module.exports = Master