import ConsoleLog from "../utils/consoleLog";
import YjyKoa from '../../core/index';
/**
 * process.argv获取命令行指令参数，以childprocess.fork(agentFile, ['a','b'])为例
 * process.argv[0]返回启动Node.js进程的可执行文件所在的绝对路径
 * process.argv[1]为当前执行的JavaScript文件路径
 * 剩余的元素是命令行参数
 * process.argv[2]：'a'
 * process.argv[3]：'b'
*/
const log = new ConsoleLog()
const options = JSON.parse(process.argv[2])

const agent = new YjyKoa(options);

if (process.send) {
  process.send({ action: 'agent-start', to: 'master' });
} else {
  log.error(`If Node.js was not spawned with an IPC channel, process.send is undefined.`)
}

process.on('unhandledRejection', (err) => {
  throw err;
})

process.on('uncaughtException', (err) => {
  console.log(err)
  process.exit(1)
})

