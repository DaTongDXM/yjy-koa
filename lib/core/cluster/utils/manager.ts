import EventEmitter from "events";
import { ChildProcess } from 'child_process'
import { Worker } from 'cluster'
//Manager用来管理agent线程和worker线程的状态，以及触发exapectiona事件
export default class Manager extends EventEmitter {
  public workers;
  //agent进程只有一个，不需要存储在map
  private agent;
  private exception;
  private timer;
  constructor() {
    super();
    this.workers = new Map();
    this.agent = null;
  }

  setAgent(agent) {
    this.agent = agent;
  }

  deleteAgent() {
    this.agent = null;
  }

  setWorker(worker) {
    this.workers.set(worker.process.pid, worker);
  }

  getWorker(pid) {
    return this.workers.get(pid)
  }

  deleteWorker(pid) {
    this.workers.delete(pid);
  }

  listWorkerIds() {
    return Array.from(this.workers.keys())
  }

  getListeningWorkerIds() {
    const keys: Array<number> = [];
    for (const id of this.workers.keys()) {
      if (this.getWorker(id).state === 'listening') {
        keys.push(id)
      }
    }
    return keys
  }

  count() {
    return {
      agent: (this.agent && this.agent.status === 'started') ? 1 : 0,
      worker: this.listWorkerIds().length
    }
  }
  //检查agent线程和worker线程是不是同时处于活跃状态，超过三次轮训后触发expection事件
  startCheck() {
    this.exception = 0;
    this.timer = setInterval(() => {
      const { agent, worker } = this.count();
      if (agent && worker) {
        this.exception = 0;
        return;
      }
      this.exception++;
      if (this.exception >= 3) {
        this.emit('exception', { agent, worker });
        clearInterval(this.timer)
      }
    }, 10000)
  }
}