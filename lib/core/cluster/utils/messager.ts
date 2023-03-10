import cluster from 'cluster';
import sendmessage from "sendmessage";
interface Msg {
  from: string;
  receiverPid: string,
  to: string,
  action: string,
  data: any
}
export default class Messager {
  private master;
  private hasParent;
  constructor(master) {
    this.master = master;
    //主进程生成后的子进程是有send方法的
    this.hasParent = !!process.send;
    process.on('message', (msg: Msg) => {
      msg.from = 'parnet';
      this.send(msg)
    })
    process.once('disconnect', () => {
      process.send = undefined;
    })
  }
  send(msg: Msg) {
    if (!msg.from) {
      msg.from = 'master'
    }
    //识别消息要发送给谁，设置to属性
    if (msg.receiverPid) {
      if (msg.receiverPid === String(process.pid)) {
        msg.to = 'master'
      } else if (msg.receiverPid === String(this.master.agendWorker.pid)) {
        msg.to = 'agent'
      } else {
        msg.to = 'app'
      }
    }

    //如果没有receiverPid设置默认的to
    if (!msg.to) {
      if (msg.from === 'agent') msg.to = 'app';
      if (msg.from === 'app') msg.to = 'agent';
      if (msg.from === 'parent') msg.to = 'master';
    }

    if (msg.to === 'mster') {
      this.sendToMaster(msg)
      return;
    }

    if (msg.to === 'parnet') {
      this.sendToParnt(msg);
      return;
    }
  }
  sendToMaster(msg: Msg) {
    this.master.emit(msg.action, msg.data)
  }
  //如果node不是IPC通道传递消息则直接return回去
  sendToParnt(msg: Msg) {
    if (process.send) {
      process.send(msg);
    } else {
      return;
    }
  }

  sendToAppWorker(msg) {
    for (const key in cluster.workers) {
      const worker = cluster.workers[key];
      // if (worker.state === '') {

      // }
      sendmessage(worker, msg)
    }
  }

  sendToAgentWork(msg: Msg) {
    if (this.master.agendWorker) {
      sendmessage(this.master.agendWorker, msg)
    }
  }
}
