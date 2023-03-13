import utility from 'utility'
export default class ConsoleLog {
  constructor() {

  }
  get time() {
    return utility.logDate(',')
  }
  get pid() {
    return process.pid
  }
  ///TODO 改成 call形式的
  info(message) {
    process.stdout.write(`${this.time} YJY-KOA INFO ${this.pid} ${message}\n`)
  }
  warning(message) {
    process.stderr.write(`${this.time} YJY-KOA Warning ${this.pid} ${message}\n`)
  }
  error(message) {
    process.stderr.write(`${this.time} YJY-KOA Error ${this.pid} ${message}\n`)
  }
}