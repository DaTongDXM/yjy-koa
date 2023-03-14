import EventEmitter from "events";
import parseOptions from "./utils/options";
import Messager from './utils/messager';
import { Msg } from './utils/messager';
import Manager from "./utils/manager";
import ConsoleLog from "../utils/consoleLog";
import childprocess from 'child_process';
import path from 'path';
import GetFreePort from 'detect-port';
import { Options } from '../types/cluster/index'
class Master extends EventEmitter {
  public options;
  public messager: Messager;
  public manager: Manager;
  public log: ConsoleLog;
  public agentWorker;
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

    this.on('agent-start', this.onAgentStart.bind(this));

    this.detectPorts().then(() => {
      this.forkAgentWorker()
    })
    //当监听到exception，说明集群中没有agent, worker同时处于alive状态，十分危险。需要记录错误并报警
    this.manager.on('exception', ({ agent, worker }) => {
      const err = new Error(`[master] ${agent} agent and ${worker} worker(s) alive, exit to avoid unknown state`)
      err.name = 'ClusterWorkerExceptionError',
        this.log.error(err);
      process.exit(1);
    })
  }
  detectPorts() {
    return GetFreePort()
      .then(port => {
        this.options.clusterPort = port;
        // If sticky mode, detect worker port
        if (this.options.sticky) {
          return GetFreePort();
        }
      })
      .then(port => {
        if (this.options.sticky) {
          this.options.stickyWorkerPort = port;
        }
      })
      .catch(/* istanbul ignore next */ err => {
        this.log.error(err);
        process.exit(1);
      });
  }
  forkAgentWorker() {
    const args = [JSON.stringify(this.options)];
    const agentFile = path.join(__dirname, 'agent_work');
    this.agentWorker = childprocess.fork(agentFile, args);
    this.manager.setAgent(this.agentWorker);
    this.log.info(`[master] agent worker ${this.agentWorker.pid} start with clusterPort:${this.options.clusterPort}`)

    this.agentWorker.on('message', (msg: Msg) => {
      if (typeof msg === 'string') {
        msg = { action: msg, data: msg }
      }
      msg.from = 'agent'
      this.messager.send(msg)

    });

    this.agentWorker.on('error', err => {
      this.log.error(err)
    });

    this.agentWorker.on('exit', (code, signal) => {
      this.messager.send({
        action: 'agent-exit',
        data: { code, signal },
        from: 'agent',
        to: 'master'
      })
    })
  }
  onAgentStart() {
    this.agentWorker.status = 'started';
    this.messager.send({
      to: 'app',
      action: 'agent-start'
    });
    this.log.info(`[master] agent_worker ${this.agentWorker.pid} started`)
  }
}
module.exports = Master