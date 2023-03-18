
import ConsoleLog from "../utils/consoleLog";
import YjyKoa from '../../core/index';

const options = JSON.parse(process.argv[2]);
const log = new ConsoleLog();
const app = new YjyKoa(options);
console.log(app)